import {DeployFunction} from "hardhat-deploy/types";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import config from "../hardhat.config";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

    const {deployments, getNamedAccounts} = hre;
    const {deployer, owner} = await getNamedAccounts();
    const {deploy} = deployments;

    await deploy("TAR", {
        from: deployer,
        args: [owner, config.tar.prefix, config.tar.postfix],
        skipIfAlreadyDeployed: false,
        log: true
    });

}

deploy.tags = ["tar", "main"];
export default deploy;
