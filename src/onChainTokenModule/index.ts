//@ts-nocheck

import {requiredParams} from './../utils/index';

export class OnChainTokenModule {

    constructor() {}

    getOnChainAPISupportBool (apiName, chain) {

        const apiBlockchainSupport = {
            opensea: [
                'eth',
                'mainnet', 
                'rinkeby'
            ],
            alchemy: [
                'eth',
                'mainnet', 
                'rinkeby', 
                'arbitrum', 
                'polygon', 
                'optimism'
            ],
            moralis: [
                'eth',
                'mainnet', 
                'rinkeby',
                'ropsten',
                'goerli',
                'kovan',
                'bsc',
                'polygon',
                'mumbai',
                'avalanche',
                'fantom'
            ],
            poap: [
                'xdai'
            ]
        }
        
        // TODO add support XDAI.
        // https://www.xdaichain.com/for-developers/developer-resources/ankr-api

        return apiBlockchainSupport[apiName].indexOf(chain) >= -1;

    }

    /**
     * @function getInitialContractAddressMetaData
     * @description returns initial contract address data collection name & image.
     * @param {String} issuerKey a concatenated string of the smart contract address and the chain.
     * @example issuerKey example: 0x381748c76f2b8871afbbe4578781cd24df34ae0d-rinkeby
     * @returns from searching API's
     * {
                chain: "rinkeby",
                contractAddress: "0x381748c76f2b8871afbbe4578781cd24df34ae0d",
                image: "https://storage.googleapis.com/opensea-rinkeby/0x381748c76f2b8871afbbe4578781cd24df34ae0d.png",
                title: "OpenSea Creature Sale"
        }
    */
    async getInitialContractAddressMetaData (issuer:any) {

        const { contract, chain, openSeaSlug } = issuer;

        let collectionData = null;

        // POAP
        // TODO: move this into a registry like tokenLookup
        if (contract.toLowerCase() == "0x22c1f6050e56d2876009903609a2cc3fef83b415"){
            return {
                chain,
                contract,
                emblem: "https://storage.googleapis.com/subgraph-images/1647414847706poap.jpeg",
                title: "POAP Proof of attendance protocol"
            }
        }

        // try open sea first when there is a slug provided
        if (openSeaSlug) collectionData = await this.getContractDataOpenSea(contract, chain, openSeaSlug);

        // if there is no slug or no data try moralis
        if(!openSeaSlug && !collectionData) collectionData = await this.getContractDataMoralis(contract, chain);

        // if there is still no data try Alchemy
        if(!openSeaSlug && !collectionData) collectionData = await this.getContractDataAlchemy(contract, chain);

        return collectionData;
    }

    /**
     * @function getContractDataOpenSea
     * @description returns from OpenSea API initial contract address data collection name & image.
     * @param {string} contractAddress smart contract address
     * @param {string} chain chain name used to search via api
     * @returns 
     * {
                chain: "rinkeby",
                contractAddress: "0x381748c76f2b8871afbbe4578781cd24df34ae0d",
                image: "https://storage.googleapis.com/opensea-rinkeby/0x381748c76f2b8871afbbe4578781cd24df34ae0d.png",
                title: "OpenSea Creature Sale"
        }
    */
    async getContractDataOpenSea(contractAddress:string, chain:string, openSeaSlug:string) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;
        
        if(chain.toLocaleLowerCase() === "rinkeby") {

            let options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': '99687116fafa4daebc766eeedccce201'}};

            return fetch(`https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
            .then(response => {
                return  {
                    chain,
                    contractAddress,
                    image: response.assets[0].collection.image_url,
                    title: response.assets[0].collection.name
                };
            })
            .catch(err => console.error(err));
        
        } 
        
        if(chain.toLocaleLowerCase() === "mainnet" || chain.toLocaleLowerCase() === "eth") {

            let options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': '3940c5b8cf4a4647bc22ff9b0a84f75a'}};

            return fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
            .then(response => {
                return  {
                    chain,
                    contractAddress,
                    image: response.assets[0].collection.image_url,
                    title: response.assets[0].collection.name
                };
            })
            .catch(err => console.error(err));
        
        } 

        return;

    }
    
    async getContractDataMoralis(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        const options = { 
            method: 'GET',
            headers: {
                'x-api-key': 'WMrMeZLy2pajBLmwf1AUccxFzQy98OEMeDQPaTK8BcTI8XK2f9WZrVpjGYQcujSF' 
            }
        };

        if(chain.toLocaleLowerCase() === "mainnet" || chain.toLocaleLowerCase() === "eth") {

            const _chain = 'eth';

            return fetch(`https://deep-index.moralis.io/api/v2/nft/${contractAddress}?chain=${_chain}&format=decimal&limit=1`, options)
            .then(response => response.json())
            .then(response => {

                const image = JSON.parse(response.result[0].metadata).image;

                return {
                    api: 'moralis',
                    chain,
                    contractAddress,
                    image,
                    title: response.result[0].name
                };
            })
            .catch(err => console.error(err));
        
        } 

    }
    
    async getContractDataAlchemy(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;

        var requestOptions = {
            method: 'GET',
            headers: {
                redirect: 'follow'
            }
        };

        const apiKey = "CWaS4PkRjFi3dAzrRD6lsrQ7vAyPYsnU";
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
        const tokenId = "0";
        const withMetadata = "true";
        const fetchURL = `${baseURL}?contractAddress=${contractAddress}&cursorKey=${tokenId}&withMetadata=${withMetadata}`;
    
        const promise = new Promise((resolve, reject) => {
            fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then((result:any) => {
                
                if(!result.nfts.length) resolve([]);

                resolve({
                    api: 'alchemy',
                    chain,
                    contractAddress,
                    image: result.nfts[0].metadata.image,
                    title: result.nfts[0].title
                });
            })
            .catch(error => console.log('error', error)); // reject
            
        });
        return promise;
    }

    async connectOnChainToken (issuer:string, owner:string) {

        const { contract, chain, openSeaSlug } = issuer;

        let tokens = [];

        if (contract.toLowerCase() == "0x22c1f6050e56d2876009903609a2cc3fef83b415"){
            return this.getTokensPOAP(owner);
        }

        if(openSeaSlug) tokens = await this.getTokensOpenSea(contract, chain, owner, openSeaSlug);

        if(!openSeaSlug && !tokens.length) tokens = await this.getTokensMoralis(contract, chain, owner);

        if(!openSeaSlug && !tokens.length) tokens = await this.getTokensAlchemy(contract, chain, owner);

        return tokens;

    }

    async getTokensOpenSea(address:string, chain:string, owner:string, openSeaSlug:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        if(chain === 'rinkeby') {

            let options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': '99687116fafa4daebc766eeedccce201'}};
            
            return fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${owner}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
            .then(response => {

                return response.assets.map((item:any) => {
                    const image = item.image_url ? item.image_url : '';
                    const title = item.name ? item.name : '';
                    return {
                        api: 'opensea',
                        title: title,
                        image: image,
                        data: item
                    }
                });
            })
            .catch(err => {
                console.error(err);
            });

        }
        
        if(chain === 'mainnet' || chain === 'eth') {

            let options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '3940c5b8cf4a4647bc22ff9b0a84f75a'} };
            
            return fetch(`https://api.opensea.io/api/v1/assets?owner=${owner}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
            .then(response => {

                return response.assets.map((item:any) => {
                    const image = item.image_url ? item.image_url : '';
                    const title = item.name ? item.name : '';
                    return {
                        api: 'opensea',
                        title: title,
                        image: image,
                        data: item
                    }
                });
            })
            .catch(err => {
                console.error(err);
            });
        }

        return;
    }
    
    async getTokensMoralis(address:string, chain:string, owner:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        let _chain:string = chain;

        if (chain === 'mainnet') _chain = 'eth';

        const options = {
            method: 'GET',
            headers: {
                'x-api-key': 'WMrMeZLy2pajBLmwf1AUccxFzQy98OEMeDQPaTK8BcTI8XK2f9WZrVpjGYQcujSF' 
            }
        };

        return fetch(`https://deep-index.moralis.io/api/v2/${owner}/nft/${address}?chain=${_chain}&format=decimal`, options)
        .then(response => response.json())
        .then((response:any) => {

            return response.result.map((item:any) => {
                
                const parsedMetaObj = JSON.parse(item.metadata);
                const image = parsedMetaObj.image ? parsedMetaObj.image : '';
                const title = parsedMetaObj.name ? parsedMetaObj.name : '';

                return {
                    api: 'moralis',
                    title: title,
                    image: image,
                    data: parsedMetaObj
                }

            });

        })
        .catch(err => console.error(err));
        
    }

    async getTokensAlchemy (address:string, chain:string, owner:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;
        
        const promise = new Promise((resolve, reject) => {

            var requestOptions = {
            method: 'GET',
            headers: {
                redirect: 'follow'
            }
            };
            
            const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
            const fetchURL = `${baseURL}?owner=${owner}&contractAddresses[]=${address}`;
            
            fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                const tokens = result.ownedNfts.map((item) => {
                    return {
                        api: 'alchemy',
                        title: item.title,
                        image: item.metadata.image,
                        data: item
                    }
                });
                resolve(tokens);
            })
            .catch(error => console.log('error', error))
        });

        return promise;
    }

    async getTokensPOAP(owner:string){

        // Uncomment to test a really large POAP collection - this guy gets around
        //let url = `https://api.poap.xyz/actions/scan/0x4d2803f468b736b62fe9eec992c8f4c41be4cb15`;
        let url = `https://api.poap.xyz/actions/scan/${owner}`;

        let res = await fetch(url, {
            method: 'GET'
        });

        let data = await res.json();

        let tokens = [];

        for (let token of data){

            tokens.push({
                title: token.event.name,
                image: token.event.image_url,
                data: token
            });
        }

        return tokens;
    }

}

export default OnChainTokenModule;
