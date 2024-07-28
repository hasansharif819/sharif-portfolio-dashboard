import { TResponseRedux } from "../../../types";
import { TProjects } from "../../../types/projects.type";
import { baseApi } from "../../api/baseApi";

const ProjectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
    }),
      providesTags: ["projects"],
      transformResponse: (response: TResponseRedux<TProjects[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: `/projects/create-project`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),

    updateProject: builder.mutation({
        query: (args) => ({
            url: `/projects/${args.id}`,
            method: "PATCH",
            body: args.data,
        }),
        invalidatesTags: ["projects"],
    }),

    deleteProject: builder.mutation({
        query: (id: string) => ({
            url: `/projects/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["projects"],
    }),

    getProjectById: builder.query({
        query: (id: string) => ({
            url: `/projects/${id}`,
            method: "GET",
        }),
        providesTags: ["projects"],
    }),
  }),
});

export const { useGetAllProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = ProjectsApi;
