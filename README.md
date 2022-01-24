# Blockchain Developer Bootcamp Final Project GigaHierz

a. project description
NFT Game for Blockchain Bootcamps

The basic idea is that people get used to interacting with DApps in an easy and playfull way. It would be complementary to a bootcamp/codecamp.
The idea is based on a [project](https://github.com/DLT-developers-NFT-project) I started with my study group from DLT Talents.Over there you can find more ideas for a more elaborated app.

The user learns to use MetaMask and do little actions.

In this MVP the user will enter their name and a color is created for the image (in this case Octopus, code camps could use their specific logo).

If the user likes the color, they can MINT the image as an NFT.
This action will only be available once.

The user will then be redirected to the main Page where they can see their NFTs listed.

Next action for the user would/could be to get the address of someone from the course, who also already created their original Ocotpus. With this address they can create another NFT. A baby Octopus. (- this can only happen once with each person registerd).

Find the app [here](https://gigahierz.github.io/blockchain-developer-bootcamp-final-project/). The metadata is deployed to ipfs including the imgURL but the image is so far only available as pngURL... Anyways enjoy the idea.

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

Next to comile and migrate the contracts run :

```
truffle compile
```

and

```
truffle migrate
```

And then lastly deploy the contract to the rinkeby testnet:

```
truffle migrate --network rinkeby
```

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

- REACT_APP_PRIVATE_MM_KEY= Your private Metamask Key
- REACT_APP_IPFS= (You dont t need that yet...)
- REACT_APP_INFURA_PROJECT_ID= Infura Project Id

```
REACT_APP_PRIVATE_MM_KEY=xxxxxx
REACT_APP_IPFS=xxxxxx
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

or you use Ganach CLI. Then the port for the local testnet is `8545`.

Unfortunately so far the tests for the upgradable plugin are still failing. But there are other tests that go through :).

5. A screencast of you walking through your project - [loom](https://www.loom.com/share/4192db87b9404ca5a2a85992bc27bf3f?sharedAppSource=personal_library)

6. Ethereum Address

- 0x0AFBEA5597875c33047aB0004575f636e652C49e
