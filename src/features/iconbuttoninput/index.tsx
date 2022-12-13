import SolSVG from "../../assets/icon/solana-sol-icon.svg";
const IconButtonInput = (props: IconButtonInputProps) => {
  return (
    <div>
      <p className="text-left text-font-color font-bold">Bet amount</p>
      <label className="relative text-gray-400 focus-within:text-gray-600 flex">
        <img
          src={SolSVG}
          className="w-4 h-full absolute ml-[5px]"
          alt="SOL Icon"
        />
        <input
          type="number"
          placeholder="0.00"
          step=".01"
          value={props.value}
          onChange={(e) => {
            props.onValueChange(Number(e.target.value));
          }}
          className="form-input w-full pl-[23px] bg-background-color border-2 border-solid border-border-color outline:border-border-color focus:outline-none focus:shadow-outline h-[35px] font-bold"
        />
        <div className="h-full">
          <div className="flex absolute ml-[-148px] mt-[4px]">
            <button
              className="w-11 h-3/4 bg-main-container-background-color rounded-[5px] mr-[5px] text-[0.8rem] font-bold text-white p-[4px]"
              onClick={props.onDivideValue}
            >
              x1/2
            </button>
            <button
              className="w-11 h-3/4 bg-main-container-background-color rounded-[5px] mr-[5px] text-[0.8rem] font-bold text-white p-[4px]"
              onClick={props.onDoubleValue}
            >
              x2
            </button>
            <button
              className="w-11 h-3/4 bg-main-container-background-color rounded-[5px] mr-[5px] text-[0.8rem] font-bold text-white p-[4px]"
              onClick={props.onMaxValue}
            >
              Max
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export interface IconButtonInputProps {
  onDoubleValue: () => void;
  onDivideValue: () => void;
  onMaxValue: () => void;
  onValueChange: (number: number) => void;
  value: number;
}

export default IconButtonInput;
