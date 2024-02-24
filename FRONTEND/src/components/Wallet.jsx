import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import metamask from "../data/metamask.svg";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { setMetaMaskCred } from "../Toolkit/Slices/Web3Slice";

import ABI from "../ABI.json";

const Wallet = () => {
  const account = useSelector((state) => state.web3.account);
  const contract = useSelector((state) => state.web3.contract);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { currentColor } = useStateContext();

  const isMetaMaskInstalled = typeof window.ethereum !== "undefined";

  const openMetaMaskInstallPage = () => {
    window.open("https://metamask.io/download.html", "_blank");
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0xBf506db32180D64c9153A6bB24292d2671270203";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        dispatch(
          setMetaMaskCred({
            web3: web3,
            contract: contract,
            account: accounts[0],
          })
        );
        navigateTo("/govofficial/tender/create");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isMetaMaskInstalled ? (
        <div className="">
          <button
            onClick={connectWallet}
            style={{ backgroundColor: currentColor }}
            className={` text-white font-bold py-2 px-4 rounded-md `}
          >
            <img
              className="inline-block h-5 w-5 mr-2"
              src={metamask}
              alt="Metamask"
            />
            Connect with MetaMask
          </button>
        </div>
      ) : (
        <div className="">
          <button
            onClick={connectWallet}
            style={{ backgroundColor: currentColor }}
            className={` text-white font-bold py-2 px-4 rounded-md `}
          >
            <img
              className="inline-block h-5 w-5 mr-2"
              src={metamask}
              alt="Metamask"
            />
            Connect MetaMask Wallet
          </button>
        </div>
      )}
    </>
  );
};

export default Wallet;
