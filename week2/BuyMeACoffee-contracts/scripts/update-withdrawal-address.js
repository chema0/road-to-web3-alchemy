const hre = require("hardhat");

async function main() {
  // Get the example accounts we'll be working with.
  const [owner, tipper] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  // // Deploy the contract.
  // await buyMeACoffee.deployed();
  // console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

  // Try to change the withdrawal address
  console.log("== current withdrawal address ==");
  console.log(await buyMeACoffee.connect(owner).getWithdrawalOwner());

  await buyMeACoffee.connect(owner).updateWithdrawalAddress(tipper.address);
  console.log("== withdrawal address after change ==");
  console.log(await buyMeACoffee.connect(owner).getWithdrawalOwner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
