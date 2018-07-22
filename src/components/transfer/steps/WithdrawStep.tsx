import React, { Component } from 'react';

import BigNumber from 'bignumber.js';
import { connect } from 'react-redux';
import { continueWithdraw } from 'src/redux/transfer';

class WithdrawStep extends Component<any> {
    public render() {
        const { transfer, account } = this.props;
        const estimateGas = new BigNumber(transfer.estimateWithdrawGas, 10);
        const homeBalance = new BigNumber(account.homeEthBalance, 10);
        const hasEnoughEth = homeBalance.minus(estimateGas).isPositive();

        return (
            <div className="Step WithdrawStep">
                <h5 className="text-muted font-weight-light">Your funds are ready to be withdrawed !</h5>
                <p className="mt-3">Withdrawing funds to the Main network costs Gas.</p>

                {hasEnoughEth
                    ? (
                        <p className="text-success">You have enough funds to complete the transaction.</p>
                    ) : (
                        <p className="text-danger">Your balance is too low. You have <code>{homeBalance.toString(10)}</code> Wei.</p>
                    )}
                <p className={hasEnoughEth ? "text-success" : "text-danger"}>Estimate Gas cost is <code>{estimateGas.toString(10)}</code> Wei.</p>

                <button onClick={this.props.continueWithdraw} disabled={!hasEnoughEth} className="btn btn-primary btn-lg mt-4">Withdraw</button>
            </div>
        );
    }
}
export default connect(
    undefined,
    // ({ transfer }: IReduxState) => ({ transfer }),
    { continueWithdraw }
)(WithdrawStep);