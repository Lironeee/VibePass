VibePass 🎟️

VibePass is a decentralized ticketing platform built on the Algorand blockchain to provide secure and transparent digital ticket sales. Designed for event organizers and attendees, VibePass ensures ticket authenticity, prevents counterfeiting, and empowers users to manage ticket sales with full ownership and control.

Technical Overview

Key Technologies

    •	Algorand Blockchain: Core technology for decentralized ticket storage, verification, and transactions.
    •	Smart Contracts (In Progress): Algorand smart contracts are being developed with algokit to facilitate transparent, secure ticket transactions.
    •	Front-End Interface: Built with Next.js, providing a user-friendly experience for browsing events, buying tickets, and managing ticket ownership.

Architecture

    1.	Smart Contracts: Still under development to support ticket creation, transfer, and ownership verification.
    2.	Front-End: Currently available as a standalone interface, allowing users to explore events and interact with ticket listings.

    Note: The back-end server is not implemented yet, and all Algorand-related interactions are planned to be handled directly through smart contracts.

Installation and Setup

Prerequisites

    •	Node.js and npm: Required for running the front-end.
    •	Algorand TestNet Account: Essential for testing on the Algorand blockchain.
    •	Algorand SDK: For developing smart contracts (optional, for local development).

Instructions

Step 1: Clone the Repository

git clone https://github.com/your-username/VibePass.git
cd VibePass

Step 2: Install Front-End Dependencies

cd vibepass
npm install

Step 3: Set Up Algorand TestNet Account

    1.	Create an Algorand TestNet account if you don’t have one, and fund it using the Algorand TestNet Faucet.

Step 4: Run the Front-End

npm run dev

Access the platform locally at http://localhost:3000.

    Note: Some front-end features relying on blockchain integration might not function completely due to the incomplete smart contracts.

Algorand-Specific Instructions (for Developers)

    •	Smart Contract Deployment: Initial versions of the smart contracts are located in the contracts directory. You can use the Algorand CLI or SDK to test and debug these.
    •	Planned Ticket Operations: Once completed, smart contracts will support creating, verifying, and transferring tickets as unique assets on the Algorand blockchain.

Key Achievements

1. Algorand Smart Contract Development (In Progress)

   • Ticket Logic: Preliminary work on smart contract logic for ticket creation and verification. Current focus is on implementing secure asset creation and basic transfer functions.

2. Web User Interface

   • Event Discovery: Interface allows users to browse events and view ticket availability.
   • Planned Integration with Smart Contracts: UI design accommodates blockchain interaction to allow seamless ticket purchase and transfer when smart contracts are completed.
