import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chartReducer from "../features/chart/chartSlice";
import inputFormReducer from "../features/inputform/inputFormSlice";
import budgetReducer from "../features/buttongroup/budgetSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chart: chartReducer,
    inputForm: inputFormReducer,
    budget: budgetReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
