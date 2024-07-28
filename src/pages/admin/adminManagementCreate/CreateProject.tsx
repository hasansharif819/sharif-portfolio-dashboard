import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { TResponse } from "../../../types";
import { useCreateProjectMutation } from "../../../redux/features/projects/projects.api";

const createProjectDefaultValues = {
    title: "Project Name",
    description: "Project Description",
    frontendurl: "https://frontend-url.com",
    backendurl: "https://backend-url.com",
    liveurl: "https://live-url.com",
    frontendTechnology: "Frontend Technology",
    backendTechnology: "Backend Technology",
    image: "https://image-url.com",
};

const CreateProject = () => {
  const [createProject] = useCreateProjectMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const projectData = {
      ...data,
    };

    try {
      const res = (await createProject(projectData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Project successfully created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={createProjectDefaultValues}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="title" label="Title" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="description" label="Description" />
            </Col>
          </Row>
          <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="frontendurl" label="Frontend URL" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="backendurl" label="Backend URL" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="liveurl" label="Live URL" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="frontendTechnology" label="Frontend Technology" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="backendTechnology" label="Backend Technology" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="image" label="Image" />
            </Col>
          </Row>
          
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateProject;
