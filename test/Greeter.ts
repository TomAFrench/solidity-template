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
    beforeEach(async function () {
      const { greeter } = await setup();
      this.greeter = greeter;
    });

    it("should return the new greeting once it's changed", async function () {
      expect(await this.greeter.greet()).to.equal("Hello, world!");

      await this.greeter.setGreeting("Hola, mundo!");
      expect(await this.greeter.greet()).to.equal("Hola, mundo!");
    });
  });
});
