# DTX Bridge
The Databroker DAO platform will launch at the end of the summer.
Currently all DTX resides on the main net but our platform is build on top of a private blockchain were all related contracts are stored. Therefore we require a way to let users transfer their DTX from the main net to our network for usage on the platform.

![](DTX%20Bridge/pending.png)

To achieve this our team has created a bridge that is capable of transferring ERC20 tokens from a “Home” network to a “Foreign” network. For Databroker DAO this means that the DTX token can be transferred between the main net and the Databroker network.

The bridge consists of three main parts:
* Validators
* Bridge contracts
* Dapp

## Validators
The validator is a programs that acts as a middleman between both networks. They catch transfer requests and sign it with their validator account. These signatures are send to the foreign bridge (Databroker Network). 

The validators use authorised accounts to sign requests. This prevents third parties from signing malicious requests. 
To ensure availability and security, multiple validators should be live at al times.

## Bridge Contracts
These contracts keep track of requests and their signatures. A bridge contract exists on both networks. The foreign bridge does most of the heavy lifting as our network has a fast block time and no gas costs. The home bridge is only used for executing a withdrawal.

Every request must be signed by a minimum amount of validators (only 1 in the demo). When the threshold is reached the request is granted.

Because no gas costs exists on our network depositing is at no gas cost to the user.  In a withdrawal the final step is executed by the home bridge and thus costs gas. This means that the user has to perform this step and pay the associated gas cost (see Dapp demo).

## Dapp
Although not necessary, the Dapp provides an accessible way for users to make use of the bridge. Currently you can login with a mnemonic or your private key. MetaMask is not supported because it doesn’t allow us to connect to both networks at the same time.

### Try it out

![](DTX%20Bridge/1824C079-5BAE-4D63-9A9C-71D55C8A04E1.png)
Login to your account with a mnemonic or your private keys.

![](DTX%20Bridge/74C78D7F-D66E-4B4A-8EEF-ACB58FBECBD7.png)
You can deposit tokens to the Databroker network or you can withdraw them back to the main network.

### Depositing

![](DTX%20Bridge/sending.png)
Next, we wait until the tokens arrive at the bridge.

![](DTX%20Bridge/signatures.png)
Once the bridge receives our tokens, validator nodes have to give permission to cross the bridge. 


![](DTX%20Bridge/minted.png) 
When enough validators have signed off on the request, the bridge on the Databroker network mints tokens to your account. The transfer procedure is complete.

### Withdrawing

The first 2 steps are equal to those when depositing.

![](DTX%20Bridge/deposit%203.png)
The main network is ready to transfer the funds to your account but this transaction costs gas on the main network. If your balance is too low you can come back later to complete it.

![](DTX%20Bridge/withdrawing.png)


![](DTX%20Bridge/withdraw%20done.png)
Withdrawal was successful and your balance has been updated.

Github Projects:
Bridge contracts: [GitHub - DataBrokerDAO/erc20-bridge: ERC20 -> ERC777 token bridge - allows side-chaining of an ERC20 token](https://github.com/DataBrokerDAO/erc20-bridge)
Validator: [GitHub - DataBrokerDAO/erc20-bridge-validator](https://github.com/DataBrokerDAO/erc20-bridge-validator)
Dapp: [GitHub - DataBrokerDAO/erc20-bridge-dapp: Dapp for ERC20 bridge](https://github.com/DataBrokerDAO/erc20-bridge-dapp)
