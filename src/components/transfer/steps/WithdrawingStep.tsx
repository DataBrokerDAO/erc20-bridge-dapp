import React from 'react';
import Spinner from 'react-spinkit';
import { IProps } from '../PendingTransferPage';

const WithdrawingStep = ({ }: IProps) => (
    <div className="Step WithdrawingStep">
        <h5 className="text-muted font-weight-light">Withdrawing tokens from the bridge.</h5>
        <Spinner className="spinner mt-3" name='double-bounce' fadeIn="quarter" color="#2E3192" />
    </div>
)

export default WithdrawingStep;