import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//package to add fake text
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),

  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        //the 3rd arguement is always the prop passed into the query
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "PhotoAlbum", id: album.id });
          return tags;
        },
        //assume it takes an album parameter
        //because the photos are contained in an album
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "PhotoAlbum", id: album.id }];
        },
        //adding to the album object
        query: (album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          //type= Photo because we're dealing with the photos and not albums
          return [{ type: "Photo", id: photo.id }];
        },
        //we're deleting an item (photo)
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;

//to be able to connect to the redux store
export { photosApi };
