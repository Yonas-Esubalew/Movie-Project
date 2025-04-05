import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({ // ✅ changed to mutation
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),
    updateGenre: builder.mutation({ // ✅ changed to mutation
      query: ({ id, updateGenre }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: updateGenre,
      }),
    }),
    deleteGenre: builder.mutation({ // ✅ changed to mutation
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    fetchGenres: builder.query({
      query: () => ({
        url: `${GENRE_URL}/genres`,
      }),
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery, // ✅ now this works as expected
} = genreApiSlice;
