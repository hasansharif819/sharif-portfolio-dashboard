import { TResponseRedux, TUser } from "../../../types";
import { baseApi } from "../../api/baseApi";


const adminsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
    }),
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/users/create-admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
  useChangePasswordMutation
} = adminsApi;
