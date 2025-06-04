import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Typography,
  Space,
} from "antd";
import { BsStars } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { getToken } from "../utils/getToken.js";

const { Title } = Typography;
const { Option } = Select;

const CreateCampaigns = () => {
  const [segmentRules, setSegmentRules] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
    const token = getToken();
  useEffect(() => {
    const fetchSegmentRules = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/segment",{
            headers:{
                'x-access-token': token,
            }
        });
        // console.log(res.data.data);

        
        if (res.data.success) setSegmentRules(res.data.data);
        else message.error("Failed to fetch segment rules");
      } catch (err) {
        console.error(err);
        message.error("Error fetching segment rules");
      }
    };

    const fetchCustomers = async () => {

      try {
        const token = getToken();
        const res = await axios.get("http://localhost:8080/api/v1/customers",{
            headers:{
                'x-access-token': token,
            }
        });
        // const data = await res.json();
        console.log(res.data.data);
        if (res.data.success) setCustomers(res.data.data);
        else message.error("Failed to fetch customers");
      } catch (err) {
        console.error(err);
        message.error("Error fetching customers");
      }
    };

    fetchSegmentRules();
    fetchCustomers();
  }, []);

  const generateMessage = async () => {
    const { name, ruleId } = form.getFieldsValue();
    const rule = segmentRules.find((r) => r._id === ruleId);
    if (!rule) return message.error("Invalid rule selected");

    const ruleText = rule.conditions
      .map((c) => `${c.field} ${c.op} ${c.value}`)
      .join(` ${rule.logicType} `);

    try {
      const res = await fetch("/api/generateMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rule: ruleText }),
      });
      const data = await res.json();
      if (data.success) {
        form.setFieldsValue({ message: data.message });
        message.success("Message generated!");
        alert("Campaign created successfully");
      } else {
        message.error("Failed to generate message");
      }
    } catch (err) {
      console.error(err);
      message.error("Error generating message");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
        const token = getToken();
        console.log(values);
        const {name, ruleId, message, intent} = values;
        const payload = {
            compaignDetails:{
                name,
                ruleId,
                message,
                intent,
                status : "draft"
            }
        }
      const res = await axios.post('http://localhost:8080/api/v1/compaign', payload, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await res.json();
      if (data.success) {
        message.success("Campaign created successfully");
        form.resetFields();
      } else {
        message.error("Failed to create campaign");
      }
    } catch (err) {
      console.error(err);
      message.error("Error creating campaign");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row ">
        <Sidebar/>
    <div className="p-8 w-auto max-w-4xl mx-auto">
      <Title level={2}>Create Campaign</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Campaign Name"
          rules={[{ required: true, message: "Campaign name is required" }]}
        >
          <Input placeholder="Enter campaign name" />
        </Form.Item>

        <Form.Item
          name="ruleId"
          label="Segment Rule"
          rules={[{ required: true, message: "Please select a segment rule" }]}
        >
          <Select placeholder="Select rule">
            {segmentRules.map((rule) => (
              <Option key={rule._id} value={rule._id}>
                {/* {rule.logicType} - {rule.conditions.map((c) => `${c.field} ${c.op} ${c.value}`).join(", ")} */}
                {rule.rule}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="customerIds"
          label="Customers"
          rules={[{ required: true, message: "Select at least one customer" }]}
        >
          <Select mode="multiple" placeholder="Select customers">
            {customers.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name} ({c.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Message content is required" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter message" />
        </Form.Item>

        <Button onClick={generateMessage} icon={<BsStars />} className="mb-4">
          Generate by AI
        </Button>

        <Form.Item name="intent" label="Intent (optional)">
          <Input placeholder="E.g., promotion, win-back" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Campaign
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default CreateCampaigns;
