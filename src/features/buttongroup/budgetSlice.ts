import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface BudgetState {
  budgetValue: number,
}

const initialState: BudgetState = {
  budgetValue: 50,
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    depositBudgetState: (state, action: PayloadAction<number>) => {
      state.budgetValue += action.payload;
    },
    widrawBudgetState: (state, action: PayloadAction<number>) => {
      state.budgetValue -= action.payload;
    },
  },
});

export const { depositBudgetState, widrawBudgetState } = budgetSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBudget = (state: RootState) => state.budget;

export default budgetSlice.reducer;
