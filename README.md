# Lucky-Chain-DApp

Welcome to Lucky-Chain-DApp! This project is a decentralized application (DApp) that implements a lottery system using smart contracts and blockchain technology for secure and transparent operations. Below you will find all the information you need to install, set up, and use the project. 

Smart contracts source: [Lucky Chain Smart contracts repository](https://github.com/adangnzlz/lucky-chain)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)

## Features

**Decentralized Lottery**: Each lottery is managed by smart contracts to guarantee transparency and reliability of the results.
**User-Friendly Interface**: Built with React and Tailwind CSS to provide a modern, responsive user experience.
**Blockchain Integration**: Connects to networks such as Harhat localhost or Sepolia .
**Deployment Scripts**: Includes scripts for compiling, deploying, and verifying smart contracts quickly.

## Technologies Used
**Solidity** – Programming language for writing smart contracts.
**Hardhat** – Framework for compiling, testing, and deploying smart contracts.
**Node.js / NPM** – JavaScript runtime environment and package managers.
**React** – Library for building user interfaces.
**Tailwind CSS** – Utility-first CSS framework for styling.
**Wagmi** – A React library that simplifies wallet interactions (connection, transaction signing, balance fetching, etc.) for Ethereum-based DApps.

## Installation

**Clone this repository:**

```bash
git clone https://github.com/adangnzlz/Lucky-Chain-DApp.git
cd Lucky-Chain-DApp
```

**Install dependencies in the root folder:**

```bash
npm install
```

## Setup

1. **Configure environment variables:**

   Create a `.env` file in the project root and add the following variables:

  ```bash
  VITE_APPKIT_PROJECT_ID=
  VITE_LOTTERY_ETHER_ADDRESS=
  VITE_LINK_TOKEN_ADDRESS=
  VITE_LOTTERY_LINK_ADDRESS=
  ```

To obtain VITE_APPKIT_PROJECT_ID visit https://reown.com/appkit and create your project
To deploy the contracts and obtain the adresses please visit: [Lucky Chain Smart contracts repository](https://github.com/adangnzlz/lucky-chain)


## Usage

  ```bash
  npm run dev
  ```

      "@reown/appkit": "^1.5.3",
    "@reown/appkit-adapter-wagmi": "^1.5.3",

## Frequent errors

   Ensure you have ETH (in the owner address) and LINK (in the subscription created in chainlink console https://vrf.chain.link/ ) to cover contract deployment and randomness request costs.

  If you are testing in a real network like sepolia or ethereum ensure you add the address contract as consummer in the chain link subscription. More info [here](https://github.com/adangnzlz/lucky-chain)