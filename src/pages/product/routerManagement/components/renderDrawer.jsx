import { Form, Input, Button, Drawer, Col, Row } from 'antd';

export default function renderDrawer() {
  const { visible, title } = this.state;
  return (
    <Drawer
      className="router-drawer"
      title={title}
      width={500}
      onClose={() => {
        this.setState({
          visible: false,
        });
      }}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => {
              this.setState({
                visible: false,
              });
            }}
            style={{ marginRight: 8 }}
          >
            取消
          </Button>
          <Button onClick={() => this.handleGetFormData()} type="primary">
            保存
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        ref={(ref) => {
          this.formRef = ref;
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="name" label="路由名称" rules={[{ required: true, message: '请输入' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="path" label="路由路径" rules={[{ required: true, message: '请输入' }]}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
