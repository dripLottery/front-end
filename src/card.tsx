import React from 'react';
import './index.css';
import { handleApproveClick, isApproved, getConnectedAccount, getBUSDBalance, getBUSDcontractBalance, buyTicketsWithBUSD } from './contractFunctions.tsx';
import Web3 from 'web3';
import { useEffect, useState, useRef } from 'react';

export default function CardWithInputAndButtons() {
    const [approved, setApproved] = useState(false);
    const [balance, setBalance] = useState('');
    const [contractBalance, setContractBalance] = useState('');
    const [amount, setAmount] = useState('');
    const searchParams = new URLSearchParams(window.location.search);
    const referral = searchParams.get('referral');

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const wei = Web3.utils.toWei(value);
        setAmount(wei);  // update the value here
    };

    const handleBuyTicketClick = async (amount: string) => {
      const address = await getConnectedAccount();
      const referralAddress = referral ? referral : "0x0000000000000000000000000000000000000000";
      const result = await buyTicketsWithBUSD(referralAddress, amount);
      console.log(result);
      };


    const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        // Use a setInterval function to call setApproved every 1 second
        const interval = setInterval(() => {
          async function fetchData() {
            const account = await getConnectedAccount();
            const approval = await isApproved(account);
            setApproved(approval);
             // Get the balance of BUSD in the connected account's wallet
              const balance = await getBUSDBalance();
              const BUSDbalance = Web3.utils.fromWei(balance);
              setBalance(parseFloat(BUSDbalance).toLocaleString('en-US', { minimumFractionDigits: 0 }));
              
              // Get the balance of BUSD in the connected account's wallet
              const contractBalance = await getBUSDcontractBalance();
   
              const BUSDcontractBalance = Web3.utils.fromWei(contractBalance);
              setContractBalance(parseFloat(BUSDcontractBalance).toLocaleString('en-US', { minimumFractionDigits: 0 }));

          }
          fetchData();
        }, 1000);  // 1000 milliseconds = 1 second
      
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, []);  // Only run the effect once


    useEffect(() => {
        async function fetchData() {
            const account = await getConnectedAccount();
            const approval = await isApproved(account);
  
            setApproved(approval);
              // Get the balance of BUSD in the connected account's wallet
              const balance = await getBUSDBalance();
              const BUSDbalance = Web3.utils.fromWei(balance);
              setBalance(parseFloat(BUSDbalance).toLocaleString('en-US', { minimumFractionDigits: 0 }));
              
              // Get the balance of BUSD in the connected account's wallet
              const contractBalance = await getBUSDcontractBalance();
   
              const BUSDcontractBalance = Web3.utils.fromWei(contractBalance);
              setContractBalance(parseFloat(BUSDcontractBalance).toLocaleString('en-US', { minimumFractionDigits: 0 }));

          }
      fetchData();
    }, []);
    
    console.log(setApproved)
  return (
    <div className="card - blue-bg">
      
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '35%',
            margin: 'auto',
          }}
        >
          <input
            type="number"
            min="0"
            max="1000"
            step="10"
            className="form-control"
            placeholder="Amount"
            onChange={handleAmountChange} // added
            ref={inputRef}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 'auto',
            }}
          >
            {approved ? (
            <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
            onClick={() => handleBuyTicketClick(amount)}
            >
            Buy Tickets
            </button>
            ) : (
            <button
            type="button"
            className="btn btn-primary mr-3"
            style={{ marginTop: '10px', width: '100%', marginBottom: '10px' }}
            onClick={handleApproveClick}
            >
            Approve
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}