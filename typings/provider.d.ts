declare module 'ethereumjs-wallet/hdkey';

declare module 'truffle-privatekey-provider' {
  import { HttpProvider, JsonRPCRequest, JsonRPCResponse, Provider } from 'web3/types'

  export default class PrivateKeyProvider implements HttpProvider {
    public responseCallbacks: undefined;
    public notificationCallbacks: undefined;
    public connection: undefined;
    public addDefaultEvents: undefined;
    constructor(mnemonic: string, providerUrl: string)
    public on(type: string, callback: () => any): undefined;
    public removeListener(type: string, callback: () => any): undefined;
    public removeAllListeners(type: string): undefined;
    public reset(): undefined;
    public send(
      payload: JsonRPCRequest,
      callback: (e: Error, val: JsonRPCResponse) => void
    ): any;
  }
}

