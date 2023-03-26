import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//package to add fake text
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  //specify where all the state is going to be stored inside of a big state object
  //best practice is to name the reducerPath after the api
  //but can be named anything we want
  reducerPath: "albums",

  //uses the predfined fetchBaseQuery to ftech data from the api
  baseQuery: fetchBaseQuery({
    //the main access point of my json server
    baseUrl: "http://localhost:3005",
  }),

  //endpoints
  endpoints(builder) {
    //returns all the types of request you want to make
    return {
      //fetchAlbums, the name given to the key to get all albums
      //this is a query and not a mutation hence "builder.query"
      //fetchAlbums is used as a template by redux to generate hooks
      //in this case the hook will be named alblumsApi.useFetchAlbumsQuery
      fetchAlbums: builder.query({
        //giving the query a tag
        //this way you don't have to refresh the page to see the new updates
        //*providesTags: ["Album"]*,

        //to make sure only the mutated tag is rerendered, the Tag need an id
        //this way the application only makes requests on the modified user
        //this user is the same param used in the component
        //in this case I am identifyinh the user by its id

        /* providesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id },];
        },*/

        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });

          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
        },

        //takes a user object
        //same object to be passed in the component when the fetchAlbumsQuery is used
        query: (user) => {
          return {
            //telling the api how to fetch the details,
            //this will be joined to the baseUrl specified in the baseQuery
            url: "/albums",

            //give it a parameter
            //the param is used as a key to identify the user we're looking for
            //in this case, the userId
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),

      //this is a mutation because we are updating the data in the data base
      addAlbum: builder.mutation({
        //invalidateTag so the query automatically upates when this mutation is called
        //this way you don't have to refresh the page to see the new updates
        //the queries that use this tag are found and invalidated and are executed again
        invalidatesTags: (result, error, user) => {
          //find the Tag and id and only mutates that specific object
          // so the request are made for only this user identified by teh id
          return [{ type: "UsersAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            //structure of how the data is to be stored, like a DB schema
            body: {
              //userId takes the id of the user object
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        //finding the album to delete
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

//export all the automatically generated hooks
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;

//export the api too
export { albumsApi };
