import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/types";
import { RootState } from "../store";

interface InitialState {
  user: UserType[]
}

const initialState: InitialState = {
  user: [] as UserType[]
}

export const userSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setStore(state, action: PayloadAction<UserType[]>) {
      state.user = action.payload
    },
  },
})

export const { setStore } = userSlice.actions
export const selectStore = (state: RootState) => state.userReducer.user

export default userSlice.reducer;