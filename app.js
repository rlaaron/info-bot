/* Importing the axios and ethers libraries. */
const axios = require('axios')
const { ethers } = require('ethers')


/**
 * It takes two arguments, an address and an apiKey, and returns a url.
 * param address - The address of the contract you want to get the ABI for.
 * param apiKey - Your API key from Etherscan.io
 * returns A function that takes two arguments, address and apiKey, and returns a string.
 */
const geturl = (address, apiKey) => {
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    return url;
}

/* The url for the infura api. */
const infuraUrl = 'https://mainnet.infura.io/v3/0f9bcfd505d7446cb8d7a69bdef43497'

/**
 * It takes in a url and an address, and returns an object with the name, cost, total supply, max
 * supply, max mint amount per tx, max mint amount per wallet, and whether or not the contract has a
 * revealed function.* 
 * returns An object with the following properties:
 * name, cost, totalSupply, maxsupply, maxtx, maxWallet, reveled, left
 */
const getAbi = async (url, address) => {
    let info = new Object();
    const res = await axios.get(url)
    const abi = JSON.parse(res.data.result)
    const address2 = address;
    //  console.log(abi)
    const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
    const contract = new ethers.Contract(
        address2,
        abi,
        provider
    )

    /* Checking if the contract has a name. If it does, it will return the name. If it doesn't, it will
    return "name not found". */
    if (contract.name) {
        const name = await contract.name();
        info.name = `${name}\n`;
    } else {
        info.name = `:grey_question:\n`;
    }

    /* Checking if the contract has a cost, price, or PRICE function. If it does, it will return the
    cost, price, or PRICE. If it doesn't, it will return "Free". */
    if (contract.cost) {
        const cost = await contract.cost();
        costeth = cost / 1000000000000000000;
        info.cost = `${costeth.toString()}\n`
    } else if (contract.price) {
        const cost = await contract.price();
        costeth = cost / 1000000000000000000;
        info.cost = `${costeth.toString()}\n`
    } else if (contract.PRICE) {
        const cost = await contract.PRICE();
        costeth = cost / 1000000000000000000;
        info.cost = `${costeth.toString()}\n`
    } else {
        info.cost = "Free\n";
    }

    

    /* Checking if the contract has a total supply. If it does, it will return the total supply. If it
    doesn't, it will return "total supply not found". */
    let totalSupply;
    if (contract.totalSupply) {
        totalSupply = await contract.totalSupply()
        info.totalSupply = `${totalSupply.toString()}\n`;
    } else {
        info.totalSupply = `:grey_question:\n`;
    }


    /* Checking if the contract has a maxSupply, TOKEN_LIMIT, or MAX_SUPPLY function. If it does, it
    will return the maxSupply, TOKEN_LIMIT, or MAX_SUPPLY. If it doesn't, it will return
    ":grey_question:". */
    let maxSupply;
    if (contract.maxSupply) {
        maxSupply = await contract.maxSupply()
        info.maxsupply = `${maxSupply.toString()}\n`
    } else if (contract.TOKEN_LIMIT) {
        maxSupply = await contract.TOKEN_LIMIT()
        info.maxsupply = `${maxSupply.toString()}\n`
    } else if (contract.MAX_SUPPLY) {
        maxSupply = await contract.MAX_SUPPLY()
        info.maxsupply = `${maxSupply.toString()}\n`
    } else{
        info.maxsupply = ":grey_question:\n";
    }


    /* Checking if the contract has a maxMintAmountPertx, MAX_JUDGE_MINT, maxMintSupply, or
    maxMintAmount function. If it does, it will return the maxMintAmountPertx, MAX_JUDGE_MINT,
    maxMintSupply, or maxMintAmount. If it doesn't, it will return ":grey_question:". */
    if (contract.maxMintAmountPertx) {
        const maxMintAmountPerTx = await contract.maxMintAmountPertx()
        info.maxtx = `${maxMintAmountPerTx.toString()}\n`
    } else if (contract.MAX_JUDGE_MINT) {
        const maxMintAmountPerTx = await contract.MAX_JUDGE_MINT()
        info.maxtx = `${maxMintAmountPerTx.toString()}\n`
    } else if (contract.maxMintSupply) {
        const maxMintAmountPerTx = await contract.maxMintSupply()
        info.maxtx = `${maxMintAmountPerTx.toString()}\n`
    } else if (contract.maxMintAmount) {
        const maxMintAmountPerTx = await contract.maxMintAmount()
        info.maxtx = `${maxMintAmountPerTx.toString()}\n`
    } else {
        info.maxtx = ":grey_question:\n";
    }

    /* Checking if the contract has a maxMintAmountPertx, MAX_JUDGE_MINT, maxMintSupply, or
        maxMintAmount function. If it does, it will return the maxMintAmountPertx, MAX_JUDGE_MINT,
        maxMintSupply, or maxMintAmount. If it doesn't, it will return ":grey_question:". */
    if (contract.PUBLIC_MINT_LIMIT_PER_WALLET) {
        const maxMintWallet = await contract.PUBLIC_MINT_LIMIT_PER_WALLET()
        info.maxWallet = `${maxMintWallet.toString()}\n`
    } else if (contract.MAX_PER_ACCOUNT) {
        const maxSupply = await contract.MAX_PER_ACCOUNT()
        info.maxWallet = `${maxSupply.toString()}\n`
    } else if (contract.MAX_PER_WALLET) {
        const maxSupply = await contract.MAX_PER_WALLET()
        info.maxWallet = `${maxSupply.toString()}\n`
    } else if (contract.limitPerAccount) {
        const maxSupply = await contract.limitPerAccount()
        info.maxWallet = `${maxSupply.toString()}\n`
    } else {
        info.maxWallet = ":grey_question:\n";
    }


    /* Checking if the contract has a revealed function. If it does, it will return the value of the
    revealed function. If it doesn't, it will return "Insta Reveal". */
    if (contract.revealed) {
        const revealed = await contract.revealed()

        info.reveled = `${revealed.toString()}\n`
    } else {
        info.reveled = "Insta Reveal\n";
    }

    /* Subtracting the total supply from the max supply and then adding it to the info object. */
    let left = maxSupply - totalSupply;
    info.left = `${left.toString()}\n`;

    return info;

}
// geturl()

// getAbi(geturl(address,apiKey))
module.exports = {
    getAbi,
    geturl
}