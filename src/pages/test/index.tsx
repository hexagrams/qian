import React, { useRef } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, PageContainer, TableDropdown, ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer
      ghost
      header={{
        title: document.title,
        breadcrumb: {},
      }}
    >
      <ProTable
        search={false}
        actionRef={actionRef}
        cardBordered
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
