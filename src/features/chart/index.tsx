import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Line } from "react-chartjs-2";
import {
  numberFormat,
  randomNumberGenerator,
  initialLabel,
} from "../../Common/Utils";
import { Colors, SpaceBetween } from "../../models/GlobalValue";
import "./index.css";
import BoomPNG from "../../assets/img/boom.png";
import { crashStart, crashEndEvent, currentCrashValue } from "./chartSlice";
import {
  selectInputForm,
  autoCashValueState,
} from "../inputform/inputFormSlice";
import { calcTimers, chartDelayTime } from "../../Common/GlobalValue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function Chart() {
  const calcTimer = 10;
  const divideTime = useRef<number>(calcTimers[0]);
  let interval = useRef<number | null>(null);
  const dispatch = useAppDispatch();
  const inputFrom = useAppSelector(selectInputForm);
  const delayTime = useRef(chartDelayTime);
  const [labels, setLabels] = useState<Array<number>>(initialLabel);
  const [yValue, setYValue] = useState<Array<number>>([]);
  const [xValue, setXValue] = useState<number>(0);
  const [timer, setTimer] = useState(0);
  const [crashValue, setCrashValue] = useState(1);
  const [destroyValue, setDestroyValue] = useState(
    randomNumberGenerator() / 100
  );
  const [crashEnd, setCrashEnd] = useState(false);
  const [delayStart, setDelayStart] = useState(true);
  const [plusValue, setPlusValue] = useState(0);
  const [crashHistory, setCrashHistory] = useState([
    { value: 1.04, color: Colors.Red },
    { value: 22.05, color: Colors.Green },
    { value: 8.03, color: Colors.Gray },
    { value: 23.65, color: Colors.Green },
    { value: 100.25, color: Colors.Gray },
    { value: 1.32, color: Colors.Red },
    { value: 1.75, color: Colors.Red },
    { value: 12.03, color: Colors.Green },
    { value: 18.63, color: Colors.Green },
    { value: 2.02, color: Colors.Gray },
    { value: 1.04, color: Colors.Red },
    { value: 22.05, color: Colors.Green },
    { value: 8.03, color: Colors.Gray },
    { value: 23.65, color: Colors.Green },
    { value: 100.25, color: Colors.Gray },
    { value: 1.32, color: Colors.Red },
    { value: 1.75, color: Colors.Red },
    { value: 12.03, color: Colors.Green },
    { value: 18.63, color: Colors.Green },
    { value: 2.02, color: Colors.Gray },
    { value: 1.04, color: Colors.Red },
  ]);

  const [state, setState] = useState({
    labels: labels,
    datasets: [
      {
        label: "",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        borderColor: Colors.GraphColor,
        borderWidth: 10,
        data: yValue,
        backgroundColor: Colors.GraphColor,
        lineTension: 0.8,
      },
      {
        label: "",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        borderColor: Colors.GraphColor,
        borderWidth: 0,
        data: [0.99, 1.5],
      },
    ],
  });

  useEffect(() => {
    if (crashEnd) {
      const updateState = {
        labels: labels,
        datasets: [
          {
            label: "",
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            borderColor: Colors.Red,
            borderWidth: 10,
            data: yValue,
            backgroundColor: Colors.Red,
            lineTension: 0.8,
          },
          {
            label: "",
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            borderColor: Colors.Red,
            borderWidth: 0,
            data: [0.99, 1.5],
          },
        ],
      };
      setState(updateState);
      const bombTimer = setTimeout(() => {
        setDelayStart(true);
        setCrashEnd(false);
        dispatch(crashEndEvent(false));
        dispatch(crashStart(false));
        dispatch(currentCrashValue(1));
        dispatch(autoCashValueState(0));
      }, 2000);
      return () => clearTimeout(bombTimer);
    } else {
      setTimer(0);
    }
  }, [crashEnd]);

  useEffect(() => {}, [crashHistory]);

  useEffect(() => {
    interval.current = window.setInterval(() => {
      if (delayStart) delayTime.current = delayTime.current - 0.01;
      else drawGraph();
      setTimer((prevState) => prevState + 1);
    }, calcTimer);
    if (delayTime.current < 0) {
      if (interval.current) {
        window.clearInterval(interval.current);
        dispatch(crashStart(true));
        setXValue(0);
        delayTime.current = chartDelayTime;
        setDelayStart(false);
        interval.current = null;
        setTimer(0);
      }
    }
    if (yValue[yValue.length - 1] >= destroyValue) {
      if (interval.current) {
        window.clearInterval(interval.current);
        dispatch(crashEndEvent(true));
        setCrashValue(1);
        setLabels(initialLabel);
        setYValue([]);
        setCrashEnd(true);
        setDestroyValue(randomNumberGenerator() / 100);
        divideTime.current = calcTimers[0];
        const newChatHistory = {
          value: Number(numberFormat(crashValue, 2)),
          color:
            inputFrom.autoCashValue === 0
              ? Colors.Gray
              : inputFrom.autoCashValue >= crashValue
              ? Colors.Red
              : Colors.Green,
        };
        const newChatHistoryArray = [newChatHistory].concat(crashHistory);
        setCrashHistory(newChatHistoryArray);
        interval.current = null;
      }
    }
    return () => {
      if (interval.current) {
        window.clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [timer]);

  const drawGraph = useCallback(() => {
    const updateState = {
      labels: labels,
      datasets: [
        {
          label: "",
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          borderColor: Colors.GraphColor,
          borderWidth: 10,
          data: yValue,
          backgroundColor: Colors.GraphColor,
          lineTension: 0.8,
        },
        {
          label: "",
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          borderColor: Colors.GraphColor,
          borderWidth: 0,
          data: [0.99, 1.5],
        },
      ],
    };

    if (labels.indexOf(timer) <= -1) {
      setLabels((t) => [...t, timer]);
    }
    // if (Math.floor(plusValue) >= 1) {
    //   setPlusValue(0);
    //   setCrashValue((prevValue) => prevValue + 0.01);
    // }
    setXValue((prevState) => prevState + divideTime.current);
    setYValue((t) => [
      ...t,
      Math.pow(xValue, 4) + Math.pow(xValue, 3) + Math.pow(xValue, 2) + 1,
    ]);
    setPlusValue((prevValue) => prevValue + 1 / divideTime.current);
    dispatch(currentCrashValue(crashValue));
    if (timer > 600) {
      divideTime.current = calcTimers[1];
    }
    if (timer > 1200) {
      divideTime.current = calcTimers[2];
    }
    setState(updateState);
  }, [state, timer]);

  return (
    <div className="h-full">
      {delayStart ? (
        <div className="w-full h-[50vh] items-center flex justify-center">
          <div className="w-[40%]">
            <label className="text-white font-bold text-[4rem]">
              {numberFormat(delayTime.current, 1)}s
            </label>
            <div className="mt-[10px] rounded py-[10px] px-[15px] bg-main-container-background-color">
              <div
                className="bg-yellow-color h-5 rounded"
                style={{
                  width: `${delayTime.current * 10}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {!crashEnd ? (
            <label className="absolute text-white font-bold text-[4rem] flex w-full h-full justify-center items-center">
              {numberFormat(yValue[yValue.length - 1], 2)}x
            </label>
          ) : (
            <div className="absolute flex justify-center items-center w-full h-full">
              <label className="text-[#ff0000] font-bold text-[4rem]">
                You Crashed
              </label>
            </div>
          )}
          <Line
            data={state}
            options={{
              animation: false,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true, mode: "nearest" },
              },
              scales: {
                y: {
                  grid: { display: false },
                  ticks: {
                    color: "gray",
                    callback: function (value, index, ticks) {
                      return numberFormat(Number(value), 1) + "x";
                    },
                    count: 4,
                  },
                  min: 0.99,
                  max:
                    yValue[yValue.length - 1] >= 1.5
                      ? yValue[yValue.length - 1]
                      : undefined,
                },
                x: {
                  grid: { display: false },
                  ticks: {
                    color: "gray",
                    autoSkip: true,
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      )}
      <div className="flex rounded my-[5px] mx-[10px] py-[10px] px-[15px] bg-main-container-background-color overflow-x-hidden">
        {crashHistory.map((item, _index) => {
          return (
            <label
              style={{ color: item.color }}
              className={`mr-10 font-bold`}
              key={_index}
            >
              {item.value}x
            </label>
          );
        })}
      </div>
    </div>
  );
}
