import { TResponseRedux } from "../../../types";
import { TBlogs } from "../../../types/blogs.type";
import { baseApi } from "../../api/baseApi";


const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
    }),
      providesTags: ["blogs"],
      transformResponse: (response: TResponseRedux<TBlogs[]>) => {
        return {
          data: response.data,
        };
      },
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs/create-blog`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    updateBlog: builder.mutation({
      query: (args) => ({
        url: `/blogs/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),

    getBlogById: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} = blogsApi;
