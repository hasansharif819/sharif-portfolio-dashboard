// UpdateProjectModal.tsx
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "sonner";
import { useUpdateProjectMutation } from "../../../redux/features/projects/projects.api";
import { TResponse } from "../../../types";
import TextArea from "antd/es/input/TextArea";

interface UpdateProjectModalProps {
  visible: boolean;
  onCancel: () => void;
  project: any | null;
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({ visible, onCancel, project }) => {
  const [form] = Form.useForm();
  const [updateProject] = useUpdateProjectMutation();

  React.useEffect(() => {
    form.setFieldsValue(project);
  }, [project, form]);

  const handleUpdate = async (values: any) => {
    if (project) {
      const toastId = toast.loading("Updating...");
      try {
        const res = (await updateProject({ id: project.key, data: values })) as TResponse<any>;
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success("Project successfully updated", { id: toastId });
          onCancel();
        }
      } catch (err) {
        toast.error("Something went wrong, project is not updated.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <Modal
      title="Update Project"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdate} initialValues={project || {}}>
        <Form.Item name="title" label="Title"
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description"
        >
          <TextArea />
        </Form.Item>
        <Form.Item name="frontendurl" label="Frontend URL">
          <Input />
        </Form.Item>
        <Form.Item name="backendurl" label="Backend URL">
          <Input />
        </Form.Item>
        <Form.Item name="liveurl" label="Live URL">
          <Input />
        </Form.Item>
        <Form.Item name="frontendTechnology" label="Frontend Technology"
            >
            <TextArea />
            </Form.Item>
            <Form.Item name="backendTechnology" label="Backend Technology"
            >
            <TextArea />
            </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProjectModal;
