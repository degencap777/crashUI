import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface InputFormState {
  autoCashValue: number,
}

const initialState: InputFormState = {
    autoCashValue: 0,
};

export const inputFormSlice = createSlice({
  name: 'inputform',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    autoCashValueState: (state, action: PayloadAction<number>) => {
      state.autoCashValue = action.payload;
    }
  },
});

export const { autoCashValueState } = inputFormSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInputForm = (state: RootState) => state.inputForm;

export default inputFormSlice.reducer;
