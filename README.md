# Ad-Hoc TAR Toolkit

This project provides various tools (smart contracts and scripts) for manually creating, deploying and hosting Token Asset Records for various types of content and is intended to be used for demonstration purposes only.

Given the nature of this project, the usual quality and safety rules are not being applied (no tests, etc.). The contracts are not upgradeable, and the configuration may fail over time.

## Usage

To install the repository and its dependencies, run:

```sh
git clone https://github.com/compellio/adhoc-tar-toolkit
nvm install && nvm use
npm ci
```

If you don't have NVM, make sure you are using v20.x to run the commands below.

To compile the contracts, run:

```sh
npm run build
```

To clean the build cache and artifacts, run:

```sh
npm run clean
```

To retrieve the canonical representation of a JSON string (as defined in [https://www.rfc-editor.org/rfc/rfc8785.html](RFC8785)), run either of the following (the script accepts JSON strings in stdin):

```sh
npx canonicalize < filename.json
cat filename.json | npx canonicalize
```

Once canonicalized, you can generate a hash using `shasum` or other similar hashing commands. For example, to generate a SHA256 hash for a canonicalized JSON file, you can run:

```sh
cat filename.json | npx canonicalize | shasum -a 256
```

The output can be used to create versions with the deployed smart contract.

### Deployment

By default, the project uses the Thirdweb CLI to deploy the contract.

To compile and deploy the contracts, run:

```sh
npm run deploy
```

The contract takes in the following constructor parameters:

- `initialOwner`: the address of the TAR owner. This gives an account permission to call the `push` method to create new versions.
- `uriPrefix`: the base URI to be used when constructing a TAR's versions data URIs. The URI must not contain a trailing slash.
- `uriPostfix`: a string to append at the end of a TAR's version data URIs (e.g. `.json`). Can be set to an empty string.

The contract will create the following data URIs: `{uriPrefix}/{contractAddress}/{versionId}{?uriPostfix}`.
