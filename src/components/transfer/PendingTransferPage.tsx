import React, { Component } from 'react';

import Steps, { Step } from 'rc-steps';
import { connect } from 'react-redux';

import { IAccountState } from '../../redux/account';
import { IReduxState } from '../../redux/configureStore';
import { DepositSteps, ITransferState, TransferType, WithdrawalSteps } from '../../redux/transfer';

import 'rc-steps/assets/iconfont.css';
import 'rc-steps/assets/index.css';
import './PendingTransferPage.css';

import SendingStep from './steps/SendingStep';
import SignaturesStep from './steps/SignaturesStep';
import SuccessStep from './steps/SuccessStep';
import WithdrawingStep from './steps/WithdrawingStep';
import WithdrawStep from './steps/WithdrawStep';


export interface IProps {
    transfer: ITransferState,
    account: IAccountState,
}

class PendingTransferPage extends Component<IProps> {

    public renderDepositStep() {
        const { currentStep } = this.props.transfer;
        if (currentStep === undefined) {
            return;
        }
        const steps = {
            [DepositSteps.Init]: SendingStep,
            [DepositSteps.Sent]: SignaturesStep,
            [DepositSteps.Minted]: SuccessStep,
        }
        return steps[currentStep];
    }

    public renderWithdrawStep() {
        const { currentStep } = this.props.transfer;
        if (currentStep === undefined) {
            return;
        }
        const steps = {
            [WithdrawalSteps.Init]: SendingStep,
            [WithdrawalSteps.Sent]: SignaturesStep,
            [WithdrawalSteps.Signed]: WithdrawStep,
            [WithdrawalSteps.Withdrawing]: WithdrawingStep,
            [WithdrawalSteps.Received]: SuccessStep,
        }
        return steps[currentStep];
    }

    public render() {
        const { transfer, account } = this.props;
        const { amount, type, currentStep } = transfer;

        const CurrentStep = type === TransferType.Deposit
            ? this.renderDepositStep()
            : this.renderWithdrawStep()

        return (
            <div className="row PendingTransferPage">
                <h4>Transfering {amount} DTX to {type === TransferType.Withdrawal ? "Main Network" : "Databroker Network"}</h4>

                <div className="step-container">
                    {!!CurrentStep && <CurrentStep transfer={transfer} account={account} />}
                </div>

                {type === TransferType.Deposit
                    ? (
                        <Steps current={currentStep} style={{ marginTop: '40px' }}>
                            <Step title="Sent" />
                            <Step title="Signatures" />
                            <Step title="Minted" />
                        </Steps>
                    ) : (
                        <Steps current={currentStep} style={{ marginTop: '40px' }}>
                            <Step title="Sent" />
                            <Step title="Signatures" />
                            <Step title="Withdraw" />
                            <Step title="Withdrawing" />
                            <Step title="Received" />
                        </Steps>
                    )}
            </div>
        )
    }
}

export default connect(
    (s: IReduxState) => ({ transfer: s.transfer, account: s.account }),
)(PendingTransferPage);