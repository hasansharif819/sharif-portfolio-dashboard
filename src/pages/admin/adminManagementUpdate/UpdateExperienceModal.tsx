import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useUpdateExperienceMutation } from "../../../redux/features/experience/experience.api";
import TextArea from "antd/es/input/TextArea";

interface UpdateExperienceModalProps {
  visible: boolean;
  onCancel: () => void;
  experience: any | null;
}

const UpdateExperienceModal: React.FC<UpdateExperienceModalProps> = ({ visible, onCancel, experience }) => {
  const [form] = Form.useForm();
  const [updateExperience] = useUpdateExperienceMutation();

  React.useEffect(() => {
    form.setFieldsValue(experience);
  }, [experience, form]);

  const handleUpdate = async (values: any) => {
    if (experience) {
      const toastId = toast.loading("Updating...");
      try {
        const res = (await updateExperience({ id: experience.key, data: values })) as TResponse<any>;
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success("Experience is successfully updated", { id: toastId });
          onCancel();
        }
      } catch (err) {
        toast.error("Something went wrong, Experience is not updated.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <Modal
      title="Update Experience"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdate} initialValues={experience || {}}>
        <Form.Item name="title" label="Title"
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description"
        >
          <TextArea />
        </Form.Item>
        <Form.Item name="companyName" label="Company Name"
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address"
        >
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website URL"
        >
          <Input />
        </Form.Item>
        <Form.Item name="joining" label="Joining"
        >
          <Input />
        </Form.Item>
        <Form.Item name="ending" label="Ending"
        >
          <Input />
        </Form.Item>
        <Form.Item name="logo" label="Logo URL">
          <Input />
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

export default UpdateExperienceModal;
