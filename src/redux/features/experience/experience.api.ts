import { TResponseRedux } from "../../../types";
import { TExperience } from "../../../types/experience.type";
import { baseApi } from "../../api/baseApi";


const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperience: builder.query({
      query: () => ({
        url: "/experience",
        method: "GET",
    }),
      providesTags: ["experience"],
      transformResponse: (response: TResponseRedux<TExperience[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    createExperience: builder.mutation({
      query: (data) => ({
        url: `/experience/create-experience`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),
    updateExperience: builder.mutation({
      query: (args) => ({
        url: `/experience/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["experience"],
    }),

    getExperienceById: builder.query({
      query: (id: string) => ({
        url: `/experience/${id}`,
        method: "GET",
      }),
      providesTags: ["experience"],
    }),

    deleteExperience: builder.mutation({
      query: (id: string) => ({
        url: `/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),
  }),
});

export const {
  useGetAllExperienceQuery,
  useCreateExperienceMutation,
  useGetExperienceByIdQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation
} = experienceApi;
