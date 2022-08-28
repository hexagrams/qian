import { PlusOutlined } from '@ant-design/icons';
import {
  ProTable,
  PageContainer,
  ModalForm,
  ProColumns,
  ProFormText,
  ProFormTextArea,
  ActionType,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Popconfirm, Button, message } from 'antd';
import { useRef, useState } from 'react';
import { request } from 'umi';

interface GithubIssueItem {
  id: number;
  name: string;
  title: string;
  url: string;
  activePath: string;
  createdAt: string;
  updatedAt: string;
}

export default () => {
  const [modalFormTitle, setModalFormTitle] = useState('新建产品');
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [currenuItem, setCurrentItem] = useState<GithubIssueItem>();
  const ref = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const columns: Array<ProColumns<GithubIssueItem>> = [
    {
      title: '产品code',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '激活路由',
      dataIndex: 'activePath',
    },
    // {
    //   title: '静态资源',
    //   dataIndex: 'url',
    // },
    // {
    //   title: '静态资源路径',
    //   dataIndex: 'publicPath',
    // },
    {
      title: '页面标题',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      key: 'showTime',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="link"
          onClick={() => {
            setCurrentItem(record);
            setModalFormTitle('编辑产品');
            setModalFormVisible(true);
            setTimeout(() => {
              formRef.current && formRef.current.setFieldsValue(record);
            });
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="popconfirm"
          title={`确认删除吗?`}
          okText="是"
          cancelText="否"
          onConfirm={async () => {
            const response = await request(`/api/productManage/productManagement/${record.id}`, {
              method: 'delete',
            });
            if (response) {
              message.success(response.message);
              ref.current && ref.current.reload();
            }
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer
      ghost
      header={{
        title: '产品管理',
      }}
    >
      <ProTable<GithubIssueItem>
        columns={columns}
        options={{
          search: {
            name: 'keyWord',
          },
        }}
        actionRef={ref}
        search={false}
        request={async (params) => {
          const response = await request('/api/productManage/productManagement', {
            params,
          });
          return {
            total: response?.data?.count,
            success: response?.success,
            data: response?.data?.dataList || [],
          };
        }}
        pagination={{
          pageSize: 10,
        }}
        rowKey="id"
        dateFormatter="string"
        toolBarRender={() => [
          <ModalForm
            title={modalFormTitle}
            visible={modalFormVisible}
            onVisibleChange={(visible) => {
              if (!visible) {
                formRef.current && formRef.current.resetFields();
              }
              setModalFormVisible(visible);
            }}
            formRef={formRef}
            trigger={
              <Button
                type="primary"
                onClick={() => {
                  setModalFormTitle('新建产品');
                }}
              >
                <PlusOutlined />
                新建产品
              </Button>
            }
            onFinish={async (params: GithubIssueItem) => {
              const data = params;
              if (currenuItem && modalFormTitle === '编辑产品') {
                data.id = currenuItem.id;
              }
              const response = await request('/api/productManage/productManagement', {
                method: 'post',
                data,
              });
              ref.current && ref.current.reload();
              message.success(response?.message);
              return true;
            }}
          >
            <ProFormText
              name="name"
              label="产品code"
              tooltip="微应用唯一标识"
              placeholder="请输入"
              disabled={modalFormTitle === '编辑产品'}
              rules={[{ required: true, message: '请输入' }]}
            />
            <ProFormText
              name="activePath"
              label="激活路由"
              placeholder="请输入"
              tooltip="识别到此路由加载子应用 例：/homePage"
              rules={[{ required: true, message: '请输入' }]}
            />
            <ProFormText
              name="publicPath"
              label="静态资源路径"
              placeholder="请输入"
              rules={[{ required: true, message: '请输入' }]}
            />
            <ProFormTextArea
              name="url"
              label="静态资源"
              placeholder="请输入"
              tooltip="微应用静态资源对应的 cdn 地址"
              rules={[{ required: true, message: '请输入' }]}
            />
            <ProFormText name="title" label="页面标题" placeholder="请输入" />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};
