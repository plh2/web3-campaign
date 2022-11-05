# Web3 project

## TIP

web3 not work with next@13, pls use next@12.

## How to run

```sh
node ./ethereum/compile.js && npx rimraf .env && KEY=YOUR_KEY node ./ethereum/deploy.js >> .env && yarn dev
```

## Explain

```sh
node ./ethereum/compile.js                        # compile solidity
npx rimraf .env                                   # remove .env file
KEY="YOUR_KEY" node ./ethereum/deploy.js >> .env  # deploy solidity to online eth chain and get the online contract address and wirte down it into .env file. 
yarn dev                                          # run the next-reactjs web app
```

## Preparation

1. install MetaMask Chrome extension

2. This contract will deploy into **Sepolia network**, pls make sure you are already select Sepolia network.

    ![network-select](./public/network-select.png)
    
3. connect this website 

    ![image](https://user-images.githubusercontent.com/14355994/200105268-62747961-914b-4915-9151-0a9ed1a2229b.png)

4. Prepare your metamask 12 word phrase
