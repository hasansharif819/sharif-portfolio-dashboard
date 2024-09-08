import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { TResponse } from "../../../types";
import { useCreateSkillMutation } from "../../../redux/features/skills/skills.api";
import axios from "axios";
import { useState } from "react";
const imgbbAPIKey = "4fb1911cd7fea07ca539c23c89d490db";

const createSkillDefaultValues = {
  name: "Skill",
  category: "Frontend",
  img: "https://image-url.com",
};

const CreateSkill = () => {
  const [createSkill] = useCreateSkillMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {reset} = useForm({
    defaultValues: createSkillDefaultValues,
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

    let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToImgbb(imageFile);
      }

      const skillData = {
        ...data,
        img: imageUrl,
      };

    try {
      const res = (await createSkill(skillData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Skill successfully created", { id: toastId });
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
        <PHForm onSubmit={onSubmit} defaultValues={createSkillDefaultValues}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="name" label="Name" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="category" label="Category" />
            </Col>
          </Row>
          <Row gutter={8}>
          <div className="file-input">
            <input type="file" accept="image/*" onChange={onImageChange} />
          </div>
          </Row>
          
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateSkill;