import "./App.min.css";
import { useState, useEffect } from "react";
import logo from "./assets/images/logo.png";
import top_btn from "./assets/images/top.png";
import drip_draw from "./assets/images/Banner_Drip_Drop_Draw_Desktop.png";
import mobdrip_draw from "./assets/images/Banner_Drip_Drop_Draw_Mobile.png";
import { FaCoins, FaUserAstronaut, FaUsers, FaHandshake } from "react-icons/fa";
import { GiMineWagon } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import referral_img from "./assets/images/referral_img.png";
import { getCurrentRound,getCurrentRoundWinners } from './contractFunctions.tsx';
import Web3 from 'web3';
import Card from './card.tsx';

function App() {

  async function getUserAddress() {
    // Create a Web3 instance
    const web3 = new Web3(window.ethereum);
  
    // Get the user's Ethereum addresses using the `eth.getAccounts` method
    const accounts = await web3.eth.getAccounts();
  
    // Return the first Ethereum address from the accounts array
    return accounts[0];
  }

  const [currentRound, setCurrentRound] = useState(0);
  const [currentRoundWinners, setCurrentRoundWinner] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const searchParams = new URLSearchParams(window.location.search);
  // const referral = searchParams.get('referral');

  useEffect(() => {
    AOS.init();
    async function fetchData() {
      const round  = await getCurrentRound();
      setCurrentRound(round);
      const winners = await getCurrentRoundWinners(round);
      setCurrentRoundWinner(winners);
      const userAddress = await getUserAddress();
      setUserAddress(userAddress);
      const currentUrl = window.location.protocol + '//' + window.location.host;
      setCurrentUrl(currentUrl);
    }
    getUserAddress();
    fetchData();
  }, []);


  return (
    <>
      <div id="connect_button">
        <ConnectButton />
      </div>
      <main>
      
        <header className="py-5">
          <div className="container">
            <div className="row"></div>
          </div>
          <button id="myBtn" title="Go to top">
            <a href="#next_section">
              <img src={top_btn} width="75px" alt="top_btn" />
            </a>
          </button>
         
        </header>
        <Card />
        <section
          id="next_section"
          className="text-white"
          style={{ padding: "180px 0" }}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="container">
            <div className="row">
              <div className="col-sm mb-3 mb-md-0">
                <div className="card animate_bg">
                  <div className="card-body text-center">
                  <h5 className="card-title">Current round {currentRound}</h5>
                    <h5 className="card-title">Current Lottery Jackpot</h5>
                    <h3 className="card-text display-4">96,857 DRIP</h3>
                  </div>
                </div>
                <div className="my-5 d-flex justify-content-center flex-column align-items-center">
               
                  <h5 className="card-title">
                    Remaining Time For Current Jackpot
                  </h5>
                  <h3 className="card-text display-4" id="demo">
                    01:45:36
                  </h3>
                </div>
                <img
                  src={logo}
                  className="d-flex mx-auto"
                  width="400px"
                  alt="Section_img"
                  id="Section_img"
                />
              </div>
              <div className="col-sm d-flex flex-column">
                <div className="card">
                  <div className="card-body">
                    <h2 className="display-5">
                      Welcome to the Drip Drop Draw!
                    </h2>
                    <p className="lead fw-bold">
                      The first R34P DAO community funded project created to
                      help Drip become hyper-deflationary by locking away more
                      Drip into the Tax Vault than it pays out. Here's how it
                      works :
                      <br />
                      - 1 Drip = 1 Entry ticket (only send whole numbers of
                      Drip)
                      <br />
                      - 90% of proceeds go straight to the Drip Tax Vault
                      <br />
                      - 10% of the proceeds are paid as lottery winnings as
                      follows; 1st Prize 5% of proceeds and 5 Runners Up of 1%
                      of proceeds. <br />
                      - Winners are drawn daily.
                      <br />
                      - Lottery Winnings are airdropped to the wallet that
                      entered.
                      <br />
                      <br />
                      <b>NOTE :</b> There are currently over 130,000 Drip
                      Players. If everyone entered with just 1 Drip daily,
                      that's 117,000 Drip going back into the Tax Vault daily,
                      AND you have a chance to win 5% (6,500 Drip) or 1% (1,300
                      Drip) of the proceeds.*
                      <br />* Figures above are based on the assumption of 1
                      Drip per player, actual lottery results may vary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <article data-aos="fade-up" data-aos-duration="3000">
          <img
            src={drip_draw}
            width="100%"
            className="d-none d-md-block"
            alt="user stats"
            id="drip_desktop_draw"
          />
          <div id="desktop_details" className="d-none d-md-block fw-bold">
            <div className="row">
              <div className="col-sm">
              <p >Todays Winner: <span style={{ fontSize: '20px' }} >{currentRoundWinners}</span></p>
             
              
                <p>Biggest Deposit: 1000</p>
                <p>Biggest Sacrifice: 1000</p>
              </div>
              <div className="col-sm">
                <p>Runners Up: 10</p>
                <p>Balance in Pot: 1000</p>
                <p>Referal Tickets: 1000</p>
                <p>
                  Yesterday Prize <br /> Winner: abc
                </p>
              </div>
            </div>
          </div>
          <img
            src={mobdrip_draw}
            width="100%"
            className="d-block d-md-none"
            alt="mobile user stats"
            id="drip_mobile_draw"
          />
          <div id="mobile_details" className="d-block d-md-none fw-bold">
            <div className="row d-flex">
              <div className="col">
                <p>Today Winners: {currentRoundWinners}</p>
                <p>Biggest Deposit: 1000</p>
                <p>Biggest Sacrifice: 1000</p>
              </div>
              <div className="col">
                <p>Runners Up: 10</p>
                <p>Balance in Pot: 1000</p>
                <p>Referal Tickets: 1000</p>
                <p>
                  Yesterday Prize <br /> Winner: abc
                </p>
              </div>
            </div>
          </div>
        </article>
        <hr />

        <article
          className="py-5"
          data-aos="fade-up"
          data-aos-duration="1000"
          id="user_stats"
        >
          <div className="container">
            <h2 className="display-5 text-center text-white">
              Drip User Stats
            </h2>

            <div className="row my-5">
              <div className="col-sm text-white text-center">
                <FaCoins size={60} />
                <h4>Available</h4>
                <p>456.43</p>
                <span>DRIP ~ ...USDT</span>
              </div>
              <div className="col-sm text-white text-center">
                <FaUserAstronaut size={60} />
                <h4>Deposits</h4>
                <p>456.43</p>
                <span>DRIP ~ ...USDT</span>
              </div>
              <div className="col-sm text-white text-center">
                <GiMineWagon size={60} />
                <h4>Claimed</h4>
                <p>456.43</p>
                <span>DRIP</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm text-white text-center">
                <FaHandshake size={60} />
                <h4>Referral Rewards</h4>
                <p>456.43</p>
                <span>DRIP</span>
              </div>
              <div className="col-sm text-white text-center">
                <FaCoins size={60} />
                <h4>Max Payout</h4>
                <p>456.43</p>
                <span>DRIP</span>
              </div>
              <div className="col-sm text-white text-center">
                <FaUsers size={60} />
                <h4>Team</h4>
                <p>456.43</p>
                <span>Players (Direct/Total)</span>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <a href="/" className="btn btn-warning" alt="buy tickets">
                Buy Tickets
              </a>
            </div>
          </div>
        </article>
        <hr />
        <section
          className="text-white"
          style={{ padding: "180px 0" }}
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-md-6 mt-0 mt-md-5">
                <div className="card position-relative" id="referral">
                  <div className="card-body">
                    <h5 className="card-title">Referral Rewards</h5>
                    <div className="mb-3">
                    <p ><a style={{ fontSize: '15px' }} >{currentUrl}?referral={userAddress}</a></p>
                    </div>
                    <p className="lead">Refer now to achieve extra bonus!</p>
                  </div>
                </div>
                <img
                  src={referral_img}
                  className="d-none d-md-block"
                  id="referral_img"
                  alt="referral_img"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-5 text-white bg-info bg-opacity-50 py-4">
        <div className="container">
          <div className="row">
            <div className="col-sm  mb-3 mb-md-0">
              <h6>Financial Disclaimer</h6>
              <p>
                You agree that the use of the Drip Drop Draw is at your own
                risk. Investing in cryptocurrencies are inherently risky
                activities, and as such, it is vital that you conduct your own
                due diligence before buying or selling any cryptocurrency. (Drip
                Drop Draw also has no affiliation with "FOREX SHARK" or "FOREX
                SHARK CALLS") "this is a 100% community driven project" with the
                intent to help support the current "DRIP" or "DRIP NETWORK"
                project.
              </p>
              <p>Copyright Drip Drop Draw 2023.</p>
            </div>
            <div className="col-sm">
              <h5>DRIP NETWORK</h5>
              <div className="row">
                <div className="col-sm">
                  <a href="https://nomics.com/assets/drip3-drip">DRIP</a>
                </div>
                <div className="col-sm">
                  <a href="https://nomics.com/assets/br34p-br34p">BR34P</a>
                </div>
                <div className="col-sm">
                  <a href="https://nomics.com/assets/afp-animal-farm-pigs">
                    PIGS
                  </a>
                </div>
                <div className="col-sm">
                  <a href="https://nomics.com/assets/afd2-animal-farm-dogs">
                    DOGS
                  </a>
                </div>
              </div>
              <h5 className="mt-2">Socials</h5>
              <div>
                <a href="https://t.me/DripLottery">
                  <i
                    className="bi bi-telegram me-3"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </a>
                <a href="https://twitter.com/driplottery">
                  <i className="bi bi-twitter" style={{ fontSize: "2rem" }}></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
