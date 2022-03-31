import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import { ethers } from "ethers";

interface WalletCollectionState {
    addresses: any[];
}

class Web3WalletProvider {

    state: WalletCollectionState;
    registeredWalletProviders:{};

    constructor() {

        this.state = { addresses: [ /* { address, chainId, provider } */ ] };

        this.registeredWalletProviders = {};
        
    }

    async connectWith ( walletType: string ) {

        if(!walletType) throw new Error('Please provide a Wallet type to connect with.');

        // @ts-ignore
        let walletFunctionRef = this[walletType];

        if(walletFunctionRef) {
            
            const address = await walletFunctionRef();

            console.log('address', address);

            return address;
             
        } else {

            throw new Error('Wallet type not found');

        }

    };

    async signWith ( message: string, walletData: any ) {

        let provider = new ethers.providers.Web3Provider(walletData.provider);
  
        let signer = provider.getSigner();
  
        return await signer.signMessage(message);

    }

    getConnectedWalletData () {

        return this.state.addresses;

    }

    registerNewWalletAddress ( address:string, chainId:string, provider:any ) {
        
        this.state.addresses.push({ address, chainId, provider });

        return this.state.addresses;

    };

    async getWeb3ChainId ( web3: any) {

        return web3.eth.getChainId();

    };

    async getWeb3Accounts( web3: any ) {

        return web3.eth.getAccounts();

    };

    async getWeb3ChainIdAndAccounts( web3: any ) {

        const chainId = await this.getWeb3ChainId( web3 );
        
        const accounts = await this.getWeb3Accounts( web3 );

        return { chainId, accounts };

    };

    async MetaMask () {
      
        if (typeof window.ethereum !== 'undefined') {
            
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const hexChainId = await window.ethereum.request({ method: 'eth_chainId' });

            const accountAddress = accounts[0];

            // @ts-ignore
            const registeredWalletAddress = this.registerNewWalletAddress(accountAddress, parseInt(hexChainId, 16), window.ethereum);

            return registeredWalletAddress;

        } else {

            throw new Error("MetaMask is not available. Please check the extension is supported and active.");

        }
        
    };

    async WalletConnect () {

        return new Promise((resolve, reject) => {
                
            const walletConnectProvider = new WalletConnectProvider({
                infuraId: "7753fa7b79d2469f97c156780fce37ac",
            });
        
            walletConnectProvider.on("accountsChanged", (accounts: string[]) => {

                const registeredWalletAddress = this.registerNewWalletAddress(accounts[0], '1', walletConnectProvider);

                resolve(registeredWalletAddress);
                    
            });
                
            walletConnectProvider.on("chainChanged", (chainId: number) => {

                // console.log(chainId);

            });
            
            walletConnectProvider.on("disconnect", (code: number, reason: string) => {

                // console.log(code, reason);

            });
        
            walletConnectProvider.enable();

        });

    };

    async Torus () {

        const torus = new Torus();
        
        await torus.init();

        await torus.login();
        
        // @ts-ignore
        const web3 = new Web3(torus.provider);

        const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

        const registeredWalletAddress = this.registerNewWalletAddress(accounts[0], chainId, torus.provider);

        return registeredWalletAddress;

    };

    // async Fortmatic () {

    //     console.log('connect Fortmatic');

    //     // https://replit.com/@fortmatic/demo-kitchen-sink

    //     // const fm = new Fortmatic('pk_test_96DF5BB9127A2C79');

    //     const fm = new Fortmatic('pk_live_7F5E8827DC55A364');
        
    //     const fortmaticProvider = fm.getProvider();

    //     // @ts-ignore
    //     const web3 = new Web3(fortmaticProvider);

    //     const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

    //     const registeredWalletAddress = this.registerNewWalletAddress(accounts[0], chainId, fortmaticProvider);

    //     return registeredWalletAddress;

    // };

    // async Portis () {

    //     console.log('connect Portis');

    //     // https://docs.portis.io/#/methods

    //     const portis = new Portis("211b48db-e8cc-4b68-82ad-bf781727ea9e", "rinkeby");

    //     portis.onError(error => { console.log('portis error', error) });

    //     const web3 = new Web3(portis.provider);

    //     const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

    //     const registeredWalletAddress = this.registerNewWalletAddress(accounts[0], chainId, portis.provider);

    //     return registeredWalletAddress;
        
    // };

    // async Authereum  () {

    //     console.log('connect Authereum');

    //     const authereum = new Authereum('kovan');

    //     const authereumProvider = authereum.getProvider();

    //     const web3 = new Web3(authereumProvider);

    //     await authereumProvider.enable();

    //     const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

    //     const registeredWalletAddress = this.registerNewWalletAddress(accounts[0], chainId, authereumProvider);

    //     return registeredWalletAddress;

    // };

}

export default Web3WalletProvider;