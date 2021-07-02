import Web3ProviderEngine from 'web3-provider-engine';
// @ts-ignore
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js';
import {
  ledgerEthereumBrowserClientFactoryAsync,
  LedgerEthereumClientFactoryAsync,
} from '@0x/subproviders/lib/src';
import { LedgerSubprovider } from '@0x/subproviders/lib/src/subproviders/ledger';
import { RPCSubprovider } from '@0x/subproviders/lib/src/subproviders/rpc_subprovider';

export interface ILedgerProviderOptions {
  chainId: number;
  rpcUrl: string;
  accountFetchingConfigs?: any;
  baseDerivationPath?: any;
  pollingInterval?: any;
  requestTimeoutMs?: any;
  ledgerEthereumClientFactoryAsync?: LedgerEthereumClientFactoryAsync;
}

class LedgerProvider extends Web3ProviderEngine {
  constructor(opts: ILedgerProviderOptions) {
    super({
      pollingInterval: opts.pollingInterval,
    });
    this.addProvider(
      new LedgerSubprovider({
        networkId: opts.chainId,
        ledgerEthereumClientFactoryAsync:
          opts.ledgerEthereumClientFactoryAsync ||
          ledgerEthereumBrowserClientFactoryAsync,
        accountFetchingConfigs: opts.accountFetchingConfigs,
        baseDerivationPath: opts.baseDerivationPath,
      })
    );
    this.addProvider(new CacheSubprovider());
    this.addProvider(new RPCSubprovider(opts.rpcUrl, opts.requestTimeoutMs));

    this.start();
  }
}

export default LedgerProvider;
