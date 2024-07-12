# Ad-Hoc TAR Toolkit

This project provides various tools (smart contracts and scripts) for manually creating, deploying and hosting Token Asset Records for various types of content and is intended to be used for demonstration purposes only.

Given the nature of this project, the usual quality and safety rules are not being applied (no tests, etc.). The contracts are not upgradeable, and the configuration may fail over time.

## Usage

To install the repository and its dependencies, run:

```shell
git clone https://github.com/compellio/adhoc-tar-toolkit
nvm install && nvm use
npm ci
```
If you don't have NVM installed (see https://github.com/nvm-sh/nvm), make sure you are on Node v20.x to run the commands below.

Continue reading the [Environment Variables](#environment-variables) section to configure your installation as needed.

### Environment Variables

The various scripts and tasks included in this project read environment variables from the `.env` file. You can find an example environment configuration in the `.env.sample` file.

Command line environment variables take precedence over variables defined in the `.env` file.

The following variables affect the deployed TAR contract:

- `ADHOC_TAR_OWNER=<eaddress|int>` the account address to assign as the TAR owner (required). If set to `0`, the deployer account will be assigned
- `ADHOC_TAR_DEPLOYER_KEY=<private key>` the private key used to deploy the TAR contract (required for live networks). This variable will be ignored when using the Hardhat network.
- `ADHOC_TAR_URL_PREFIX=<string>` the beginning of a URI used to generate TAR data URIs (required, e.g.: `https://example.org/asset`). The URL must not contain trailing slashes.
- `ADHOC_TAR_URL_POSTFIX=<string|null>` a string to append to the TAR data URI (optional - defaults to an empty string, e.g.: `.json`).

More details about `ADHOC_TAR_URL_PREFIX` and `ADHOC_TAR_URL_POSTFIX` can be found in the [Deployment](#deployment) section.

The following variables are optional and only affect the contract deployment.

- `ADHOC_TAR_JSON_RPC_URL=<string>` overrides the preset JSON-RPC endpoint of the target network during deployment (optional). The JSON-RPC endpoint must match the selected deployment network. The variable defaults to a preset endpoint for the selected deployment network.
- `ADHOC_TAR_SAVE_DEPLOYMENT=<"true"|"false">` when set to true, the `hardhat-deploy` package will save the deployment details in the `deployments/` directory (optional - defaults to `false`).

> [!NOTE]
> At this time, it is recommended that you set `ADHOC_TAR_SAVE_DEPLOYMENT` to the default `false`.

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

To retrieve the canonical representation of a JSON string (as defined in [https://www.rfc-editor.org/rfc/rfc8785.html](RFC8785)), run either of the following (the script accepts JSON strings in stdin):

```shell
npx canonicalize < filename.json
cat filename.json | npx canonicalize
```

Once canonicalized, you can generate a hash using `shasum` or other similar hashing commands. For example, to generate a SHA256 hash for a canonicalized JSON file, you can run:

```shell
cat filename.json | npx canonicalize | shasum -a 256
```

The output can be used to create versions with the deployed smart contract.

#### Caveats

The JSON canonicalization command does not support JSON strings containing control characters in their values (e.g. new line, tabs, etc.).
