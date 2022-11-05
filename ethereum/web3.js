import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window?.ethereum) {
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://sepolia.infura.io/v3/ac5159c3962542b38623d7b6fe102976"
        // 'https://goerli.infura.io/v3/9bd8017c45b74d23b080783a0a791c08',
    );
    web3 = new Web3(provider);
}

export default web3;
