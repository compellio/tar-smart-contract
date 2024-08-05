# TAR Smart Contracts

This project is an early implementation of Solidity smart contracts representing Tokenized Asset Records (TARs) as defined in the [draft-avrilionis-satp-asset-schema-architecture](https://datatracker.ietf.org/doc/draft-avrilionis-satp-asset-schema-architecture) Internet Draft.

The [`ITAR`](./contracts/ITAR.sol) contract interface aims to define the standard interface a TAR-compatible contract needs to implement to interact with other components under the Asset Schema Architecture for Asset Exchange, namely, versioned persistence, tokenization and checksum-per-version, for validating a TAR's authenticity on-chain.

The [`TAR`](./contracts/TAR.sol) contract provides an early reference implementation of the `ITAR` interface.

## Usage

To install the repository and its dependencies, run:

```shell
git clone https://github.com/compellio/adhoc-tar-toolkit
nvm install && nvm use
npm ci
```

If you don't have NVM installed (see <https://github.com/nvm-sh/nvm>), make sure you are on Node v20.x to run the commands below.

Continue reading the [Environment Variables](#environment-variables) section to configure your installation as needed.

### Environment Variables

The various scripts and tasks included in this project read environment variables from the `.env` file. You can find an example environment configuration in the `.env.sample` file.

Command line environment variables take precedence over variables defined in the `.env` file.

The following variables affect the deployed TAR contract:

- `ADHOC_TAR_OWNER=<address|int>` the account address to assign as the TAR owner (required). If set to `0`, the deployer account will be assigned as the owner.
- `ADHOC_TAR_URI_PREFIX=<string>` the beginning of a URI used to generate TAR data URIs (required, e.g.: `https://example.org/asset`). The URL mustn’t contain trailing slashes.
- `ADHOC_TAR_URI_POSTFIX=<string|null>` a string to append to the TAR data URI (optional - defaults to an empty string, e.g.: `.json`).

The TAR contract will use `ADHOC_TAR_URI_PREFIX` and `ADHOC_TAR_URI_POSTFIX` to produce the following data URI for each version it stores:

```
{ADHOC_TAR_URI_PREFIX}/{TAR contract address}/{TAR version}{?ADHOC_TAR_URI_POSTFIX}
```

The data URI should point to a canonicalized version of the TAR payload that corresponds to the TAR checksum of the selected version. More details on canonicalizing TAR payloads can be found in the [JSON Canonicalization](#json-canonicalization) section.

The following variables are optional and only affect the contract deployment workflow.

- `ADHOC_TAR_DEPLOYER_KEY=<private key>` the private key used to deploy the TAR contract (required for live networks). This variable is ignored when using the Hardhat network.
- `ADHOC_TAR_JSON_RPC_URL=<string>` can be set to deploy the contract on a custom network (optional).
- `ADHOC_TAR_SAVE_DEPLOYMENT=<"true"|"false">` when set to true, the `hardhat-deploy` package will save the deployment details in the `deployments/` directory (optional - defaults to `false`).
- `ADHOC_TAR_ETHERSCAN_API_KEY=<string>` an Etherscan, or Etherscan-like explorer, API key to use when verifying deployed contracts (optional).
- `ADHOC_TAR_ETHERSCAN_URL=<string>` the URL to an Etherscan-like explorer (optional - defaults to the Ethereum mainnet Etherscan).

More details about these variables and their behaviour can be found in the [Deployment](#deployment) section.

### Smart Contracts

To compile the contracts, run:

```shell
npm run build
```

To start a local Ethereum network node for development, run:

```shell
npm run node
```

This command starts a Hardhat network node and automatically deploys a TAR contract (the address of which will be displayed in the command's output).

To start a local Ethereum network without deploying the TAR contract, run:

```shell
npm run node:blank
```

To clean the build cache and artifacts, run:

```shell
npm run clean
```

### JSON Canonicalization

This project provides a simple executable script for getting the canonical representation of arbitrary JSON strings, as defined in [RFC 8785](https://datatracker.ietf.org/doc/html/rfc8785).

To get the canonical representation of a JSON string, run either of the following commands:

```shell
npx json-canonicalize < filename.json
cat filename.json | npx json-canonicalize
```

The command reads a single JSON string from the standard input (stdin) and prints its canonical representation in the standard output (stdout).

Once in canonical form, you may generate its checksum using `shasum` or other similar hashing commands. For example, to canonicalize and generate a SHA256 hash of an arbitrary JSON file, you may run:

```shell
cat ./path/to/filename.json | npx json-canonicalize | shasum -a 256
```

The checksum can be used to create versions on a deployed TAR smart contract.

#### Caveats

The JSON canonicalization command does not support JSON strings containing control characters (e.g. new line, tabs, etc.).

### Deployment

This will deploy an instance of the TAR smart contract non-deterministically.

Preparation:

- Set the `ADHOC_TAR_DEPLOYER_KEY` variable in `.env`
- Set the `ADHOC_TAR_URI_PREFIX`, `ADHOC_TAR_URI_POSTFIX` and `ADHOC_TAR_OWNER` parameters as appropriate for your setup.

We recommend that you test your deployment configuration on the Hardhat or another local network before moving on to a live network.

Make sure the account set in `ADHOC_TAR_DEPLOYER_KEY` is sufficiently funded to pay for the deployment transaction's gas fees.

To deploy an instance of a TAR contract, run:

```shell
npm run deploy <network>
```

using any of the following networks: `hardhat`, `localhost`, or any network listed in the [pre-configured public networks](#pre-configured-public-networks) table.

If `ADHOC_TAR_SAVE_DEPLOYMENT` is set to true during the deployment, the deployment workflow will save the deployment artefacts in the `deployments/` directory. If you plan to verify your deployed contract, set this environment variable to true.

To override existing deployment artefacts to deploy a fresh TAR contract, run:

```shell
npm run deploy:fresh <network>
```

#### Pre-configured Public Networks

| Id          | Network   | Type           | JSON-RPC                                    |
|:------------|:----------|:---------------|:--------------------------------------------|
| `sepolia`   | Sepolia   | Public Testnet | https://ethereum-sepolia-rpc.publicnode.com |
| `amoy`      | Amoy      | Public Testnet | https://polygon-amoy-bor-rpc.publicnode.com |

You may also connect to ant EVM-compatible network by setting the `ADHOC_TAR_JSON_RPC_URL` environment variable and using the `custom` network id during deployment.

### Contract Verification

Deployed contracts are not automatically verified during deployment.

To verify a contract with Sourcify, run:

```shell
npm run verify:sourcify <network>
```

To verify a contract with Etherscan, or Etherscan-like explorer, set the `ADHOC_TAR_ETHERSCAN_API_KEY` and `ADHOC_TAR_ETHERSCAN_URL` environment variables as appropriate, and run:

```shell
npm run verify:etherscan <network>
```

## About

<img src="./assets/images/ngi-search.png" height="40" alt="NGI Search">

Funded by the European Union. Views and opinions expressed are those of the author(s) only and don’t necessarily reflect those of the European Union or European Commission. Neither the European Union nor the granting authority can be held responsible for them. Funded within the framework of the [NGI Search project](https://www.ngisearch.eu/) under grant agreement No 101069364.

Documentation for NGI Search Milestone 3 is available [here](./docs/ngi-search/milestone-3.md).
