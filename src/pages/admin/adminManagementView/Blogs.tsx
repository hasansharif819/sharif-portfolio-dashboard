import {
  Button,
  Modal,
    Table,
    TableColumnsType,
  } from "antd";

import { useDeleteBlogMutation, useGetAllBlogsQuery } from "../../../redux/features/blogs/blogs.api";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import UpdateBlogModal from "../adminManagementUpdate/UpdateBlogModal";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
  
  const { confirm } = Modal;
  const Blogs = () => {
    const { data: blogs, isFetching } = useGetAllBlogsQuery({});
    const [deleteBlog] = useDeleteBlogMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
    const token = useAppSelector(useCurrentToken);

    let user: any;

    if (token) {
      user = verifyToken(token);
    }
    const userRole = user?.role;
    
    const tableData = blogs?.data?.map(
      ({
        _id,
        title,
        description,
      }) => ({
        key: _id,
        title,
        description,
      })
    );
  
    const columns: TableColumnsType<any> = [
      {
        title: "Blog Title",
        key: "title",
        dataIndex: "title",
      },
      {
        title: "Update",
        key: "_id",
        render: (item: any) => {
          return userRole === "admin" ? (
            <Button onClick={() => showUpdateModal(item)}>Update</Button>
          ) : null;
        },
      },
      {
        title: "Delete",
        key: "_id",
        render: (item: any) => {
          const showDeleteConfirm = (blogId: string) => {
            confirm({
              title: "Do you want to delete this Blog?",
              icon: <ExclamationCircleOutlined />,
              content: "This action cannot be undone.",
              onOk() {
                handleDelete(blogId);
              },
              onCancel() {
              },
            });
          };
  
          const handleDelete = async (item: any) => {
            const toastId = toast.loading("Deleting...");
            const blogId = item;
  
            try {
              const res = (await deleteBlog(blogId)) as TResponse<any>;
              if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
              } else {
                toast.success("Blog successfully deleted", { id: toastId });
              }
            } catch (err) {
              toast.error("Something went wrong, Blog was not deleted.", {
                id: toastId,
              });
            }
          };
          return userRole === "admin" || userRole === "super-admin" ? (
            <Button onClick={() => showDeleteConfirm(item.key)}>Delete</Button>
          ) : null;
        },
      },
    ];

    const showUpdateModal = (item: any) => {
      setSelectedBlog(item);
      setIsModalVisible(true);
    };
  
    return (
      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
        />
        <UpdateBlogModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        blog={selectedBlog}
      />
      </>
    );
  };
  
  export default Blogs;
  