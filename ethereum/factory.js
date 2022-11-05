import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

console.log("your address:", process.env.ADDRESS);

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    process.env.ADDRESS
    // "0x1142BdA8857e9c95C837870253792f8ec9e20899"
);

export default instance;
