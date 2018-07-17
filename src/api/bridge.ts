import { assert } from 'chai';
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

import getConfig from './config';
import { collectSignatures, loadContract, waitForEvent  } from './utils';

export default class BridgeAPI {

  private seed: string;

  private home3: any;
  private foreign3: any;

  private account: any;

  private homeBridge: any;
  private foreignBridge: any;

  private homeToken: any;
  private foreignToken: any;

  constructor(seed: string) {
    this.seed = seed;
  }

  public async setup() {
    const config = getConfig();

    this.home3 = new Web3(
      new HDWalletProvider(this.seed, config.HOME_URL)
    );
    this.foreign3 = new Web3(
      new HDWalletProvider(this.seed, config.FOREIGN_URL)
    );

    this.account = (await this.home3.eth.getAccounts())[0];

    this.homeBridge = await loadContract(
      'HomeBridge',
      this.home3,
      config.HOME_BRIDGE
    );
    this.foreignBridge = await loadContract(
      'ForeignBridge',
      this.foreign3,
      config.FOREIGN_BRIDGE
    );
    this.homeToken = await loadContract(
      'SampleERC20',
      this.home3,
      config.HOME_TOKEN
    );
    this.foreignToken = await loadContract(
      'SampleERC20',
      this.foreign3,
      config.FOREIGN_TOKEN
    );
  }

  public async getHomeTokenBalance() {
    return await this.homeToken.methods.balanceOf(this.account).call({ from: this.account });
  }

  public async getForeignTokenBalance() {
    return await this.foreign3.methods.balanceOf(this.account).call({ from: this.account });
  }

  public async tranferToForeign(amount: number) {
    assert.isAtLeast(
      await this.getHomeTokenBalance(),
      amount,
      `Account doesnt have ${amount} tokens to transfer`
    );

    const tx = await this.homeToken.methods
      .transfer(this.homeBridge._address, amount)
      .send({ from: this.account });

    await waitForEvent({
      event: 'MintRequestExecuted',
      contract: this.foreignBridge,
      fromBlock: tx.blockNumber,
      filter: {
        _transactionHash: tx.transactionHash
      }
    });
  }

  public async tranferToHome(amount: number) {
    assert.isAtLeast(
      await this.getForeignTokenBalance(),
      amount,
      `Account doesnt have ${amount} tokens to transfer`
    );

    const tx = await this.foreignToken.methods
      .transfer(this.foreignBridge._address, amount)
      .send({ from: this.account });

    await waitForEvent({
      event: 'WithdrawRequestGranted',
      contract: this.foreignBridge,
      fromBlock: tx.blockNumber,
      filter: { _transactionHash: tx.transactionHash }
    });

    const signatures = await collectSignatures(
      this.foreignBridge,
      tx.blockNumber,
      tx.transactionHash
    );

    assert.isAtLeast(signatures.v.length, 1, 'Not enough signatures were collected');
    return {
      ...signatures,
      amount
    };
  }

  public async withdrawTokens({ amount, withdrawBlock, v, r, s }: any) {
    const call = this.homeBridge.methods.withdraw(
      this.homeToken._address,
      this.account,
      amount,
      withdrawBlock,
      v,
      r,
      s
    );

    const tx = await call.send({
      from: this.account,
      gas: Math.ceil((await call.estimateGas()) * 2),
      gasPrice: await this.home3.eth.getGasPrice()
    });

    // Wait until hometoken is transfered
    await waitForEvent({
      event: 'Transfer',
      contract: this.homeToken._address,
      fromBlock: tx.blockNumber - 1,
      filter: { to: this.account, value: amount }
    });
  }

}