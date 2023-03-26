import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async function called with a user object,
//assumed to contain the details of the user to be deleted
const deleteUser = createAsyncThunk("users/remove", async (user) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  //return the user to be deleted instead of returning response.data
  //because that will be an empty object
  // return response.data;
  return user;
});

export { deleteUser };
