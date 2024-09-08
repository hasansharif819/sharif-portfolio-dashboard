import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { TResponse } from "../../../types";
import { useCreateProjectMutation } from "../../../redux/features/projects/projects.api";
import axios from 'axios';
import { useState } from "react";

const imgbbAPIKey = "4fb1911cd7fea07ca539c23c89d490db";

const createProjectDefaultValues = {
  title: "Project Name",
  description: "Project Description",
  frontendurl: "https://frontend-url.com",
  backendurl: "https://backend-url.com",
  liveurl: "https://live-url.com",
  frontendTechnology: "Frontend Technology",
  backendTechnology: "Backend Technology",
  image: "",
};

const CreateProject = () => {
  const [createProject] = useCreateProjectMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {reset} = useForm({
    defaultValues: createProjectDefaultValues,
  });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImageToImgbb = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToImgbb(imageFile);
      }

      const projectData = {
        ...data,
        image: imageUrl,
      };

      const res = (await createProject(projectData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Project successfully created", { id: toastId });
        reset();
        setImageFile(null);
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
          </Row>

          <div className="file-input">
            <input type="file" accept="image/*" onChange={onImageChange} />
          </div>
          
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateProject;

