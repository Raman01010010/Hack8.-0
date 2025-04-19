async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);

  const Entities = await ethers.getContractFactory('Entities');
  const entities = await Entities.deploy();
  await entities.deployed();

  console.log('Entities deployed to:', entities.address);

  // Save ABI and address for front-end
  const fs = require('fs');
  const path = require('path');
  const contractsDir = path.resolve(__dirname, '..', 'client', 'src', 'contract');
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  // Write ABI
  const abiPath = path.join(contractsDir, 'EntitiesABI.json');
  fs.writeFileSync(abiPath, JSON.stringify(Entities.interface.format(ethers.utils.FormatTypes.json)));
  // Write address
  const addressPath = path.join(contractsDir, 'contractAddress.js');
  fs.writeFileSync(
    addressPath,
    `export const entitiesAddress = '${entities.address}';\n`
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });