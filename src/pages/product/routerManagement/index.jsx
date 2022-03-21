import React from 'react';
import { handleGetDataList, handleDeleteDataItem, handleAddDataList } from './utils/ajaxAction';
import RenderContent from '@/components/render-content';
import RenderHeader from '@/components/render-header';
import { Table, Space, Popconfirm } from 'antd';
import renderDrawer from './components/renderDrawer';
import './index.less';

export default class ResourceManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      totalPage: 1,
      count: 0,
      currentPage: 1,
      visible: false,
      title: '新增路由',
      dataItemId: null,
    };
    this.handleGetDataList = handleGetDataList.bind(this);
    this.handleDeleteDataItem = handleDeleteDataItem.bind(this);
    this.handleAddDataList = handleAddDataList.bind(this);

    this.renderDrawer = renderDrawer.bind(this);
  }

  componentDidMount() {
    // 获取产品列表
    this.handleGetDataList();
  }

  renderTable() {
    const columns = [
      {
        title: '产品编码',
        dataIndex: 'productCode',
        key: 'productCode',
      },
      {
        title: '路由名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '路由路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '创建人',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 180,
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: 180,
      },
      {
        title: '操作',
        key: 'action',
        width: 140,
        render: (text, record) => {
          return (
            <Space size="middle">
              <a onClick={() => this.handleEditData(record)}>编辑</a>
              <Popconfirm title="您确定要删除吗?" onConfirm={() => this.handleDeleteDataItem(record.id)} okText="是" cancelText="否">
                <a>删除</a>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.state.dataSource}
        pagination={{
          showQuickJumper: true,
          total: this.state.count,
          defaultCurrent: this.state.currentPage,
          onChange: (page, pageSize) => {
            this.setState({ currentPage: page }, () => {
              this.handleGetDataList();
            });
          },
        }}
      />
    );
  }

  async handleGetFormData() {
    const request = await this.formRef.validateFields();
    const { productCode } = this.props.location.query;
    request.productCode = productCode;

    if (this.state.dataItemId) {
      request.id = this.state.dataItemId;
    }
    this.handleAddDataList(request);
  }

  handleEditData(record) {
    this.setState(
      {
        visible: true,
        title: '编辑路由',
        dataItemId: record.id,
      },
      () => {
        this.formRef.setFieldsValue(record);
      },
    );
  }

  render() {
    return (
      <div className="router-management">
        <RenderHeader title="资源管理" backUrl="/product" />
        <RenderContent
          renderLeft={[
            {
              key: 1,
              title: '新增路由',
              onClick: () => {
                this.formRef?.resetFields();
                this.setState({
                  dataItemId: null,
                  visible: true,
                });
              },
            },
          ]}
        >
          {this.renderTable()}
        </RenderContent>
        {this.renderDrawer()}
      </div>
    );
  }
}
