"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Tag, message, Tooltip, Typography } from 'antd';
// import { ColumnsType } from 'antd/es/table';
import { SendOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Sidebar from '../components/Sidebar';

const { Title, Text } = Typography;

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingCampaignId, setSendingCampaignId] = useState(null);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      message.error('Failed to load campaigns.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleSendCampaign = async (campaignId) => {
    setSendingCampaignId(campaignId);
    message.loading({ content: 'Dispatching campaign...', key: 'dispatching' });

    try {
      const response = await fetch(`/api/campaigns/${campaignId}/send`, { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        message.success({ content: 'Campaign dispatch initiated successfully!', key: 'dispatching', duration: 2 });
        fetchCampaigns();
      } else {
        throw new Error(result.message || 'Failed to send campaign.');
      }
    } catch (error) {
      message.error({ content: error.message, key: 'dispatching' });
    } finally {
      setSendingCampaignId(null);
    }
  };

  const getStatusTagColor = (status) => {
    switch (status) {
      case 'draft': return 'blue';
      case 'queued': return 'gold';
      case 'sending': return 'processing';
      case 'sent': return 'green';
      case 'completed_with_errors': return 'orange';
      case 'error': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Message Snippet',
      dataIndex: 'message',
      key: 'message',
      render: (text) => (
        <Tooltip title={text}>
          <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: text }}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Intent',
      dataIndex: 'intent',
      key: 'intent',
      render: (intent) => intent || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusTagColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Audience',
      dataIndex: 'audienceSize',
      key: 'audienceSize',
    },
    {
      title: 'Sent',
      dataIndex: 'sentCount',
      key: 'sentCount',
    },
    {
      title: 'Failed',
      dataIndex: 'failedCount',
      key: 'failedCount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        record.status === 'draft' && (
          <Tooltip title="Send Campaign">
            <Button
              icon={<SendOutlined />}
              onClick={() => handleSendCampaign(record._id)}
              loading={sendingCampaignId === record._id}
              disabled={sendingCampaignId && sendingCampaignId !== record._id}
              type="primary"
              style={{ marginRight: 8 }}
            >
              Send
            </Button>
          </Tooltip>
        )
      ),
    },
  ];

  return (
     <div className='flex flex-row'>
        <Sidebar/>

    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Campaigns</Title>
        <Button icon={<ReloadOutlined />} onClick={fetchCampaigns} loading={loading}>Refresh</Button>
      </div>
      <Table
        columns={columns}
        dataSource={campaigns}
        loading={loading}
        rowKey="_id"
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
    </div>
  );
};

export default Campaign;
