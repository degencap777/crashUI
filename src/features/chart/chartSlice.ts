import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ChartState {
  crashStarted: boolean;
  crashEnded: boolean;
  crashValue: number,
}

const initialState: ChartState = {
    crashStarted: false,
    crashEnded: false,
    crashValue: 1,
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    crashStart: (state, action: PayloadAction<boolean>) => {
      state.crashStarted = action.payload;
    },
    crashEndEvent: (state, action: PayloadAction<boolean>) => {
      state.crashEnded = action.payload;
    },
    currentCrashValue: (state, action: PayloadAction<number>) => {
        state.crashValue = action.payload;
    },
  },
});

export const { crashStart, crashEndEvent, currentCrashValue } = chartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChart = (state: RootState) => state.chart;

export default chartSlice.reducer;
