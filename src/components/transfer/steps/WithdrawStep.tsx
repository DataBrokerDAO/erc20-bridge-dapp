import React, { Component } from 'react';

import BigNumber from 'bignumber.js';
import { connect } from 'react-redux';
import { fetchBalancesRequest } from '../../../redux/account';
import { IAccountState } from '../../../redux/account';
import { confirmWithdraw, ITransferState } from '../../../redux/transfer';

class WithdrawStep extends Component<{
  transfer: ITransferState;
  account: IAccountState;
  confirmWithdraw: any;
  fetchBalancesRequest: any;
}> {
  public render() {
    const { transfer, account } = this.props;
    const estimateGas = new BigNumber(transfer.estimateWithdrawGas, 10);
    const homeBalance = new BigNumber(account.homeEthBalance, 10);
    const difference = homeBalance.minus(estimateGas);
    const hasEnoughEth = difference.isPositive();

    return (
      <div className="Step WithdrawStep">
        <h5 className="text-muted font-weight-light">
          Your funds are ready to be withdrawed !
        </h5>
        <p className="mt-3">Withdrawing funds to the Main network costs Gas.</p>

        {hasEnoughEth ? (
          <div className="text-center">
            <p className="text-success">
              You have enough funds to complete the transaction.
            </p>
            <p>
              Estimate Gas cost is <code>{estimateGas.toString(10)}</code> Wei.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-danger">
              The transaction cost is <code>{estimateGas.toString(10)}</code>
              Wei but you only have <code>{account.homeEthBalance}</code> Wei.
            </p>,
            <p>
              Transfer funds to your account and Check funds. You can close this page and come back later.
            </p>
          </div>
        )}

        {hasEnoughEth ? (
          <button
            onClick={this.props.confirmWithdraw}
            className="btn btn-primary btn-lg mt-4"
          >
            Confirm
            </button>
        ) : (
            <button
              className="btn btn-primary btn-lg mx-2"
              onClick={this.props.fetchBalancesRequest}>Check funds</button>
          )}
      </div>
    );
  }
}
export default connect(
  undefined,
  // ({ transfer }: IReduxState) => ({ transfer }),
  { confirmWithdraw, fetchBalancesRequest }
)(WithdrawStep);