import { infuraApiKey, maticVigilApiKey } from "./env";

export enum ChainId {
    ganache = 1337,
    goerli = 5,
    hardhat = 31337,
    kovan = 42,
    mainnet = 1,
    matic = 137,
    mumbai = 80001,
    rinkeby = 4,
    ropsten = 3,
}

// Delegate requests for a network config to a provider specific function based on which networks they serve

// Ethereum
const infuraChains = ["goerli", "kovan", "mainnet", "rinkeby", "ropsten"] as const;
type InfuraChains = typeof infuraChains[number];
const getInfuraConfig = (network: InfuraChains): { url: string; chainId: number } => {
    if (!process.env.INFURA_API_KEY) {
        throw new Error("Please set your INFURA_API_KEY in a .env file");
    }
    return {
        url: `https://${network}.infura.io/v3/${infuraApiKey}`,
        chainId: ChainId[network],
    };
};

// Matic
const maticVigilChains = ["matic", "mumbai"] as const;
type MaticVigilChains = typeof maticVigilChains[number];
const getMaticVigilConfig = (network: MaticVigilChains): { url: string; chainId: number } => {
    if (!maticVigilApiKey) {
        throw new Error("Please set your MATICVIGIL_API_KEY in a .env file");
    }
    return {
        url: `https://rpc-${network}.maticvigil.com/v1/${maticVigilApiKey}`,
        chainId: ChainId[network],
    };
};

export type RemoteChains = InfuraChains | MaticVigilChains;
export const getRemoteNetworkConfig = (network: RemoteChains): { url: string; chainId: number } => {
    if (infuraChains.includes(network as InfuraChains)) return getInfuraConfig(network as InfuraChains);
    if (maticVigilChains.includes(network as MaticVigilChains)) return getMaticVigilConfig(network as MaticVigilChains);
    throw Error("Unknown network");
};
