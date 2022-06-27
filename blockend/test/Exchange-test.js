const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Exchange', function () {
  const deploy = async () => {
    const Exchange = await ethers.getContractFactory('Exchange');
    const exchange = await Exchange.deploy();
    await exchange.deployed();

    return exchange;
  };

  it('Should be able to accept ether', async function () {
    const exchange = await deploy();
    expect(await greeter);
    expect(await greeter.greet()).to.equal('Hello, world!');

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
