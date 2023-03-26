import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//users/fetch can be named anything
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  //make a request to get the list of users
  const response = await axios.get("http://localhost:3005/users");

  //FOR TEST PURPOSES
  await pause(2000);

  //return the list of users.
  //that is the data we want to user in our reducer
  //this is automatically assigned to the payload property of the action
  return response.data;
});

//DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// //thunks automatically have 3 props assigned to them
// fetchUsers.pending //when it's loading
// fetchUsers.fulfilled //when things are right
// fetchUsers.rejected //when there's an error

export { fetchUsers };
