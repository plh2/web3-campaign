# Web3 project

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6704c51-7e81-40be-a171-7b338b183f14/deploy-status)](https://app.netlify.com/sites/delightful-valkyrie-f13641/deploys)

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
yarn dev                                          # dev the next-reactjs web app
yarn build && yarn start                          # build and deploy the web app
```

## Preparation

1. install MetaMask Chrome extension

2. This contract will deploy into **Sepolia network**, pls make sure you are already select Sepolia network.

    ![network-select](./public/network-select.png)

3. connect this website

    ![image](https://user-images.githubusercontent.com/14355994/200105268-62747961-914b-4915-9151-0a9ed1a2229b.png)

4. Prepare your metamask 12 word phrase

## Routers

1. / => campaigns

2. /campaigns/new => create campaign

3. /campaigns/[:address] => campaign details

4. /campaigns/0x02C54A2A5978Dc3367a8a69e0cF242E72BF44162/requests => campaign request list

5. /campaigns/0x02C54A2A5978Dc3367a8a69e0cF242E72BF44162/requests/new => create campaign request

## Screenshot

Campaigns

![image](https://user-images.githubusercontent.com/14355994/200113643-f6483f60-9a3b-4ff5-a38e-9e86944880bc.png)

Campaign Details

![image](https://user-images.githubusercontent.com/14355994/200113652-39dfbd67-1fb6-4635-8650-d65352204981.png)

Requests

![image](https://user-images.githubusercontent.com/14355994/200113597-fe4f26fd-668e-466c-879d-3aa779a16112.png)



