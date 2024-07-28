import { TResponseRedux } from "../../../types";
import { TSkills } from "../../../types/skills.type";
import { baseApi } from "../../api/baseApi";


const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
    }),
      providesTags: ["projects"],
      transformResponse: (response: TResponseRedux<TSkills[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    createSkill: builder.mutation({
      query: (data) => ({
        url: `/skills/create-skill`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["skills"],
    }),
    updateSkill: builder.mutation({
      query: (args) => ({
        url: `/skills/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["skills"],
    }),

    deleteSkill: builder.mutation({
      query: (id: string) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skills"],
    }),

    getSkillById: builder.query({
      query: (id: string) => ({
        url: `/skills/${id}`,
        method: "GET",
      }),
      providesTags: ["skills"],
    }),
  }),
});

export const {
  useGetAllSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetSkillByIdQuery,
} = skillsApi;
