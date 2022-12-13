import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  depositBudgetState,
  selectBudget,
  widrawBudgetState,
} from "../buttongroup/budgetSlice";

const Modal = (props: ModalProps) => {
  const dispatch = useAppDispatch();
  const budget = useAppSelector(selectBudget);
  const [depositBudget, setDepositBudget] = useState(50);
  const [widrawBudget, setWidrawBudget] = useState(0);

  const depositButtonPress = () => {
    dispatch(depositBudgetState(depositBudget));
    props.onSetShowModal(false);
  };

  const widrawButtonPress = () => {
    if (budget.budgetValue >= widrawBudget) {
      dispatch(widrawBudgetState(widrawBudget));
      props.onSetShowModal(false);
    }
  };
  return (
    <>
      {props.showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font-bold">Deposit / Widraw Modal</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Deposit Amount
                    </label>
                    <input
                      type="number"
                      value={depositBudget}
                      onChange={(e) => setDepositBudget(Number(e.target.value))}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Widraw Amount
                    </label>
                    <input
                      type="number"
                      value={widrawBudget}
                      onChange={(e) => setWidrawBudget(Number(e.target.value))}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={depositButtonPress}
                  >
                    Deposit
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={widrawButtonPress}
                  >
                    Widraw
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => props.onSetShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export interface ModalProps {
  showModal: boolean;
  onSetShowModal: (showModal: boolean) => void;
}

export default Modal;
