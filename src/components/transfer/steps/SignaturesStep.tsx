import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { IProps } from '../PendingTransferPage';

import 'react-circular-progressbar/dist/styles.css';

const SignaturesStep = ({ transfer }: IProps) => (
    <div className="Step SignaturesStep">
        <h5 className="text-muted font-weight-light">Collecting signatures</h5>
        <p className="mt-2">Your request to transfer tokens must be approved by {transfer.requiredSignatureCount} validators.</p>
        <CircularProgressbar
            className="signature-progress mt-3"
            percentage={(transfer.signatureCount / transfer.requiredSignatureCount) * 100}
            text={transfer.signatureCount + '/' + transfer.requiredSignatureCount}
        />
    </div>
)

export default SignaturesStep;