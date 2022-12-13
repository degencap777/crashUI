import WalletSVG from "../../assets/icon/wallet.svg";
const DepositButton = (props: DepositButtonProps) => {
  return (
    <div className="flex relative">
      <button
        className="rounded w-full bg-[#3067D4] disabled:bg-[#1C3859] disabled:text-gray-400 text-left text-white font-bold text-[0.8rem] p-3"
        disabled={props.value}
        onClick={() => props.onBtnClick(true)}
      >
        {props.text}
      </button>
      <div>
        <img
          className="w-5 h-full absolute ml-[-35px]"
          src={WalletSVG}
          alt="wallet svg"
        />
      </div>
    </div>
  );
};

export interface DepositButtonProps {
  text: string;
  value: boolean;
  onBtnClick: (clicked: boolean) => void;
}

export default DepositButton;
