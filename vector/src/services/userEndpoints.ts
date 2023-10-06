import { baseApi } from "./apiService";
import { GetUsersResponse } from "../types/types";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => ({
        url: "api/v1/people",
      }),
      transformResponse: (response: GetUsersResponse) => {
        const users = response.data.map((el, idx) => ({ ...el, id: idx.toString()}));

        return {
          data: users
        }
      }
    }),
    setUserParams: builder.mutation<any, FormData>({
      query: (userParams) => ({
        url: "api/v1/people",
        method: 'POST',
        body: userParams
      })
    })
  })
});

export const {
  useGetUsersQuery,
  useSetUserParamsMutation
} = userEndpoints;

