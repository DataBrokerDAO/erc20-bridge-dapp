import { BigNumber } from 'bignumber.js';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { IAccountState } from '../../redux/account';
import { startDepositProcedure, startWithdrawProcedure } from '../../redux/transfer';

import { IReduxState } from '../../redux/configureStore';

import './StartTransferPage.css';

const AmountInput = ({ value, onChange, isValid = false }: any) => (
  <div className="input-group amount-input">
    <input value={value} onChange={onChange} type="number" className={"form-control " + (!isValid && 'is-invalid')} placeholder="eg. 100" />
    <div className="input-group-append">
      <div className="input-group-text">DTX</div>
    </div>
    <div className="invalid-feedback">
      You have enough tokens to send.
    </div>
  </div>
)

const ShiftButton = ({ onClick }: any) => (
  <button type="button" className="btn btn-warning shift-btn">
    <img onClick={onClick} src="/images/glyphicons-458-transfer.png" />
  </button>
)

const ActionButton = ({ text, onClick, disabled }: any) => (
  <button disabled={disabled} onClick={onClick} className="btn btn-lg btn-primary continue-btn">
    {text}
  </button>
)

class StartTransferPage extends Component<{ account: IAccountState, [x: string]: any }> {

  public state = {
    withdraw: false,
    amountInput: "",
    newHomeBalance: "",
    newForeignBalance: "",
    isValidAmount: true
  }

  public handleShift = () => {
    this.setState({ withdraw: !this.state.withdraw })
  }

  public handleWithdrawal = () => {
    if (this.state.amountInput.length) {
      this.props.startWithdrawProcedure(this.state.amountInput);
    }
  }

  public handleDeposit = () => {
    if (this.state.amountInput.length) {
      this.props.startDepositProcedure(this.state.amountInput);
    }
  }
  public handleAmountChange = (evt: any) => {
    const value = evt.target.value;
    if (!value.length) {
      this.setState({
        amountInput: value,
        newHomeBalance: '',
        newForeignBalance: '',
        isValidAmount: true
      });
      return;
    }
    const amount = new BigNumber(value, 10);

    const homeBalance = new BigNumber(this.props.account.homeBalance, 10);
    const foreignBalance = new BigNumber(this.props.account.foreignBalance, 10);

    let newHomeBalance;
    let newForeignBalance;

    if (this.state.withdraw) {
      newHomeBalance = homeBalance.plus(amount);
      newForeignBalance = foreignBalance.minus(amount);
    } else {
      newHomeBalance = homeBalance.minus(amount);
      newForeignBalance = foreignBalance.plus(amount);
    }

    this.setState({
      amountInput: amount.toString(10),
      newHomeBalance: newHomeBalance.toString(10),
      newForeignBalance: newForeignBalance.toString(10),
      isValidAmount: amount.isPositive() && !amount.isZero() && newHomeBalance.isPositive() && newForeignBalance.isPositive()
    })
  }

  public render() {
    const { account } = this.props;
    const { withdraw, amountInput, newHomeBalance, newForeignBalance, isValidAmount } = this.state;

    const leftSide = this.renderSide("Main Network", withdraw, account.homeBalance, newHomeBalance);
    const rightSide = this.renderSide("Databroker Network", !withdraw, account.foreignBalance, newForeignBalance);

    return (
      <div className="row StartTransferPage">
        <div
          className="col-sm d-xs-none d-sm-block"
          style={{ backgroundColor: withdraw ? '#f5f5f5' : undefined }}>
          {withdraw ? rightSide : leftSide}
          <AmountInput value={amountInput} onChange={this.handleAmountChange} isValid={isValidAmount} />
        </div>

        <ShiftButton onClick={this.handleShift} />

        <div
          className="col-sm d-xs-none d-sm-block"
          style={{ backgroundColor: !withdraw ? '#f5f5f5' : undefined }}>
          {withdraw ? leftSide : rightSide}
          <ActionButton
            text={withdraw ? 'Withdraw' : 'Deposit'}
            disabled={!amountInput.length || !isValidAmount}
            onClick={withdraw ? this.handleWithdrawal : this.handleDeposit} />
        </div>
      </div>
    );
  }

  private renderSide = (name: string, receiving = false, balance: string, newBalance: string) => (
    <div>
      <h3>{name}</h3>
      {!newBalance.length ? (
        <h5 className="font-weight-light">Balance: {balance} DTX</h5>
      ) : (
          <h5 className={"font-weight-light " + (receiving ? 'text-success' : 'text-danger')}>
            Balance: {newBalance} DTX
      </h5>
        )}
    </div>
  )
}

export default connect(
  (s: IReduxState) => ({ account: s.account }),
  {
    startDepositProcedure,
    startWithdrawProcedure
  }
)(StartTransferPage);