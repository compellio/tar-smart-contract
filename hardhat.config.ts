import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import dotenv from "dotenv";

dotenv.config();

const { ADHOC_TAR_DEPLOYER_KEY, ADHOC_TAR_OWNER, ADHOC_TAR_PREFIX, ADHOC_TAR_POSTFIX} = process.env;

const config: HardhatUserConfig & AdHocTarConfig = {
    solidity: "0.8.25",
    namedAccounts: {
        deployer: 0,
        owner: ADHOC_TAR_OWNER ?? 0
    },
    networks: {
        localhost: {
            live: false,
            saveDeployments: false,
            tags: ["local"]
        },
        hardhat: {
            live: false,
            saveDeployments: false,
            tags: ["test", "local"]
        },
        "nethereum-testchain": {
            live: false,
            saveDeployments: false,
            url: "http://testchain.nethereum.com:8545/",
            accounts: [
                // Ignoring ADHOC_TAR_DEPLOYER_KEY setting and using common key
                // See https://docs.nethereum.com/en/latest/nethereum-gettingstarted-smartcontracts-untyped/#instantiating-web3-and-the-account
                "0x7580e7fb49df1c861f0050fae31c2224c6aba908e116b8da44ee8cd927b990b0",
            ],
            tags: ["test"]
        }
    },
    tar: {
        prefix: ADHOC_TAR_PREFIX ?? "https://example.org/assets/",
        postfix: ADHOC_TAR_POSTFIX ?? ".json"
    }
};

export default config;
