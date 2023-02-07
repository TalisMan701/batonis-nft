import deploy from './_deploy';

const contractName = 'BatonisNFT';
const contractArguments = ['BatonisNFT', 'BTN', 'http://localhost:8080'];

deploy(contractName, contractArguments)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
