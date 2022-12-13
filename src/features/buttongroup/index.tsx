import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../Modal";
import QuestionMark from "../../assets/icon/question-mark.svg";
import { selectBudget } from "./budgetSlice";
import { numberFormat } from "../../Common/Utils";

const ButtonGroup = () => {
  const budget = useAppSelector(selectBudget);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex justify-end">
      <button className="btn bg-button-color rounded border-button-border-color border-b-4 text-black font-bold px-[25px] py-[15px] flex mr-[30px]">
        RAKEBACK US$ {numberFormat(budget.budgetValue, 2)}
        <img
          src={QuestionMark}
          className="w-4 h-4 ml-[5px] mt-[4px]"
          alt="Question Mark"
        />
      </button>
      <button
        className="btn bg-button-color rounded border-button-border-color border-b-4 text-black font-bold px-[25px] py-[15px]"
        onClick={() => setShowModal(true)}
      >
        Deposit
      </button>
      <Modal showModal={showModal} onSetShowModal={setShowModal} />
    </div>
  );
};

export default ButtonGroup;
