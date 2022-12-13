import React from "react";
import Chart from "./features/chart";
import InputForm from "./features/inputform";
import ButtonGroup from "./features/buttongroup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="sm:w-11/12 lg:w-4/5 m-auto mt-[20px]">
        <div className="min-w-[320px] m-auto">
          <ButtonGroup />
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:w-11/12 lg:w-4/5 m-auto main-container bg-main-container-background-color mt-[50px]">
        <div className="flex-auto w-3/12 min-w-[320px] m-auto">
          <InputForm />
        </div>
        <div className="flex-auto w-9/12 p-[5px] min-w-[320px] m-auto">
          <div className="bg-background-color h-full pb-[4px]">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
