import { ethers, run, network, artifacts } from 'hardhat';
import path from "path";
import * as fs from "fs";
import {Contract} from "ethers";

const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const getContractUrl = (address: string) => {
  let domain = 'etherscan.io';

  // alts
  switch (network.name) {
    case 'hardhat': domain = 'localhost'; break;
    case 'rinkeby': domain = 'rinkeby.etherscan.io'; break;
    case 'polygon': domain = 'polygonscan.com'; break;
    case 'polygonMumbai': domain = 'mumbai.polygonscan.com'; break;
    case 'bsc': domain = 'bscscan.com'; break;
    case 'bscTestnet': domain = 'testnet-explorer.binance.org'; break;
  }

  return `https://${ domain }/address/${ address }`;
}

export default async function deploy(contractName: string, constructorArguments: any[]) {
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contract = await ContractFactory.deploy(...constructorArguments);

  console.log(`Deploying to ${ network.name } ...`);

  // This solves the bug in Mumbai network where the contract address is not the real one
  const txHash = contract.deployTransaction.hash;
  console.log(`Tx hash: ${ txHash }\nWaiting for transaction to be mined (5 confirmations)...`);
  const txReceipt = await ethers.provider.waitForTransaction(txHash, 5);

  console.log(`Contract address: `, txReceipt.contractAddress);
  console.log(`Deployed: `, getContractUrl(txReceipt.contractAddress));
  saveFrontendFiles({
    [contractName]: contract
  })

  if (network.name !== 'hardhat') {
    console.log('Wait 15s for verification');

    await wait(15_000);

    try {
      await run('verify:verify', {
        address: txReceipt.contractAddress,
        constructorArguments
      });
    }
    catch (err: any) {
      console.error(err && err.message);
    }
  }
}

function saveFrontendFiles(contracts: { [key: string]: Contract; }){
  const contractsDir = path.join(__dirname, "/../..", "src/api/contracts")
  if(!fs.existsSync(contractsDir)){
    fs.mkdirSync(contractsDir)
  }
  Object.entries(contracts).forEach((contract_item) => {
    const [name, contract] = contract_item
    if(contract){
      fs.writeFileSync(
          path.join(contractsDir, "/", name + '-contract-address.json'),
          JSON.stringify({[name]: contract.address}, undefined, 2)
      )
      const ContractArtifact = artifacts.readArtifactSync(name)
      fs.writeFileSync(
          path.join(contractsDir, "/", name + '.json'),
          JSON.stringify(ContractArtifact, undefined, 2)
      )
    }
  })
}
