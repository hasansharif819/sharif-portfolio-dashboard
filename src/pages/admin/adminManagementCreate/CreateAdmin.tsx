import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useCreateAdminMutation } from "../../../redux/features/admin/admin.api";

const createAdminDefaultValues = {
  name: "sharif",
  email: "sharif@gmail.com",
  password: "123456",
};

const CreateAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const adminData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // console.log("user = ", data);

    const formData = new FormData();

    formData.append("data", JSON.stringify(formData));

    try {
      const res = (await createAdmin(adminData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Admin created Successfully!!!", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to creating admin!!! Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Row justify="center" style={{ padding: "50px 30px" }}>
      <h2>Create Admin</h2>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={createAdminDefaultValues}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="text" name="name" label="Name" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <PHInput type="password" name="password" label="Password" />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
