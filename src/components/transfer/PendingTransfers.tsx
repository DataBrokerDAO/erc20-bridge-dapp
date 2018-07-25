import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IReduxState } from '../../redux/configureStore';
import { IPendingTransfer, IPendingTransfersState } from '../../redux/pendingTransfers';
import { TransferType } from '../../redux/transfer';
import Container from '../generic/Container';

import './PendingTransfers.css';

const PendingTransfer = ({ transactionHash, transferType, amount, startTime }: IPendingTransfer) => {
    const path = (transferType === TransferType.Deposit ? 'deposit' : 'withdraw') + '/' + transactionHash;
    const typeWord = transferType === TransferType.Deposit ? 'Deposit' : 'Withdraw';
    return (
        <li className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Pending Transfer</h5>
                <small>started {moment(startTime).fromNow()}</small>
            </div>
            {typeWord} {amount} DTX
            <Link to={path} className="float-right">Open</Link>
        </li>
    )
} 

class StartTransferPage extends Component<{ pendingTransfers: IPendingTransfersState, [x: string]: any }> {

  public render() {
    const { pendingTransfers } = this.props;

    if (pendingTransfers.length < 1) {
        return null;
    }

    return (
        <Container className="PendingTransfers">
            <ul className="list-group  list-group-flush">
                {pendingTransfers.map((transfer) =>
                    <PendingTransfer key={transfer.transactionHash} {...transfer} />)}
            </ul>
        </Container>
    );
  }
}

export default connect(
  (s: IReduxState) => ({ pendingTransfers: s.pendingTransfers })
)(StartTransferPage);