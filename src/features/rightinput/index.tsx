import "./index.css";
const RightInput = (props: RightInputProps) => {
  return (
    <div>
      <p className="text-left text-font-color font-bold">Auto Cashout in</p>
      <label className="relative text-gray-400 focus-within:text-gray-600 flex">
        <input
          type="number"
          placeholder="0.00"
          step=".01"
          value={props.value}
          onChange={(e) => {
            props.onValueChange(Number(e.target.value));
          }}
          className="float-right w-full bg-background-color border-2 border-solid border-border-color outline:border-border-color focus:outline-none focus:shadow-outline h-[35px] font-bold input-rtl"
        />
      </label>
    </div>
  );
};

export interface RightInputProps {
  onValueChange: (number: number) => void;
  value: number;
}

export default RightInput;
