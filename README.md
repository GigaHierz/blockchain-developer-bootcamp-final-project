# blockchain-developer-bootcamp-final-project

a. project description
NFT Game for Blockchain Bootcamps

The basic idea is that people get used to interacting with DApps in an easy and playfull way. It would be complementary to a bootcamp/codecamp.
The idea is based on a [project](https://github.com/DLT-developers-NFT-project) I started with my study group from DLT Talents.Over there you can find more ideas for a more elaborated app.

The user learns to use MetaMask and do little actions.

In this MVP the user will enter their name and a color is created for the image (in this case Octopus, code camps could use their specific logo).

If the user likes the color, they can MINT the image as an NFT.
This action will only be available once.

The user will then be redirected to the main Page where they can see their NFTs listed.

Next action for the would/could be to get the address of someone from the course, who also already created their original Ocotpus. With this address they can create another NFT. A baby Octopus. (- this can only happen once with each person registerd).

Find the app [here](https://octopus-nft-game.herokuapp.com/). Unfortunatly it is not yet possible to mint as someone else then the owner. The metadata is deployed to ipfs but the image is so far only available as pngURL... Anyways enjoy the idea.

1. Installing dependencies

To get started, clone the repository on your local machine:

```
git clone https://github.com/GigaHierz/blockchain-developer-bootcamp-final-project.git

```

then navigate into the repository

```
cd blockchain-developer-bootcamp-final-project
```

get all packages installed

```
yarn install
```

2. setting up environement variables

Somehow I had problems with "dotenv". So I created seperate files for each key. Feel free to use dotenv if it works for you.

Otherwise:

- create a file called `.infura`

And add the public key of your infura project into this file:

- create a file called `.mnemonic`

And add the mnemonic / secret passphrase of the MetaMask Wallet that you want to deploy the contract from.

add these files into your .gitignore file. (They should already be icluded.)

3. Sarting FE and setting up env variables there

navigate to the client folder

```
cd client
```

run

```
yarn install
```

setup `.env` file with the following variables.

```
REACT_APP_PRIVATE_KEY=xxxxxx
REACT_APP_IPFS=xxxxxx
REACT_APP_SECRET=xxxxxx
REACT_APP_INFURA_PROJECT_ID=xxxxxx

```

run the command

```
npm run start
```

the Frontend should be running on [http://localhost:3000/](http://localhost:3000/).

4. Running your smart contract unit tests

make sure you are in the root directory of the project.

run the command

```
truffle development
```

inside of the truffle CLI

```
test
```

Unfortunately so far the tests for the upgradable plugin are still failing. But there are more tests.

5. A screencast of you walking through your project - loom

To get a developer certification for the course, your project must:

- Contain smart contract(s) which: - Are commented to the specs described here

- Use at least two design patterns from the "Smart Contracts" section (see a list here)
- Protect against two attack vectors from the "Smart Contracts" section with its SWC number (see a list here)
- Inherits from at least one library or interface
- Can be easily compiled, migrated and tested (see #5)

- Have at least five unit tests for your smart contract(s) that pass. In the code, include a sentence or two explaining what the tests are covering their expected behavior. You are not required to build unit tests for your frontend, just your smart contracts.

- Contain a deployed_address.txt file which contains the testnet address and network where your contract(s) have been deployed

- Have a frontend interface built with a framework like React or plain HTML/CSS/JS that:
  Detects the presence of MetaMask
  Connects to the current account
  Displays information from your smart contract
  Allows a user to submit a transaction to update smart contract state
  Updates the frontend if the transaction is successful or not

- Hosted on Github Pages, Heroku, Netlify, Fleek, Surge or some other free frontend service that gives users a public interface to your decentralized application. That address should be in your README.md document.
