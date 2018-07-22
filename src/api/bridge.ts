import { assert } from 'chai';
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

import * as ForeignBridge from '@settlemint/erc20-bridge/build/contracts/ForeignBridge.json';
import * as HomeBridge from '@settlemint/erc20-bridge/build/contracts/HomeBridge.json';
import * as SampleERC20 from '@settlemint/erc20-bridge/build/contracts/SampleERC20.json';

import BigNumber from '../../node_modules/bignumber.js';
import { EventLog } from '../../node_modules/web3/types';
import getConfig from './config';

export interface ISignature {
  v: string;
  r: string;
  s: string;
}

export default class BridgeAPI {

  private mnemonic: string;

  private home3: any;
  private foreign3: any;

  private account: any;

  private homeBridge: any;
  private foreignBridge: any;

  private homeToken: any;
  private foreignToken: any;

  constructor(mnemonic: string) {
    this.mnemonic = mnemonic;

    this.setup = this.setup.bind(this);
    this.getHomeTokenBalance = this.getHomeTokenBalance.bind(this);
    this.getForeignTokenBalance = this.getForeignTokenBalance.bind(this);
    this.tranferToHome = this.tranferToHome.bind(this);
    this.tranferToForeign = this.tranferToForeign.bind(this);
    this.pollForEvents = this.pollForEvents.bind(this);
    this.getRequiredValidators = this.getRequiredValidators.bind(this);
    this.withdrawTokens = this.withdrawTokens.bind(this);
  }

  public async setup() {
    const config = getConfig();

    this.home3 = new Web3(
      new HDWalletProvider(this.mnemonic, config.HOME_URL)
    );
    this.foreign3 = new Web3(
      new HDWalletProvider(this.mnemonic, config.FOREIGN_URL)
    );

    this.account = (await this.home3.eth.getAccounts())[0];

    this.homeBridge = await new this.home3.eth.Contract(HomeBridge.abi, config.HOME_BRIDGE);
    this.foreignBridge = await new this.foreign3.eth.Contract(ForeignBridge.abi, config.FOREIGN_BRIDGE);

    this.homeToken = await new this.home3.eth.Contract(SampleERC20.abi, config.HOME_TOKEN);
    this.foreignToken = await new this.foreign3.eth.Contract(SampleERC20.abi, config.FOREIGN_TOKEN);
  }

  public async getHomeTokenBalance() {
    return await this.homeToken.methods.balanceOf(this.account).call({ from: this.account });
  }

  public async getForeignTokenBalance() {
    return await this.foreignToken.methods.balanceOf(this.account).call({ from: this.account });
  }

  public async getRequiredValidators() {
    const num: number = await this.foreignBridge.methods.requiredValidators().call({ from: this.account });
    return num;
  }

  public async pollForEvents(blockNumber?: number, filter?: object) {
    if (blockNumber === undefined) {
      blockNumber = await this.foreign3.eth.getBlockNumber();
    }
    const events: EventLog[] = await this.foreignBridge.getPastEvents('allEvents', {
      fromBlock: blockNumber,
      toBlock: 'latest',
      filter
    });
    return events;
  }

  public async tranferToForeign(amount: string) {
    const balance = new BigNumber(await this.getHomeTokenBalance());
    const amountNum = new BigNumber(amount);

    assert.ok(
      !balance.minus(amountNum).isNegative(),
      `Account doesnt have ${amount} tokens to transfer`
    );

    const tx = await this.homeToken.methods
      .transfer(this.homeBridge._address, amount)
      .send({ from: this.account });
    return tx;
  }

  public async tranferToHome(amount: string) {
    const balance = new BigNumber(await this.getForeignTokenBalance());
    const amountNum = new BigNumber(amount);

    assert.ok(
      !balance.minus(amountNum).isNegative(),
      `Account doesnt have ${amount} tokens to transfer`
    );

    const tx = await this.foreignToken.methods
      .transfer(this.foreignBridge._address, amount)
      .send({ from: this.account });

    return tx;
  }

  public async withdrawTokens(amount: string, withdrawBlock: number, signatures: ISignature[]) {
    const v = [];
    const r = [];
    const s = [];

    for (const sign of signatures) {
      v.push(sign.v);
      r.push(sign.r);
      s.push(sign.s);
    }

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

    return tx;
  }

}