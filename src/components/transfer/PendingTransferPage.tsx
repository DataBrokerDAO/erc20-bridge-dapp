import React, { Component } from 'react';

import Steps, { Step } from 'rc-steps';
import { connect } from 'react-redux';

import { IAccountState } from '../../redux/account';
import { IReduxState } from '../../redux/configureStore';
import { DepositSteps, ITransferState, TransferType } from '../../redux/transfer';

import 'rc-steps/assets/iconfont.css';
import 'rc-steps/assets/index.css';
import './PendingTransferPage.css';

import SendingStep from './steps/SendingStep';
import SignaturesStep from './steps/SignaturesStep';
import SuccessStep from './steps/SuccessStep';


export interface IProps {
    transfer: ITransferState,
    account: IAccountState,
}

class PendingTransferPage extends Component<IProps> {

    public renderDepositStep() {
        const { currentStep } = this.props.transfer;
        if (currentStep === undefined) {
            // return SignaturesStep(this.props);
            return;
        }
        const steps = {
            [DepositSteps.Init]: SendingStep,
            [DepositSteps.Sent]: SignaturesStep,
            [DepositSteps.Minted]: SuccessStep,
        }
        return steps[currentStep](this.props);
    }

    public render() {
        const { amount, type, currentStep } = this.props.transfer;
        return (
            <div className="row PendingTransferPage">
                <h4>Transfering {amount} DTX to {type === TransferType.Withdrawal ? "Main Network" : "Databroker Network"}</h4>

                <div className="step-container">
                    {this.renderDepositStep()}
                </div>

                <Steps current={currentStep} style={{ marginTop: 40 }}>
                    <Step title="Tokens sent to Bridge" />
                    <Step title="Collect Signatures" />
                    <Step title="Tokens Minted" />
                </Steps>
            </div>
        )
    }
}

export default connect(
    (s: IReduxState) => ({ transfer: s.transfer, account: s.account }),
)(PendingTransferPage);