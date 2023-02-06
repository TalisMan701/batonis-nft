export const timeoutRequest = 500;
export const dateStartMint = new Date(Date.UTC(2022, 0, 21, 17, 0, 0, 0));

const saleAbi = [{'inputs':[{'internalType':'string','name':'name','type':'string'},{'internalType':'string','name':'symbol','type':'string'},{'internalType':'string','name':'baseTokenURI','type':'string'}],'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'approved','type':'address'},{'indexed':true,'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'operator','type':'address'},{'indexed':false,'internalType':'bool','name':'approved','type':'bool'}],'name':'ApprovalForAll','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'previousOwner','type':'address'},{'indexed':true,'internalType':'address','name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'from','type':'address'},{'indexed':true,'internalType':'address','name':'to','type':'address'},{'indexed':true,'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'Transfer','type':'event'},{'inputs':[],'name':'MAX_ELEMENTS','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'MAX_MINT_COUNT','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'count','type':'uint256'}],'name':'airdrop','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'approve','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_price','type':'uint256'}],'name':'changePrice','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'gasPriceLimit','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'getApproved','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'address','name':'operator','type':'address'}],'name':'isApprovedForAll','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'bytes','name':'signature','type':'bytes'}],'name':'mint','outputs':[],'stateMutability':'payable','type':'function'},{'inputs':[],'name':'name','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'owner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'ownerOf','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'paymentToken','outputs':[{'internalType':'contract IERC20','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'price','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'renounceOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'saleState','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'operator','type':'address'},{'internalType':'bool','name':'approved','type':'bool'}],'name':'setApprovalForAll','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'string','name':'baseTokenURI','type':'string'}],'name':'setBaseURI','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'setGasLimit','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'token','type':'address'}],'name':'setPaymentToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'bool','name':'_saleState','type':'bool'}],'name':'setSaleState','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'string','name':'salt','type':'string'}],'name':'setSignSalt','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'signer','type':'address'}],'name':'setSigner','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'withdrawAddress','type':'address'}],'name':'setWithdraw','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'bytes4','name':'interfaceId','type':'bytes4'}],'name':'supportsInterface','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'symbol','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'index','type':'uint256'}],'name':'tokenByIndex','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'uint256','name':'index','type':'uint256'}],'name':'tokenOfOwnerByIndex','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'tokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'totalSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'transferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'withdrawBalance','outputs':[],'stateMutability':'nonpayable','type':'function'}];
const paymentAbi = [{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'guy','type':'address'},{'name':'wad','type':'uint256'}],'name':'approve','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'src','type':'address'},{'name':'dst','type':'address'},{'name':'wad','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'wad','type':'uint256'}],'name':'withdraw','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'balanceOf','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'dst','type':'address'},{'name':'wad','type':'uint256'}],'name':'transfer','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[],'name':'deposit','outputs':[],'payable':true,'stateMutability':'payable','type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'},{'name':'','type':'address'}],'name':'allowance','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'payable':true,'stateMutability':'payable','type':'fallback'},{'anonymous':false,'inputs':[{'indexed':true,'name':'src','type':'address'},{'indexed':true,'name':'guy','type':'address'},{'indexed':false,'name':'wad','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'src','type':'address'},{'indexed':true,'name':'dst','type':'address'},{'indexed':false,'name':'wad','type':'uint256'}],'name':'Transfer','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'dst','type':'address'},{'indexed':false,'name':'wad','type':'uint256'}],'name':'Deposit','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'src','type':'address'},{'indexed':false,'name':'wad','type':'uint256'}],'name':'Withdrawal','type':'event'}];

export const testnet = {
    saleAddress :'0x61c6f598ddf4838b04fd61859e2f630e50558baa',
    workChainId: 80001,
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/s4XKzX2po9S0N3zoBqRhEk5q9iEJNVgR',
    explorerUrl: 'https://rinkeby.etherscan.io/',
    symbol: 'TERN',
    chainName: 'Polygon Mumbai',
    coinName: 'MATIC',
    decimals: 18,
    paymentSymbol: 'TERN',
    paymentAddress: '0xe357C8194505786F7A9A60a134d56437fD427caD',
    paymentAbi,
    saleAbi,
}

export const mainnet = {
    saleAddress : '0x030f2bD40000A932a76a3C3580E212C52c61BCbe',
    workChainId : 137,
    rpcUrl : 'https://polygon-rpc.com',
    explorerUrl : 'https://polygonscan.com/',
    symbol : 'MATIC',
    chainName : 'Polygon',
    coinName : 'MATIC',
    decimals : 18,
    paymentSymbol: 'ETH',
    paymentAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    paymentAbi,
    saleAbi,
}
