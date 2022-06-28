require('dotenv').config();
const hre = require('hardhat');
const web3 = require('web3');

const TRANSFER_AMOUNT = '0.01';
const RECIPIENT_ADDRESS = '0xCDa725B79fe5B06Ab86E1ff26231c1D7158fF278';

async function main() {
  const Exchange = await hre.ethers.getContractFactory('Exchange');
  const exchange = await Exchange.attach(
    process.env.CONTRACT_ADDRESS // The deployed contract address
  );
  console.log('exchange attached to:', exchange.address);

  const amount = web3.utils.toWei(TRANSFER_AMOUNT);

  if (amount <= 0) {
    console.log(`Amount must be greater than 0, recieved: '${amount}'`);
    return;
  }

  console.log('Sending funds to contract...', amount);

  // Transfer ETH
  await exchange.transfer(RECIPIENT_ADDRESS, amount);
  const bal = await exchange.getBalance();

  console.log('Successfully transferred eth to:', RECIPIENT_ADDRESS);
  console.log('Contract balance:', web3.utils.fromWei(bal._hex.toString(16)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
