import React from 'react';
import { Link } from 'react-router-dom';
import { TransferType } from '../../../redux/transfer';
import { IProps } from '../PendingTransferPage';

const SuccessStep = ({ account, transfer }: IProps) => (
    <div className="Step SuccessStep">
        <h5 className="text-muted font-weight-light">Tokens have been succesfully transfered!</h5>
        <div className="row mt-4 balance-container">
            <div className="d-xs-none d-sm-block">
                <h5 className="font-weight-light">Main Network</h5>
                <p className={"mt-2 text-" + (transfer.type === TransferType.Deposit ? 'danger' : 'success')}>New Balance: {account.homeBalance} DTX</p>
            </div>
            <div className="d-xs-none d-sm-block">
                <h5 className="font-weight-light">Databroker Network</h5>
                <p className={"mt-2 text-" + (transfer.type === TransferType.Deposit ? 'success' : 'danger')}>New Balance: {account.foreignBalance} DTX</p>
            </div>
        </div>
        <Link className="btn btn-primary btn-lg mt-4" to="/">New transaction</Link>
    </div>
)

export default SuccessStep;