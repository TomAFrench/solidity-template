import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import { ChainId, infuraApiKey, mnemonic } from "./config";
import "./tasks/accounts";
import "./tasks/clean";


import "hardhat-deploy";
// To make hardhat-waffle compatible with hardhat-deploy
// we have aliased hardhat-ethers to hardhat-ethers-deploy in package.json
import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter";
import "hardhat-typechain";
import "solidity-coverage";

function createTestnetConfig(network: keyof typeof ChainId): NetworkUserConfig {
    const url = `https://${network}.infura.io/v3/${infuraApiKey}`;
    return {
        accounts: {
            count: 10,
            initialIndex: 0,
            mnemonic,
            path: "m/44'/60'/0'/0",
        },
        chainId: ChainId[network],
        url,
    };
}

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: 0, // Do not use this account for testing
        admin: 1,
    },
    networks: {
        hardhat: {
            chainId: ChainId.hardhat,
            saveDeployments: false,
        },
        goerli: createTestnetConfig("goerli"),
        kovan: createTestnetConfig("kovan"),
        rinkeby: createTestnetConfig("rinkeby"),
        ropsten: createTestnetConfig("ropsten"),
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        version: "0.8.0",
        settings: {
            // https://hardhat.org/hardhat-network/#solidity-optimizer-support
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 100,
        excludeContracts: ["Mock", "ERC20"],
    },
};

export default config;
