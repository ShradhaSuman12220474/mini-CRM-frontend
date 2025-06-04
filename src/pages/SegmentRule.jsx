import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { getToken } from "../utils/getToken.js";
import Sidebar from "../components/Sidebar.jsx";
import axios from "axios";
import { baseURL } from "../utils/config.js";
const { Option } = Select;

const SegmentRule = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    setLoading(true);
    console.log(values);

    const { logicType, conditions } = values;

  // Convert to human-readable expression
    const expression = conditions
        .map((cond) => `${cond.field} ${cond.op} ${cond.value}`)
        .join(` ${logicType} `);

    const payload = {
        "segment_rule": {
            "rule": expression,
        
        }       
    };
    // console.log("Payload being sent:", JSON.stringify(payload));
    // console.log("expression",payload.expression);

    try {
        const token = getToken();
        console.log(token);

      const response = await axios.post(`${baseURL}/api/v1/segment`, payload,{
        headers: {
            
            'x-access-token': token,
        },
      });

    //   const data = await response.json();
      console.log(response.data);

      if (response.data.success === true) {
        message.success("Segment rule created successfully!");
        alert("Segment Created Successfully");
        form.resetFields();
      } else {
        message.error("Failed to create segment rule.");
      }
    } catch (error) {
      console.error("Error creating segment rule:", error);
      message.error("An error occurred while creating the segment rule.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-row">
        <Sidebar/>

    <div className="h-screen flex flex-col px-10 mt-10 text-xl">
      <h1 className="text-4xl font-bold mb-6">Create Segment Rule</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-w-3xl"
      >
        <Form.Item
          label="Logic Type"
          name="logicType"
          rules={[{ required: true, message: "Please select a logic type" }]}
        >
          <Select placeholder="Select logic type">
            <Option value="AND">AND</Option>
            <Option value="OR">OR</Option>
          </Select>
        </Form.Item>

        <Form.List name="conditions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-4 mb-4 items-start">
                  <Form.Item
                    {...restField}
                    name={[name, "field"]}
                    rules={[{ required: true, message: "Please enter a field" }]}
                  >
                    <Input placeholder="Field (e.g., spend, visits)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "op"]}
                    rules={[{ required: true, message: "Please enter an operator" }]}
                  >
                    <Input placeholder="Operator (e.g., >, <, =)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Please enter a value" }]}
                  >
                    <Input placeholder="Value (e.g., 10000, 3)" />
                  </Form.Item>
                  <Button danger type="text" onClick={() => remove(name)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()}>
                  + Add Condition
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Segment Rule
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default SegmentRule;
