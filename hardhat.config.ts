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
    ADHOC_TAR_DEPLOYER_KEY,
    ADHOC_TAR_OWNER,
    ADHOC_TAR_PREFIX,
    ADHOC_TAR_POSTFIX,
    ADHOC_TAR_JSON_RPC_URL,
    ADHOC_TAR_SAVE_DEPLOYMENT
} = process.env;

if (!ADHOC_TAR_PREFIX) {
    throw Error("ADHOC_TAR_PREFIX is not set");
}

const sharedNetworkConfig: HttpNetworkUserConfig = {};

if (vargs.network != "hardhat") {
    if (!ADHOC_TAR_DEPLOYER_KEY) {
        throw Error("ADHOC_TAR_DEPLOYER_KEY is not set");
    }

    sharedNetworkConfig.accounts = [
        ADHOC_TAR_DEPLOYER_KEY
    ];
}

if (ADHOC_TAR_SAVE_DEPLOYMENT === "true") {
    sharedNetworkConfig.saveDeployments = true;
}

if (ADHOC_TAR_JSON_RPC_URL) {
    sharedNetworkConfig.url = ADHOC_TAR_JSON_RPC_URL;
}

const config: HardhatUserConfig & AdHocTarConfig = {
    solidity: "0.8.25",
    namedAccounts: {
        deployer: 0,
        owner: ADHOC_TAR_OWNER ?? 0
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
    tar: {
        prefix: ADHOC_TAR_PREFIX,
        postfix: ADHOC_TAR_POSTFIX ?? ""
    }
};

export default config;
