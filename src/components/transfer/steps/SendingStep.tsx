import React from 'react';
import Spinner from 'react-spinkit';
import { IProps } from '../PendingTransferPage';

const SendingStep = ({ }: IProps) => (
    <div className="SendingStep">
        <h5 className="text-muted font-weight-light">Waiting for tokens to arive at the bridge.</h5>
        <Spinner className="spinner mt-3" name='double-bounce' fadeIn="quarter" color="#2E3192" />
    </div>
)

export default SendingStep;