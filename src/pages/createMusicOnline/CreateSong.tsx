import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { createASong } from "../../apis/track";
import "./CreateSong.css";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function CreateSong() {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    setLoading(true);
    createASong({
      title: values.title,
      src: values.src,
      author: values.author,
      thumbnail: values.thumbnail,
    })
      .then((data) => {
        if (data.status) {
          notification.success({
            message: "Create Song",
            description: "Create song successful!",
          });
        } else {
          notification.error({
            message: "Create Song",
            description: data.message,
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Create Song",
          description: "Create song failed!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
    return;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <>
      <div className="heroContainer">
        <div className="videoContainer2">
          <ReactPlayer
            className="react-player"
            url="//https://www.youtube.com/embed/lf6refTxQs8?autoplay=1&mute=1&start=20"
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
      <h3 className="titleCreateMusic">Create Music</h3>
      <Form
        className="form-container"
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Source"
          name="src"
          rules={[
            {
              required: true,
              message: "Please input your source!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please input your author!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thumbnail"
          name="thumbnail"
          rules={[{ required: true, message: "Please input your thumbnail!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateSong;
