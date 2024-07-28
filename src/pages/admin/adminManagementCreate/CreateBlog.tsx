import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { TResponse } from "../../../types";
import { useCreateBlogMutation } from "../../../redux/features/blogs/blogs.api";

const createBlogDefaultValues = {
  title: "Blog Title",
  description: "Description",
  img: "https://image-url.com",
};

const CreateBlog = () => {
  const [createBlog] = useCreateBlogMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const blogData = {
      ...data,
    };

    // console.log(projectData);

    try {
      const res = (await createBlog(blogData)) as TResponse<any>;
      // console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Blog successfully created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={createBlogDefaultValues}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="title" label="Blog Title" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="description" label="Blog Description" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="img" label="Image" />
            </Col>
          </Row>
          
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateBlog;
