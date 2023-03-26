import { configureStore } from "@reduxjs/toolkit";
//connecting api to store
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userReducer } from "./slices/usersSlice";
//import api
import { albumsApi } from "./rtkqapis/albumsApi";
import { photosApi } from "./rtkqapis/photosApi";

const store = configureStore({
  //reducer without an S
  reducer: {
    users: userReducer,

    //could just be "albums: albumsApi.reducer", replaced to avoid typos
    //taps into the ablumsApi and finds the name associated with the reducerPath and uses it as a key
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },

  //middleware is automatically created for each api
  //and the need to be connected with concats
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

//done just once for all redux apis
setupListeners(store.dispatch);

//always remember to export thunks
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";

//always export RTKQ API hooks if they're in a different file
//albumsApi
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} from "./rtkqapis/albumsApi";

//photosApi
export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} from "./rtkqapis/photosApi";

export { store };
