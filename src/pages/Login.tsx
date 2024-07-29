import { Button, Col, Row, Space } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: "sharif@gmail.com",
    password: "123456",
  };

  // const defaultValues = {
  //   email: "youremail@gmail.com",
  //   password: "your password",
  // };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      // const res = await login(userInfo);

      const user = verifyToken(res.data.accessToken) as TUser;
      // console.log("user = ", user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // console.log("error = ", err)
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <h2 style={{ marginBottom: "20px" }}>Login</h2>
      <Col span={12}>
        <Row justify="center" align="middle">
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput type="email" name="email" label="Your Email" />
            <PHInput type="password" name="password" label="Password" />
            <Space>
              <Button htmlType="submit">Login</Button>
            </Space>
          </PHForm>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
