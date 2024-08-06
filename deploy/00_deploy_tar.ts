/*
 * Tokenized Asset Record (TAR) Smart Contracts
 * Copyright (C) 2024  Compellio S.A.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
