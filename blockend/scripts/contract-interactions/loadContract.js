require('dotenv').config();
const hre = require('hardhat');
const web3 = require('web3');

async function main() {
  const Exchange = await hre.ethers.getContractFactory('Exchange');
  const exchange = await Exchange.attach(
    process.env.CONTRACT_ADDRESS // The deployed contract address
  );
  console.log('exchange attached to:', exchange.address);

  const amount = web3.utils.toWei(process.env.AMOUNT);

  if (amount <= 0) {
    console.log(`Amount must be greater than 0, recieved: '${amount}'`);
    return;
  }

  console.log('Sending funds to contract...', amount);

  // Get owner wallet
  const [owner] = await hre.ethers.getSigners();

  // Send eth to contract from wallet
  owner.sendTransaction({
    to: process.env.CONTRACT_ADDRESS,
    value: amount,
  });

  // Get contract balance
  const bal = await exchange.getBalance();

  console.log('Loaded up contract', process.env.AMOUNT);
  console.log('Contract balance:', web3.utils.fromWei(bal._hex.toString(16)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
