import { useState } from "react";
import { Button, Modal, Table } from "antd";
import { useDeleteProjectMutation, useGetAllProjectsQuery } from "../../../redux/features/projects/projects.api";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TResponse } from "../../../types";
import UpdateProjectModal from "../adminManagementUpdate/UpdateProjectModal";

const { confirm } = Modal;

const Projects = () => {
  const { data: projects, isFetching } = useGetAllProjectsQuery({});
  const [deleteProject] = useDeleteProjectMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const token = useAppSelector(useCurrentToken);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }
  const userRole = user?.role;

  const tableData = projects?.data?.map(
    ({
      _id,
      title,
      image,
      description,
      frontendurl,
      backendurl,
      liveurl,
      frontendTechnology,
      backendTechnology,
      isDeleted,
    }) => ({
      key: _id,
      title,
      image,
      description,
      frontendurl,
      backendurl,
      liveurl,
      frontendTechnology,
      backendTechnology,
      isDeleted
    })
  );

  const columns = [
    {
      title: "Project Name",
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
        const showDeleteConfirm = (projectId: string) => {
          confirm({
            title: "Do you want to delete this project?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone.",
            onOk() {
              handleDelete(projectId);
            },
            onCancel() {
            },
          });
        };

        const handleDelete = async (item: any) => {
          const toastId = toast.loading("Deleting...");
          const projectId = item;

          try {
            const res = (await deleteProject(projectId)) as TResponse<any>;
            if (res.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("Project successfully deleted", { id: toastId });
            }
          } catch (err) {
            toast.error("Something went wrong, project was not deleted.", {
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
    setSelectedProject(item);
    setIsModalVisible(true);
  };

  return (
    <>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
      <UpdateProjectModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        project={selectedProject}
      />
    </>
  );
};

export default Projects;