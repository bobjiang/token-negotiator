# token-negotiator

<!--
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftokenscript%2Ftoken-negotiator%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/tokenscript/token-negotiator/goto?ref=main)
-->

The Token Negotiator is an NPM package designed to load tokens into any website experience. Enabling custom user experiences for token holders.  

The following types of tokens are supported:

- Cryptogaphically created Tokens (Off Chain)

- Web3 NFT Tokens (On Chain)

(for new token issuers who are interested in using our technology please visit the following WIKI page: https://github.com/TokenScript/token-negotiator/wiki/Token-Issuer-Page).

### Token Negotiator supports Tokens across the following Chains

- mainnet
- polygon
- arbitrum 
- optimism
- rinkeby
- ropsten
- goerli
- kovan
- bsc
- mumbai
- avalanche
- fantom
- POAP via XDai

### Examples

A live demonsration of the Token Negotiator and development examples can be found here:

https://github.com/TokenScript/token-negotiator-examples 

## Installation

Within your application install the token negotiator:

```sh
  npm i @tokenscript/token-negotiator
```

This library provides two ways to load tokens into your application, active or passive. 

### Active Negotiation of tokens

This approach embeds a html element UI widget into the web page. The end user can then select which collections they wish for the website to learn. 

To start, first include the following html element into your page, this is where the token negotiator overlay widget will be embeded into the page.

````html
    <div className="overlay-tn"></div>
````

Include the following Javascript to configure the Token Negotiator. 

Add issuers with tokens that you wish for your website to recognise. 

```javascript
  
  import { Client } from '@tokenscript/token-negotiator';
  
  const filter = {};

  let tokens = [];

  // configure
  const negotiator = new Client({
    type: 'active',
    issuers: [
        { collectionID: 'devcon', tokenConfigURI: "https://raw.githubusercontent.com/TokenScript/token-negotiator-examples/main/token-outlet-website/public/tokenConfig.json" },
        { collectionID: 'expansion-punks', contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth' }
    ],
    options: {
        overlay: {
            openingHeading: "Open a new world of discounts available with your tokens.",
            issuerHeading: "Get discount with Ticket",
            repeatAction: "try again",
            theme: "light",
            position: "bottom-right"
        },
        filters: {},
    }
  });

  // invoke

  negotiator.negotiate();

  // event hooks

  negotiator.on("tokens-selected", (tokens) => { 
    
    // use tokens

  });

  negotiator.on("token-proof", (proof) => { 
          
    // use proof

  });

```
### Passive Negotiation of tokens

This approach is designed for a fully custom ui/ux experience, where a list of all tokens are learnt by the client on negotation.

````javascript

  import { Client } from '@tokenscript/token-negotiator';

  const negotiator = new Client({
    type: 'passive',
    issuers: [
      { collectionID: 'devcon', tokenConfigURI: "https://raw.githubusercontent.com/TokenScript/token-negotiator-examples/main/token-outlet-website/public/tokenConfig.json" },
      { collectionID: 'expansion-punks', contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth' }
    ],
    options: {}
  });

  negotiator.on('tokens', (issuerTokens) => {
    
    // use tokens

  });

  negotiator.on("token-proof", (tokenProof) => {

    // use proof

  });
  
  // invoke

  negotiator.negotiate();
  
````

### Managing Issuers on chain

````javascript

  /**
  * @param {String} collectionID your own reference key to identify the collection by.
  * @param {String} contract smart contract address
  * @param {String} chain smart contract address chain 
  */
  var onChainIssuer = { collectionID: 'expansion-punks', contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth' }

````
### Managing Issuers off chain

````javascript
  
  /**
  * @param {String} collectionID your own reference key to identify the collection by.
  * @param {String} tokenConfigURI the token collection config uri
  */
  var offChainIssuer = { collectionID: 'devcon', tokenConfigURI: "https://raw.githubusercontent.com/TokenScript/token-negotiator-examples/main/token-outlet-website/public/tokenConfig.json" },
  
````

### Authenticate ownership of off chain Token

Authenicating ownership of the token will provide a proof with a limited expiry.

````javascript

  /**
  * @param {String} issuer token issuer
  * @param {Object} unsignedToken token to attest
  */
  negotiator.authenticate({ 
    issuer, 
    unsignedToken 
  });

  negotiator.on('proof', () => {

    // the proof will be recieved here (valid or failed)

  });

````

### Creating a UMD build, which will export the library as a single file.

For projects where you are not using a Node.js work flow.

````sh
  
  // install dependancies
  run `npm i` 

  // create the build
  run `npm run build-umd`

````

Locate and copy the '/dist' folder to your website generated from the UMD build. 

Configure the library using the following example.

````html

  <!-- add the JS library -->
  <script type="text/javascript" src="./dist/negotiator.js"></script>

  <!-- add the HTML entry point for the Token Negotiator -->
  <div class="overlay-tn"></div>

  <!-- instantiate the library and include event hooks as required -->
  <script>

        var negotiator = new negotiator.Client({
            type: 'active',
            issuers: [
                { collectionID: 'devcon', tokenConfigURI: "https://raw.githubusercontent.com/TokenScript/token-negotiator-examples/main/token-outlet-website/public/tokenConfig.json" },
            ],
            options: {
                overlay: {
                    openingHeading: "Open a new world of discounts available with your tokens.",
                    issuerHeading: "Get discount with Ticket",
                    repeatAction: "try again",
                    theme: "light",
                    position: "bottom-right"
                },
                filters: {},
            }
        });

        negotiator.on("tokens-selected", (tokens) => {
            console.log(tokens);
        });

        negotiator.on("token-proof", (proof) => {
            console.log(proof);
        });

        negotiator.negotiate();

    </script>


````

## filters

Key values applied to all tokens.

````javascript

  filter: {
    'devconId': 6,
    'ticketId': 417541561854,
    'class': 'gold'
  }

````

## Connecting to issuers

Please see the token negotiator examples repository.

[Token Negotiator Examples](https://github.com/TokenScript/token-negotiator-examples/tree/main/token-outlet-website)

## New Token Issuers

Please reach out to us at <sayhi@smarttokenlabs.com>

## Tests

run `npm run test`

## Development of this library.

[Development WIKI](https://github.com/TokenScript/token-negotiator/wiki/developers)

### Help / Questions / Improvements

Please contact us or open an issue via github:
sayhi@smarttokenlabs.com

### Quick Start

To review working examples of the token negotiator please visit;

[Our Wiki](https://github.com/TokenScript/token-negotiator/wiki)

[Quick Start Guide](https://github.com/TokenScript/token-negotiator-examples/wiki/quick-start)

### Roadmap of this library

[Our Roadmap](https://github.com/TokenScript/token-negotiator/wiki/road-map)
