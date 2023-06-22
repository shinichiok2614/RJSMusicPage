import React from "react";
import ReactPlayer from "react-player";
import "./IntroScreen.css";
import logo from "../images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { login } from "../../apis/auth";
import { saveToken, saveUserInfo } from "../../helpers/storage";
const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    //call api
    login(values)
      .then((data) => {
        //saveToken
        saveToken(data.token);
        //saveUserInfo
        // saveUserInfo({
        //   username: data.username,
        // })
        //redirect to homepage
        navigate("/");
        notification.success({
          message: "login",
          description: "Login successful!",
        });
      })
      .catch((err) => {
        let description = "Something went wrong";
        if (err.response.data && err.response.data.message) {
          description = err.response.data.message;
        }
        console.log(err);
        notification.error({
          message: "Login",
          description,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="heroContainer">
        <div className="videoContainer2">
          <ReactPlayer
            className="react-player"
            url="//www.youtube.com/embed/RK1K2bCg4J8?autoplay=1&mute=1&start=3008"
            width="100%"
            height="100%"
            position="relative"
            overflow="hidden"
            playing={true}
            loop={true}
            muted={true}
          />
        </div>
      </div>
      {/* <div className="titleContainer"> */}
      <img className="heroLogo" src={logo} alt="" />
      {/* <h1 className="tracking-in-expand-fwd">Music Web</h1> */}
      <div className="note-position-1 note-amination">&#9835;</div>
      <div className="note-position-2 note-amination animation-delay-2">
        &#9833;
      </div>
      {/* </div> */}
      <h1 className="titleMusicWeb">Music Web</h1>
      <h1 className="titleLogin">Login</h1>
      <div className="groupTitle">
        <h3> Group member: </h3>
        <h4> 1. Nguyễn Thị Thu Cúc </h4>
        <h4> 2. Trần Nguyễn Minh Tuấn </h4>
      </div>
      <div className="titleForm">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          ></Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
