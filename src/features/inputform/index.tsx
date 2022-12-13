import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import IconButtonInput from "../iconbuttoninput";
import RightInput from "../rightinput";
import DepositButton from "../depositbutton";
import DepositList from "../depositlist";
import { DepositUser } from "../../models/Interface";
import { selectChart } from "../chart/chartSlice";
import { autoCashValueState } from "./inputFormSlice";
import {
  depositBudgetState,
  selectBudget,
  widrawBudgetState,
} from "../buttongroup/budgetSlice";

const InputForm = () => {
  const dispatch = useAppDispatch();
  const chart = useAppSelector(selectChart);
  const budget = useAppSelector(selectBudget);
  const [betAmount, setBetAmount] = useState(0);
  const [autoCashIn, setAutoCashIn] = useState(1);
  const [depositBtn, setDepositBtn] = useState(false);
  const [cashOutBtn, setCashOutBtn] = useState(false);
  const [betEnter, setBetEnter] = useState(false);
  const [depositList, setDepositList] = useState([
    { UserName: "User1532900976809sPWm", AutoCash: 3.25, BetAmount: 1.02 },
    { UserName: "User2320900976809sPWm", AutoCash: 1.35, BetAmount: 10.0 },
    { UserName: "User3252900976809sPWm", AutoCash: 10.32, BetAmount: 1000.0 },
    { UserName: "User2015900976809sPWm", AutoCash: 1.25, BetAmount: 60.23 },
  ]);
  const [depositTotalAmount, setDepositTotalAmount] = useState(0);
  const [showErrorMSG, setShowErrorMSG] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successAmount, setSuccessAmount] = useState(0);
  const [betAutoIn, setBetAutoIn] = useState(0);

  useEffect(() => {
    let totalAmount = 0;
    depositList.forEach((depositUser: DepositUser) => {
      totalAmount += depositUser.BetAmount;
    });
    setDepositTotalAmount(totalAmount);
  }, [depositList]);

  useEffect(() => {
    if (chart.crashStarted) {
      setDepositBtn(true);
    } else {
      setDepositList([
        { UserName: "User1532900976809sPWm", AutoCash: 3.25, BetAmount: 1.02 },
        { UserName: "User2320900976809sPWm", AutoCash: 1.35, BetAmount: 10.0 },
        {
          UserName: "User3252900976809sPWm",
          AutoCash: 10.32,
          BetAmount: 1000.0,
        },
        { UserName: "User2015900976809sPWm", AutoCash: 1.25, BetAmount: 60.23 },
      ]);
      setBetEnter(false);
      setDepositBtn(false);
      setCashOutBtn(false);
      setSuccessAmount(0);
    }
  }, [chart.crashStarted]);

  useEffect(() => {
    if (
      chart.crashEnded &&
      betEnter === true &&
      chart.crashValue >= betAutoIn
    ) {
      dispatch(depositBudgetState(successAmount));
    }
  }, [chart.crashEnded]);

  useEffect(() => {
    if (chart.crashValue > autoCashIn) {
      setCashOutBtn(true);
    }
  }, [chart.crashValue]);

  const doubleBetAmount = () => {
    betAmount * 2 > budget.budgetValue
      ? setBetAmount(budget.budgetValue)
      : setBetAmount(betAmount * 2);
  };

  const divideBetAmount = () => {
    setBetAmount(betAmount / 2);
  };

  const maxBetAmount = () => {
    setBetAmount(budget.budgetValue);
  };

  const depositButtonClick = (clicked: boolean) => {
    if (betAmount === 0) {
      setErrorMsg("Bet Amount Must Bigger Than 0");
      setShowErrorMSG(true);
    } else if (autoCashIn <= 1) {
      setErrorMsg("Auto Cashout In Must Bigger Than 1");
      setShowErrorMSG(true);
    } else if (betAmount > budget.budgetValue) {
      setErrorMsg("No Money");
      setShowErrorMSG(true);
    } else {
      dispatch(widrawBudgetState(betAmount));
      dispatch(autoCashValueState(autoCashIn));
      setSuccessAmount(betAmount * autoCashIn);
      setBetAutoIn(autoCashIn);
      setDepositList((t) => [
        ...t,
        {
          UserName: "User1668900976809sPWm",
          AutoCash: autoCashIn,
          BetAmount: betAmount,
        },
      ]);
      setBetEnter(true);
      setDepositBtn(clicked);
    }
  };

  const cashOutButtonClick = (clicked: boolean) => {
    if (!cashOutBtn) {
      dispatch(autoCashValueState(chart.crashValue));
      const changeDepositList = depositList.map((user) => {
        if (user.UserName !== "User1668900976809sPWm") return user;
        else {
          return {
            ...user,
            AutoCash: chart.crashValue,
          };
        }
      });
      setDepositList(changeDepositList);
      setCashOutBtn(clicked);
      setBetAutoIn(chart.crashValue);
      setSuccessAmount(betAmount * chart.crashValue);
    }
  };

  return (
    <div className="w-5/6 m-auto min-w-[320px]">
      <div className="mt-[40px]">
        <IconButtonInput
          value={betAmount}
          onDoubleValue={doubleBetAmount}
          onDivideValue={divideBetAmount}
          onMaxValue={maxBetAmount}
          onValueChange={(number: number) => setBetAmount(number)}
        />
      </div>
      <div className="mt-[20px]">
        <RightInput
          value={autoCashIn}
          onValueChange={(number: number) => setAutoCashIn(number)}
        />
      </div>
      <div className="mt-[30px]">
        {chart.crashStarted && successAmount > 0 ? (
          <DepositButton
            text="Cash Out"
            value={cashOutBtn}
            onBtnClick={(clicked: boolean) => cashOutButtonClick(clicked)}
          />
        ) : (
          <DepositButton
            text="Deposit First"
            value={depositBtn}
            onBtnClick={(clicked: boolean) => depositButtonClick(clicked)}
          />
        )}
      </div>
      <div className="mt-[20px]">
        <DepositList
          depositList={depositList}
          totalAmount={depositTotalAmount}
        />
      </div>
      {showErrorMSG && (
        <div
          className="absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded inset-0 h-[50px]"
          role="alert"
        >
          <strong className="font-bold">Input Error!</strong>
          <span className="block sm:inline">{errorMsg}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowErrorMSG(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default InputForm;
