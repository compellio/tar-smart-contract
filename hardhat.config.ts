import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import dotenv from "dotenv";
import yargs from "yargs";
import {HttpNetworkUserConfig} from "hardhat/types";

// Extract selected network from CLI arguments
const vargs = yargs
    .help(false).version(false)
    .option("network", {
        type: "string",
        default: "hardhat"
    })
    .parseSync();

dotenv.config();

const {
    TAR_DEPLOYER_KEY,
    TAR_OWNER,
    TAR_URI_PREFIX,
    TAR_URI_POSTFIX,
    TAR_JSON_RPC_URL,
    TAR_SAVE_DEPLOYMENT,
    TAR_ETHERSCAN_URL,
    TAR_ETHERSCAN_API_KEY
} = process.env;

if (!TAR_URI_PREFIX) {
    throw Error("TAR_URI_PREFIX is not set");
}

const sharedNetworkConfig: HttpNetworkUserConfig = {};

if (vargs.network != "hardhat") {
    if (!TAR_DEPLOYER_KEY) {
        throw Error("TAR_DEPLOYER_KEY is not set");
    }

    sharedNetworkConfig.accounts = [
        TAR_DEPLOYER_KEY
    ];
}

if (TAR_SAVE_DEPLOYMENT === "true") {
    sharedNetworkConfig.saveDeployments = true;
}

if (TAR_ETHERSCAN_API_KEY) {
    sharedNetworkConfig.verify = {
        etherscan: {
            apiKey: TAR_ETHERSCAN_API_KEY
        }
    }

    if (TAR_ETHERSCAN_URL) {
        sharedNetworkConfig.verify.etherscan!.apiUrl = TAR_ETHERSCAN_URL
    }
}

const config: HardhatUserConfig & TarConfig = {
    solidity: "0.8.25",
    namedAccounts: {
        deployer: 0,
        owner: TAR_OWNER ?? 0
    },
    networks: {
        hardhat: {
            live: false,
            saveDeployments: false,
            tags: ["test", "local"]
        },
        localhost: {
            live: false,
            tags: ["local"],
            ...sharedNetworkConfig,
        },
        sepolia: {
            url: "https://ethereum-sepolia-rpc.publicnode.com",
            chainId: 11155111,
            tags: ["test"],
            ...sharedNetworkConfig,
        },
        amoy: {
            url: "https://polygon-amoy-bor-rpc.publicnode.com",
            chainId: 80002,
            tags: ["test"],
            ...sharedNetworkConfig,
        }
    },
    etherscan: {
        apiKey: TAR_ETHERSCAN_API_KEY
    },
    tar: {
        prefix: TAR_URI_PREFIX,
        postfix: TAR_URI_POSTFIX ?? ""
    }
};

if (TAR_JSON_RPC_URL) {
    config.networks!.custom = {
        ...sharedNetworkConfig,
        url: TAR_JSON_RPC_URL
    }
}

export default config;
