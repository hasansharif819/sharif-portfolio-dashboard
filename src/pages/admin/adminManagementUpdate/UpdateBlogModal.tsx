import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useUpdateBlogMutation } from "../../../redux/features/blogs/blogs.api";

interface UpdateBlogModalProps {
  visible: boolean;
  onCancel: () => void;
  blog: any | null;
}

const UpdateBlogModal: React.FC<UpdateBlogModalProps> = ({ visible, onCancel, blog }) => {
  const [form] = Form.useForm();
  const [updateBlog] = useUpdateBlogMutation();

  React.useEffect(() => {
    form.setFieldsValue(blog);
  }, [blog, form]);

  const handleUpdate = async (values: any) => {
    if (blog) {
      const toastId = toast.loading("Updating...");
      try {
        const res = (await updateBlog({ id: blog.key, data: values })) as TResponse<any>;
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success("Blog is successfully updated", { id: toastId });
          onCancel();
        }
      } catch (err) {
        toast.error("Something went wrong, Blog is not updated.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <Modal
      title="Update Blog"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdate} initialValues={blog || {}}>
        <Form.Item name="title" label="Title"
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description"
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

export default UpdateBlogModal;
