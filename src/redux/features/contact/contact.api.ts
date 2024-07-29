import { TResponseRedux } from "../../../types";
import { TContacts } from "../../../types/contact.type";
import { baseApi } from "../../api/baseApi";


const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
    }),
      providesTags: ["contacts"],
      transformResponse: (response: TResponseRedux<TContacts[]>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useGetAllContactsQuery
} = contactApi;
