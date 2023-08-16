import { createSlice } from '@reduxjs/toolkit';

//Initial State
const initialUser = {
  userName: '',
  userId: '',
  token: '',
  refreshToken: '',
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  roles: [],
  staffId: ''
};

//Reducer function
const setAuthenticate = (state, action) => {
  state.isError = false;
  state.errorMessage = '';
  return action.payload;
};

//Slice
const authenticationSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setAuthenticate,
  },
});

export const authActions = authenticationSlice.actions; //to reducer method oursite the slide
export default authenticationSlice;
