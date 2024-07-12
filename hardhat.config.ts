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
        }
    },
    tar: {
        prefix: ADHOC_TAR_PREFIX ?? "https://example.org/assets/",
        postfix: ADHOC_TAR_POSTFIX ?? ".json"
    }
};

export default config;
