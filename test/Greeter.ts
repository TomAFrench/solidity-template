/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { Greeter } from "../typechain";
import { deploy } from "./helpers/deploy";

const setup = deployments.createFixture(async () => {
  await deployments.fixture();
  const admin = await ethers.getNamedSigner("admin");
  const greeter = await deploy("Greeter", {args: [], connect: admin}) as Greeter

  return {
    greeter,
  };
});

describe("Unit tests", function () {
  describe("Greeter", function () {
    let greeter: Greeter;
    beforeEach(async function () {
      const deployment = await setup();
      greeter = deployment.greeter;
    });

    it("should return the new greeting once it's changed", async function () {
      expect(await greeter.greet()).to.equal("Hello, world!");

      await greeter.setGreeting("Hola, mundo!");
      expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
  });
});
