import React, { Component } from 'react';

import { connect } from 'react-redux';
import { continueWithdraw } from 'src/redux/transfer';

class WithdrawStep extends Component<any> {
    public render() {
        const { transfer } = this.props;
        return (
            <div className="Step WithdrawStep">
                <h5 className="text-muted font-weight-light">Your funds are ready to be withdrawed !</h5>
                <p className="mt-3">Withdrawing funds to the Main network costs Gas.</p>

                <p>Estimate Gas cost is <code>{transfer.estimateWithdrawGas}</code> Wei.</p>

                <button onClick={this.props.continueWithdraw} className="btn btn-primary btn-lg mt-4">Withdraw</button>
            </div>
        );
    }
}
export default connect(
    undefined,
    // ({ transfer }: IReduxState) => ({ transfer }),
    { continueWithdraw }
)(WithdrawStep);