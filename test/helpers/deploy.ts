import { Contract, Signer } from "ethers";
import { deployments, ethers } from "hardhat";

export async function deploy(
  deploymentName: string,
  { from, args, connect }: { from?: string; args: Array<unknown>, connect?: Signer; },
  contractName: string = deploymentName,
): Promise<Contract> {
    // Unless overriden, deploy from named address "deployer"
    if (from === undefined){
        const deployer = await ethers.getNamedSigner("deployer")
        from = deployer.address
    }

    const deployment = await deployments.deploy(deploymentName, {
        from,
        contract: contractName,
        args: args,
        log: true
    })

    const instance = await ethers.getContractAt(deploymentName, deployment.address)

    return connect ? instance.connect(connect) : instance;
}
