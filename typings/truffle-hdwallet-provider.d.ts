declare module 'truffle-hdwallet-provider' {
  import { JsonRPCRequest, JsonRPCResponse, Provider, HttpProvider } from 'web3/types'

  export default class HDWalletProvider implements HttpProvider {
    responseCallbacks: undefined;
    notificationCallbacks: undefined;
    connection: undefined;
    addDefaultEvents: undefined;
    constructor(mnemonic: string, providerUrl: string)
    on(type: string, callback: () => any): undefined;
    removeListener(type: string, callback: () => any): undefined;
    removeAllListeners(type: string): undefined;
    reset(): undefined;
    send(
      payload: JsonRPCRequest,
      callback: (e: Error, val: JsonRPCResponse) => void
    ): any;
  }
}

