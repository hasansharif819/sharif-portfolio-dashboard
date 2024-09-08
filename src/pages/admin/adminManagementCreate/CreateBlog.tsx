import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { TResponse } from "../../../types";
import { useCreateBlogMutation } from "../../../redux/features/blogs/blogs.api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import axios from 'axios';

const imgbbAPIKey = "4fb1911cd7fea07ca539c23c89d490db";

const CreateBlog = () => {
  const [createBlog] = useCreateBlogMutation();
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {reset} = useForm();

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

      const blogData = {
        ...data,
        description,
        img: imageUrl,
      };

      const res = (await createBlog(blogData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Blog successfully created", { id: toastId });
        reset()
        setImageFile(null);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="title" label="Blog Title" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="author" label="Author" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
          </Row>

          <div className="quill-description">
            <Col span={24}>
              <label htmlFor="description" className="form-label mb-5">
                Blog Description
              </label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
                formats={[
                  'header', 'font', 'size',
                  'bold', 'italic', 'underline', 'strike', 'blockquote',
                  'list', 'bullet', 'indent',
                  'link', 'image'
                ]}
                className="mb-4 bg-accent text-white"
              />
            </Col>
          </div>

          <div className="file-input">
            <input type="file" accept="image/*" onChange={onImageChange} />
          </div>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateBlog;
