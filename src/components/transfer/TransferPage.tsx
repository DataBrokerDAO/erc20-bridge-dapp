import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from '../generic/Container';
import PendingTransferPage from './PendingTransferPage';
import StartTransferPage from './StartTransferPage';

export default () => (
    <Container>
        <Switch>
            <Route path="/pending" component={PendingTransferPage} />
            <Route path="/" component={StartTransferPage} />
        </Switch>
    </Container>
)