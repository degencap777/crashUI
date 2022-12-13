import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { DepositUser } from "../../models/Interface";
import SolSVG from "../../assets/icon/solana-sol-icon.svg";
import "./index.css";
import { selectChart } from "../chart/chartSlice";
import { numberFormat } from "../../Common/Utils";

const DepositList = (props: DepositListProps) => {
  const chart = useAppSelector(selectChart);
  return (
    <div>
      <p className="text-white font-bold text-[0.8rem] text-left">
        {props.totalAmount} $USD
      </p>
      <div className="bg-background-color h-[160px] rounded w-full mt-[10px] p-[15px] mb-[20px] overflow-y-auto scroll-div">
        {props.depositList.map((user: DepositUser, _index) => {
          return (
            <div className="flex space-between" key={_index}>
              <p
                className={
                  "font-bold text-[0.8rem] w-[55%] text-center " +
                  `${
                    !chart.crashStarted
                      ? "text-white"
                      : user.AutoCash <= chart.crashValue
                      ? "text-green-600"
                      : chart.crashEnded
                      ? "text-red-600"
                      : "text-white"
                  }`
                }
              >
                {user.UserName.length >= 16
                  ? user.UserName.slice(0, 11) + "..." + user.UserName.slice(-4)
                  : user.UserName}
              </p>
              <p
                className={
                  "font-bold text-[0.8rem] w-[15%] text-center " +
                  `${
                    !chart.crashStarted
                      ? "text-white"
                      : user.AutoCash <= chart.crashValue
                      ? "text-green-600"
                      : chart.crashEnded
                      ? "text-red-600"
                      : "text-white"
                  }`
                }
              >
                {user.AutoCash <= chart.crashValue
                  ? numberFormat(user.AutoCash, 2)
                  : "-"}
              </p>
              <div className="w-[5%]">
                <img src={SolSVG} className="w-4 h-full" alt="SOL Icon" />
              </div>
              <p
                className={
                  "font-bold text-[0.8rem] w-[25%] text-center " +
                  `${
                    !chart.crashStarted
                      ? "text-white"
                      : user.AutoCash <= chart.crashValue
                      ? "text-green-600"
                      : chart.crashEnded
                      ? "text-red-600"
                      : "text-white"
                  }`
                }
              >
                US$ {user.BetAmount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface DepositListProps {
  depositList: Array<DepositUser>;
  totalAmount: number;
}

export default DepositList;
