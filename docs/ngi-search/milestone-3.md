# NGI Search Milestone 3

## About
NGI Search is about making search queries on data and information that have been authenticated by their corresponding publisher. For this authentication/signing process, the blockchain and smart contract technologies are being used.

## Blockchain
Blockchain is increasingly gaining importance not only as a siloed technology for implementing on-chain dApps but also as an infrastructure element in the global internet-based computing landscape. In particular, the ability to uniquely identify assets allows easier implementation of traceability and auditability in any tokenisation process, thus increasing trust and transparency regarding products and processes involving these - physical or digital - assets.

## Tokenized information
Using the blockchain technology, information is being tokenized (as a means of proving its authenticity) and hashed (in order to prevent it from being tampered with). These pieces of information (also called assets) can be retrieved and updated on demand, retaining all the change history which can later be retrieved using a corresponding version number.
This tokenized information (or Tokenized Asset Record - TAR) comprises the building blocks of information that NGI Search can search on, using a typed manner.

## Smart contracts
Smart contracts are digital contracts stored on a blockchain that are automatically executed when predetermined terms and conditions are met. Smart contracts are typically used to automate the execution of an agreement so that all participants can be immediately certain of the outcome, without any intermediary’s involvement or time loss. They can also automate a workflow, triggering the next action when predetermined conditions are met.

### `Context` abstract smart contract
The `Context` abstract smart contract provides information about the current execution context, including the sender of the transaction and its data. While these are generally available via `msg.sender` and `msg.data`, they should not be accessed in such a direct  manner, since when dealing with meta-transactions the account sending and paying for execution may not be the actual sender (as far as an application is concerned).

### `Ownable` abstract smart contract
The `Ownable` abstract smart contract inherits the `Context` abstract smart contract and provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. The initial owner is set to the address provided by the deployer which can later be changed using its method `transferOwnership`.
The Ownable abstract smart contract is used through inheritance, making available the modifier `onlyOwner`, which can be applied to any inheriting methods for restricting their use to the owner.

### `ITAR` smart contract interface
The `ITAR` smart contract is an interface contract that provides the appropriate methods that a TAR-compatible contract needs to implement, in order to perform the functionalities of a TAR, namely its versioned persistence, tokenization and checksum-per-version, for validating its authenticity.

### `TAR` smart contract
The `TAR` smart contract inherits the `Ownable` abstract contract and implements the `ITAR` interface and is responsible for creating the appropriate entries on the blockchain for the persistence of TARs. Moreover, it provides all functionality pertaining to acquiring its checksum, versioning and URI that points to the actual asset record of the version requested.