// contracts/abis.js
export const LernaABI = [
  // Function: createTrack
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" }
    ],
    "name": "createTrack",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Function: createStage
  {
    "inputs": [
      { "internalType": "uint256", "name": "trackId", "type": "uint256" },
      { "internalType": "string", "name": "title", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "maxScore", "type": "uint256" }
    ],
    "name": "createStage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Function: registerAsStudent
  {
    "inputs": [],
    "name": "registerAsStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Function: registerAsMentor
  {
    "inputs": [],
    "name": "registerAsMentor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Function: submitAssignment
  {
    "inputs": [
      { "internalType": "uint256", "name": "trackId", "type": "uint256" },
      { "internalType": "uint256", "name": "stageId", "type": "uint256" },
      { "internalType": "string", "name": "ipfsHash", "type": "string" }
    ],
    "name": "submitAssignment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Function: evaluateSubmission
  {
    "inputs": [
      { "internalType": "uint256", "name": "trackId", "type": "uint256" },
      { "internalType": "uint256", "name": "stageId", "type": "uint256" },
      { "internalType": "uint256", "name": "score", "type": "uint256" }
    ],
    "name": "evaluateSubmission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Function: roles
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "roles",
    "outputs": [
      { "internalType": "enum Lerna.Role", "name": "", "type": "uint8" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Function: tracks
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "tracks",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "stageCount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Function: trackCount
  {
    "inputs": [],
    "name": "trackCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const CertificateNFTABI = [
  // Function: mint
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Standard ERC721 functions
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];