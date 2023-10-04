import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import ABI from "../ABI.json";
import Button from "./Button";
const Wallet = () => {
  const navigateTo = useNavigate();
  const { currentColor } = useStateContext();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        //console.log(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0x8b4b5e18C6323c4Fc404f2C4036482F4d0147747";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        // saveState({ web3: web3, contract: contract, account: accounts[0] });
        console.log(web3);
        console.log(contract);
        console.log(accounts[0]);
        // navigateTo("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white rounded-lg p-8">
        <div className="text-xl font-semibold">
          <span>WELCOME TO TENDER TRUST</span>
        </div>
        <div className="mt-4 text-center">
          <p> Please connect MetaMask wallet to access the app </p>
          <div className="mt-3">
            <button
              onClick={connectWallet}
              style={{ backgroundColor: currentColor }}
              className={` text-white font-bold py-2 px-4 rounded-full`}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
