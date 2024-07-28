import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useUpdateSkillMutation } from "../../../redux/features/skills/skills.api";

interface UpdateSkillModalProps {
  visible: boolean;
  onCancel: () => void;
  skill: any | null;
}

const UpdateSkillModal: React.FC<UpdateSkillModalProps> = ({ visible, onCancel, skill }) => {
  const [form] = Form.useForm();
  const [updateSkill] = useUpdateSkillMutation();

  React.useEffect(() => {
    form.setFieldsValue(skill);
  }, [skill, form]);

  const handleUpdate = async (values: any) => {
    if (skill) {
      const toastId = toast.loading("Updating...");
      try {
        const res = (await updateSkill({ id: skill.key, data: values })) as TResponse<any>;
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success("Skill is successfully updated", { id: toastId });
          onCancel();
        }
      } catch (err) {
        toast.error("Something went wrong, skill is not updated.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <Modal
      title="Update Skill"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdate} initialValues={skill || {}}>
        <Form.Item name="name" label="Name"
        >
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category"
        >
          <Input />
        </Form.Item>
        <Form.Item name="img" label="Image URL">
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

export default UpdateSkillModal;
