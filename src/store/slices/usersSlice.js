import { createSlice } from "@reduxjs/toolkit";
//import thunk
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

//create slice for users
const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  //adding extraReducers to watch particular action types, those not inherently tied to the slice
  //in this case, those made by thunks
  extraReducers(builder) {
    //calling addCase for all possible action types
    //thunks automatically have 3 props assigned to them
    // fetchUsers.pending //when it's loading
    // fetchUsers.fulfilled //when things are right
    // fetchUsers.rejected //when there's an error

    builder.addCase(fetchUsers.pending, (state, action) => {
      //changing state by setting isLoading to be true to show the user that the page is loading
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //isLoading is set to false and we need to update the data array
      state.isLoading = false;

      // the data that is return by the fetch users thunk
      //is automatically assigned to the payload property of the action
      //so we update the data prop with the action payload
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //addUser reducer cases
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;

      //adding the user to the data array
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //deleteUser reducer cases
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;

      //deleting user
      state.data = state.data.filter((user) => {
        //deletes user and return the users left
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const userReducer = usersSlice.reducer;
