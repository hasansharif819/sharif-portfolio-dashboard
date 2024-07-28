import {
  Button,
  Modal,
    Table,
    TableColumnsType,
  } from "antd";

import { useDeleteExperienceMutation, useGetAllExperienceQuery } from "../../../redux/features/experience/experience.api";
import UpdateExperienceModal from "../adminManagementUpdate/UpdateExperienceModal";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { TResponse } from "../../../types";
  
  const { confirm } = Modal;
  const Experiences = () => {
    const { data: experiences, isFetching } = useGetAllExperienceQuery({});
    const [deleteExperience] = useDeleteExperienceMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
    const token = useAppSelector(useCurrentToken);

    let user: any;

    if (token) {
      user = verifyToken(token);
    }
    const userRole = user?.role;
    
    const tableData = experiences?.data?.map(
      ({
        _id,
        title,
        description,
        companyName,
        address,
        website,
        joining,
        ending,
        logo,
        isDeleted,
      }) => ({
        key: _id,
        title,
        description,
        companyName,
        address,
        website,
        joining,
        ending,
        logo,
        isDeleted
      })
    );
  
    const columns: TableColumnsType<any> = [
      {
        title: "Experience",
        key: "title",
        dataIndex: "title",
      },
      {
        title: "Company Name",
        key: "companyName",
        dataIndex: "companyName",
      },
      {
        title: "Joining",
        key: "joining",
        dataIndex: "joining",
      },
      {
        title: "Ending",
        key: "ending",
        dataIndex: "ending",
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
          const showDeleteConfirm = (experienceId: string) => {
            confirm({
              title: "Do you want to delete this Experience?",
              icon: <ExclamationCircleOutlined />,
              content: "This action cannot be undone.",
              onOk() {
                handleDelete(experienceId);
              },
              onCancel() {
              },
            });
          };
  
          const handleDelete = async (item: any) => {
            const toastId = toast.loading("Deleting...");
            const experienceId = item;
  
            try {
              const res = (await deleteExperience(experienceId)) as TResponse<any>;
              if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
              } else {
                toast.success("Experience successfully deleted", { id: toastId });
              }
            } catch (err) {
              toast.error("Something went wrong, Experience was not deleted.", {
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
      setSelectedExperience(item);
      setIsModalVisible(true);
    };
  
    return (
      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
        />
        <UpdateExperienceModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          experience={selectedExperience}
        />
      </>
    );
  };
  
  export default Experiences;
  