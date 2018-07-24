import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '../components/generic/Container';
import PendingTransferPage from '../components/transfer/PendingTransferPage';
import StartTransferPage from '../components/transfer/StartTransferPage';

export default () => (
    <Container>
        <Switch>
            <Route path="/deposit" component={PendingTransferPage} />
            <Route path="/withdrawal" component={PendingTransferPage} />
            <Route path="/" component={StartTransferPage} />
        </Switch>
    </Container>
)