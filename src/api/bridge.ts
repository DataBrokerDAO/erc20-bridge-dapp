import { assert } from 'chai';
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

import * as ForeignBridge from '@settlemint/erc20-bridge/build/contracts/ForeignBridge.json';
import * as HomeBridge from '@settlemint/erc20-bridge/build/contracts/HomeBridge.json';
import * as SampleERC20 from '@settlemint/erc20-bridge/build/contracts/SampleERC20.json';

import BigNumber from '../../node_modules/bignumber.js';
import { EventLog, Transaction } from '../../node_modules/web3/types';
import getConfig from './config';
import { matchesFilter } from './utils';

export interface ISignature {
  v: string;
  r: string;
  s: string;
}

export default class BridgeAPI {

  public account: any;

  private mnemonic: string;

  private home3: any;
  private foreign3: any;


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
    this.getWithdrawCall = this.getWithdrawCall.bind(this);
    this.estimateWithdrawGas = this.estimateWithdrawGas.bind(this);
    this.sendWithdraw = this.sendWithdraw.bind(this);
    this.getHomeBalance = this.getHomeBalance.bind(this);
    this.getTransferToForeign = this.getTransferToForeign.bind(this);
    this.getTransferToHome = this.getTransferToHome.bind(this);
    this.getHomeBlock = this.getHomeBlock.bind(this);
    this.getForeignBlock = this.getForeignBlock.bind(this);
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

  public async getHomeBalance() {
    return await this.home3.eth.getBalance(this.account);
  }

  public async getHomeBlock() {
    return await this.home3.eth.getBlockNumber();
  }

  public async getForeignBlock() {
    return await this.foreign3.eth.getBlockNumber();
  }

  public async getRequiredValidators() {
    const num: number = await this.foreignBridge.methods.requiredValidators().call({ from: this.account });
    return num;
  }

  public async pollForEvents(blockNumber?: number, filter?: object) {
    if (blockNumber === undefined) {
      blockNumber = await this.getForeignBlock();
    }
    let events: EventLog[] = await this.foreignBridge.getPastEvents('allEvents', {
      fromBlock: blockNumber,
      toBlock: 'latest',
      filter
    });
    if (filter) {
      events = events.filter(evt => matchesFilter(evt, filter));
    }
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

  public async getTransaction(txHash: string, web3: any, token: any) {
    const tx: Transaction = await web3.eth.getTransaction(txHash);
    let events = await token.getPastEvents('Transfer', {
      fromBlock: tx.blockNumber,
      toBlock: tx.blockNumber,
    })
    events = events.filter((evt: EventLog) => evt.returnValues.from === this.account);
    let amount;
    if (events.length) {
      amount = events[0].returnValues.value;
    }
    return { tx, amount };
  }

  public async getTransferToForeign(txHash: string) {
    return await this.getTransaction(txHash, this.home3, this.homeToken);
  }

  public async getTransferToHome(txHash: string) {
    return await this.getTransaction(txHash, this.foreign3, this.foreignToken);
  }

  public getWithdrawCall(amount: string, withdrawBlock: number, signatures: ISignature[]) {
    const v = [];
    const r = [];
    const s = [];

    for (const sign of signatures) {
      v.push(sign.v);
      r.push(sign.r);
      s.push(sign.s);
    }

    return this.homeBridge.methods.withdraw(
      this.homeToken._address,
      this.account,
      amount,
      withdrawBlock,
      v,
      r,
      s
    );
  }

  public async estimateWithdrawGas(call: any) {
    return Math.ceil((await call.estimateGas()) * 2);
  }

  public async sendWithdraw(call: any) {
    return await call.send({
      from: this.account,
      gas: await this.estimateWithdrawGas(call),
      gasPrice: await this.home3.eth.getGasPrice()
    });
  }

}