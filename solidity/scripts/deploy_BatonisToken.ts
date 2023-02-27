import deploy from './_deploy';

const contractName = 'BatonisToken';

deploy(contractName, [])
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
