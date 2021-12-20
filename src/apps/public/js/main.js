/* Moralis init code */
const serverUrl = "https://wh8r5pj5zptv.usemoralis.com:2053/server";
const appId = "LksPhCNEF1OGwW5OhMVamzE21bRnnyRYqZiid39m";
const mumbaiQuickSwapFactoryContract = '0x572b45382706345b7A91F4cFC2d224f1d4203F79';
const mumbaiQuickSwapRouterContract = '0xcEF8ed2ED9FBF122005786321fbba9eDb37b4A55';
const erc20Abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

let tokenSelection;
let tokens;

let swapPair = {
    "from": { "address": null, "balance": 0, "decimals": 0, "allowance": 0 },
    "to": { "address": null, "balance": 0, "decimals": 0, "allowance": 0 }
}

let liquidityPair = {
    "from": { "address": null, "balance": 0, "decimals": 0, "allowance": 0 },
    "to": { "address": null, "balance": 0, "decimals": 0, "allowance": 0 }
}

let contract = null;
let owner = null;
let web3 = null;


/* Authentication code */
async function login() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    owner = account;
    document.getElementById("btn-login").innerHTML = owner;
}

async function init() {
    await listAvailableTokens();
    await window.ethereum.enable();
    window.web3 = new Web3(Web3.givenProvider);
    web3 = window.web3;
}

async function listAvailableTokens() {
    console.log('called med???');
    const tokenList = document.getElementById("token_list");
    tokens = {
        '0x326C977E6efc84E512bB9C30f76E30c160eD06FB': {
            'symbol': 'LINK',
            'address': '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
            'logoURI': 'https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png',
            'decimals': 18,
        },
        '0x0fa8074acf7bbc635a44e0f22c3db7ffd3d8e39f': {
            'symbol': 'MEME',
            'address': '0x0fa8074acf7bbc635a44e0f22c3db7ffd3d8e39f',
            'logoURI': 'https://tokens.1inch.io/0x17ac188e09a7890a1844e5e65471fe8b0ccfadf3.png',
            'decimals': 18
        }
    }

    for (const address in tokens) {
        let token = tokens[address];
        let div = document.createElement("div");

        div.className = "token_row";
        let html = `
            <img class="token_list_img" src="${token.logoURI}">
            <span class="token_list_text">${token.symbol}</span>
        `
        div.innerHTML = html;
        div.onclick = (() => { selectToken(token.address); });
        tokenList.appendChild(div);
    }
}

async function selectToken(address) {
    closeModal();

    contract = new web3.eth.Contract(erc20Abi, address);
    console.log(address);
    let decimals = await contract.methods.decimals().call();
    let balance = await contract.methods.balanceOf(owner).call();
    let allowance = await contract.methods.allowance(owner, mumbaiQuickSwapRouterContract).call();
    let readableBalance = balance / 10 ** decimals;

    // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0];
    // console.log('account: ', account);
    // await contract.methods.approve(mumbaiQuickSwapRouterContract, '10000000000000000000').send({ from: '0x5939202E7d88F3f480c292c0E9051afBb3Ce777f' });

    if (tokenSelection == 'from') {
        swapPair.from.address = address;
        swapPair.from.readableBalance = readableBalance;
        swapPair.from.balance = balance;
        swapPair.from.decimals = decimals;
        swapPair.from.allowance = allowance;
    } else if (tokenSelection == 'to') {
        swapPair.to.address = address;
        swapPair.to.readableBalance = readableBalance;
        swapPair.to.balance = balance;
        swapPair.to.decimals = decimals;
        swapPair.to.allowance = allowance;
    } else if (tokenSelection == 'liquidity_from') {
        liquidityPair.from.address = address;
        liquidityPair.from.readableBalance = readableBalance;
        liquidityPair.from.balance = balance;
        liquidityPair.from.decimals = decimals;
        liquidityPair.from.allowance = allowance;
    } else {
        liquidityPair.to.address = address;
        liquidityPair.to.readableBalance = readableBalance;
        liquidityPair.to.balance = balance;
        liquidityPair.to.decimals = decimals;
        liquidityPair.to.allowance = allowance;
    }
    updateUI();
}

function updateUI() {
    if (!!swapPair.from.address) {
        document.getElementById("from_token_icon").src = tokens[swapPair.from.address].logoURI;
        document.getElementById("from_token_text").innerHTML = tokens[swapPair.from.address].symbol;
        document.getElementById("from_token_amount").value = swapPair.from.readableBalance;
    }

    if (!!swapPair.to.address) {
        document.getElementById("to_token_icon").src = tokens[swapPair.to.address].logoURI;
        document.getElementById("to_token_text").innerHTML = tokens[swapPair.to.address].symbol;
        document.getElementById("to_token_amount").value = swapPair.to.readableBalance;
    }

    if (!!liquidityPair.from.address) {
        document.getElementById("liquidity_from_token_icon").src = tokens[liquidityPair.from.address].logoURI;
        document.getElementById("liquidity_from_token_text").innerHTML = tokens[liquidityPair.from.address].symbol;
        document.getElementById("liquidity_from_token_amount").value = liquidityPair.from.readableBalance;
        updateApprovalButtonForAddLiquidity();
    }

    if (!!liquidityPair.to.address) {
        document.getElementById("liquidity_to_token_icon").src = tokens[liquidityPair.to.address].logoURI;
        document.getElementById("liquidity_to_token_text").innerHTML = tokens[liquidityPair.to.address].symbol;
        document.getElementById("liquidity_to_token_amount").value = liquidityPair.to.readableBalance;
        updateApprovalButtonForAddLiquidity();
    }
}

function updateApprovalButtonForAddLiquidity() {
    approvalBtn = $('#liquidity_approve_token');
    approvalBtn.hide();
    if (liquidityPair.from.balance > 0 && liquidityPair.from.balance > liquidityPair.from.allowance) {
        approvalBtn.text('Approve ' + tokens[liquidityPair.from.address].symbol);
        approvalBtn.data('address', liquidityPair.from.address);
        approvalBtn.show();
    } else if (liquidityPair.to.balance > 0 && liquidityPair.to.balance > liquidityPair.to.allowance) {
        approvalBtn.text('Approve ' + tokens[liquidityPair.to.address].symbol);
        approvalBtn.data('address', liquidityPair.to.address);
        approvalBtn.show();
    }
}

async function logOut() {
  console.log("logged out");
}

function openModal(selection) {
    document.getElementById("token_modal").style.display = "block";
    tokenSelection = selection;
}

function closeModal() {
    document.getElementById("token_modal").style.display = "none";
}

function getApprovalToken(address) {
    if (liquidityPair.from.address == address) { return liquidityPair.from; }
    if (liquidityPair.to.address == address) { return liquidityPair.to; }
    if (swapPair.from.address == address) { return swapPair.from; }
    if (swapPair.to.address == address) { return swapPair.to; }
}

function etherUnit(decimals) {
    const map = {
        '0': 'noether',
        '1': 'wei',
        '1000': 'kwei',
        '1000': 'Kwei',
        '1000': 'babbage',
        '1000': 'femtoether',
        '1000000': 'mwei',
        '1000000': 'Mwei',
        '1000000': 'lovelace',
        '1000000': 'picoether',
        '1000000000': 'gwei',
        '1000000000': 'Gwei',
        '1000000000': 'shannon',
        '1000000000': 'nanoether',
        '1000000000': 'nano',
        '1000000000000': 'szabo',
        '1000000000000': 'microether',
        '1000000000000': 'micro',
        '1000000000000000': 'finney',
        '1000000000000000': 'milliether',
        '1000000000000000': 'milli',
        '1000000000000000000': 'ether',
        '1000000000000000000000': 'kether',
        '1000000000000000000000': 'grand',
        '1000000000000000000000000': 'mether',
        '1000000000000000000000000000': 'gether',
        '1000000000000000000000000000000': 'tether'
    }
    return map[10 ** decimals];
}

async function getQuote() {
    // let amount = Number(Moralis.Units.ETH(document.getElementById('from_token_amount').value));
    // const quote = await Moralis.Plugins.oneInch.quote({
    //     chain: 'mumbai',
    //     fromTokenAddress: swapPair.from.address,
    //     toTokenAddress: swapPair.to.address,
    //     amount: amount
    // });
    // document.getElementById("to_token_amount").value = quote.toTokenAmount / 10 ** quote.toToken.decimals;
}


$(document).ready(() => {
    init();
    document.getElementById("from_token_select").onclick = (() => { openModal('from'); });
    document.getElementById("to_token_select").onclick = (() => { openModal('to'); });
    document.getElementById("liquidity_approve_token").onclick = (async () => {
        let address = $('#liquidity_approve_token').data('address');
        contract = new web3.eth.Contract(erc20Abi, address);
        const token = getApprovalToken(address);
        const unit = etherUnit(token.decimals);
        console.log(unit);
        console.log(token);
        await contract.methods.approve(mumbaiQuickSwapRouterContract, web3.utils.toWei(new web3.utils.BN(Number.MAX_SAFE_INTEGER), unit)).send({ from: owner });
        $('#liquidity_approve_token').hide();
    });

    document.getElementById("liquidity_from_token_select").onclick = (() => { openModal('liquidity_from'); });
    document.getElementById("liquidity_to_token_select").onclick = (() => { openModal('liquidity_to'); });

    document.getElementById("model_close_btn").onclick = closeModal;
    document.getElementById("btn-login").onclick = login;
    document.getElementById("from_token_amount").onblur = getQuote;
    document.getElementById("to_token_amount").onblur = getQuote;


/**
Access to XMLHttpRequest at 'https://wh8r5pj5zptv.usemoralis.com:2053/server/functions/getPluginSpecs' from origin 'http://localhost:8081' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

*/
    // if (Moralis.User.current()) {
    //     document.getElementById("btn-login").innerHTML = Moralis.User.current().get("ethAddress");
    // }
    // document.getElementById("btn-logout").onclick = logOut;
})
