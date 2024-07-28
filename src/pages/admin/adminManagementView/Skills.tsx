import {
  Button,
  Modal,
    Table,
    TableColumnsType,
  } from "antd";

import { useDeleteSkillMutation, useGetAllSkillsQuery } from "../../../redux/features/skills/skills.api";
import UpdateSkillModal from "../adminManagementUpdate/UpdateSkillModal";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { TResponse } from "../../../types";

  
  const { confirm } = Modal;
  const Skills = () => {
    const { data: skills, isFetching } = useGetAllSkillsQuery({});
    const [deleteSkill] = useDeleteSkillMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
    const token = useAppSelector(useCurrentToken);

    let user: any;

    if (token) {
      user = verifyToken(token);
    }
    const userRole = user?.role;

    
    const tableData = skills?.data?.map(
      ({
        _id,
        name,
        category,
        img,
        isDeleted,
      }) => ({
        key: _id,
        name,
        category,
        img,
        isDeleted
      })
    );
  
    const columns: TableColumnsType<any> = [
      {
        title: "Skill Name",
        key: "name",
        dataIndex: "name",
      },
      {
        title: "Category",
        key: "category",
        dataIndex: "category",
      },
      // {
      //   title: "Image",
      //   key: "img",
      //   dataIndex: "img",
      // },
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
          const showDeleteConfirm = (skillId: string) => {
            confirm({
              title: "Do you want to delete this Skill?",
              icon: <ExclamationCircleOutlined />,
              content: "This action cannot be undone.",
              onOk() {
                handleDelete(skillId);
              },
              onCancel() {
              },
            });
          };
  
          const handleDelete = async (item: any) => {
            const toastId = toast.loading("Deleting...");
            const skillId = item;
  
            try {
              const res = (await deleteSkill(skillId)) as TResponse<any>;
              if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
              } else {
                toast.success("Skill successfully deleted", { id: toastId });
              }
            } catch (err) {
              toast.error("Something went wrong, Skill was not deleted.", {
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
      setSelectedSkill(item);
      setIsModalVisible(true);
    };
  
    return (
      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
        />
        <UpdateSkillModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          skill={selectedSkill}
        />
      </>
    );
  };
  
  export default Skills;
  