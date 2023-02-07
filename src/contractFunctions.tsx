import Web3 from 'web3';
import { ABI_BUSD, ABI_LOTTERY } from './ABIs';

const LOTTERY_ADDRESS = '0xb24E1631DAF0b96a855478D3861b5aE0bb84D459'
const BUSD_ADDRESS = '0x693F17A5c8b9a38cd020E214AEC778A4df72D98d'

// Returns the balance of BUSD in the connected account's wallet
export const getBUSDBalance = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the balanceOf function using the contract instance
  const balance = await contract.methods.balanceOf(account).call();

  // Return the balance
  return balance;
};

// Returns the balance of BUSD in the lottery address
export const getBUSDcontractBalance = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get contract
  const account = LOTTERY_ADDRESS;

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the balanceOf function using the contract instance
  const balance = await contract.methods.balanceOf(account).call();

  // Return the balance
  return balance;
};

// returns a bool to determine if approved

export const isApproved = async (spender) => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the allowance function using the contract instance
  const allowance = await contract.methods.allowance(account, LOTTERY_ADDRESS).call();
  
  console.log("spender ", spender)
  console.log("account ", account)
  console.log("allowance ", allowance)
  // Return true if the allowance is greater than 0, false otherwise
  return allowance > 0;
};

// gets the account that is connected to the dapp

export const getConnectedAccount = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  return account;
};

export const handleApproveClick = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);


  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the approve function using the contract instance
  const tx = await contract.methods.approve(LOTTERY_ADDRESS, web3.utils.toTwosComplement('-1')).send({
    from: account,
  });

  console.log(`Transaction hash: ${tx.transactionHash}`);
};

export const getCurrentRound = async () => {
    // Create a Web3 instance
    const web3 = new Web3(window.ethereum);

    // Create an instance of the contract using the ABI
    const contract = new web3.eth.Contract(ABI_LOTTERY, LOTTERY_ADDRESS);
  
    // Call the currentRound function using the contract instance
    const currentRound = await contract.methods.currentRound().call();

    // Return the currentRound
    return currentRound;

  };
 
 export const getCurrentRoundWinners = async (uint256) => {
    // Create a Web3 instance
    const web3 = new Web3(window.ethereum);
  
    // Create an instance of the contract using the ABI
    const contract = new web3.eth.Contract(ABI_LOTTERY, LOTTERY_ADDRESS);
  
    // Call the currentFirstplaceWinner function using the contract instance
    const currentRoundWinner = await contract.methods.getRoundWinners(uint256).call();
  
    // Return the currentFirstplaceWinner
    return currentRoundWinner.firstPrizeWinner;

  };

  export const getCurrentRunnerUps = async (uint256) => {
    // Create a Web3 instance

    const web3 = new Web3(window.ethereum);
  
    // Create an instance of the contract using the ABI
    const contract = new web3.eth.Contract(ABI_LOTTERY, LOTTERY_ADDRESS);
  
    // Call the currentRound function using the contract instance
    const currentRunnerUps = await contract.methods.getRoundWinners(uint256).call();
  
    // Return the currentRunnerUps
    return currentRunnerUps.runnerUpWinners.slice(0, 4);

  };

  export const buyTicketsWithBUSD = async (address, amount) => {
    // Create a Web3 instance
    const web3 = new Web3(window.ethereum);

    // Get the connected account
    const connectedAccount = await getConnectedAccount();

    // Create an instance of the contract using the ABI
    const contract = new web3.eth.Contract(ABI_LOTTERY, LOTTERY_ADDRESS);

    // Call the buyTicketsWithBUSD function using the contract instance
    const result = await contract.methods.buyTicketsWithBUSD(address, amount).send({ from: connectedAccount });

    // Return the result of the transaction
    return result;
};
