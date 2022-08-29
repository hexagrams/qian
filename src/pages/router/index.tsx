import { useEffect, useRef, useState, useCallback } from 'react';
import { request } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './index.less';

export interface RouterItem {
  id?: number;
  code?: string;
  routerConfig: string;
  createdAt?: string;
  updatedAt?: string;
}
export default () => {
  const [routerItem, setRouterItem] = useState<RouterItem>();
  const ref = useRef<HTMLDivElement>(null);
  const jsoneditor = useRef<JSONEditor>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = `${document.body.offsetHeight - 188}px`;
    const JSON_EDITOR = new JSONEditor(ref.current);
    jsoneditor.current = JSON_EDITOR;
    JSON_EDITOR.setMode('code');
  }, []);

  useEffect(() => {
    request('/api/productRouter/productRouterList', {
      params: {
        code: 'test',
      },
    }).then((res) => {
      const obj = res?.data?.dataList?.[0] || {};
      setRouterItem(obj);
      if (jsoneditor.current && obj.routerConfig) {
        const dataObj = JSON.parse(obj.routerConfig);
        jsoneditor.current.set(dataObj);
      }
    });
  }, [jsoneditor]);

  const handleAddRouter = useCallback(async () => {
    if (!jsoneditor.current) return;
    const data = jsoneditor.current.getText();
    const resquestData: RouterItem = {
      code: 'test',
      routerConfig: data,
    };
    if (routerItem && routerItem?.id) {
      resquestData.id = routerItem.id;
    }
    const response = await request('/api/productRouter/productRouterList', {
      method: 'POST',
      data: resquestData,
    });
    message.success(response.message);
  }, [routerItem]);

  const handleReset = async () => {
    if (jsoneditor.current && routerItem && routerItem.routerConfig) {
      jsoneditor.current.set(JSON.parse(routerItem.routerConfig));
    }
  };

  return (
    <PageContainer
      className="router-container"
      ghost
      header={{
        title: '菜单管理',
      }}
      footer={[
        <Button key="1" onClick={handleReset}>
          重置
        </Button>,
        <Button key="2" type="primary" onClick={handleAddRouter}>
          提交
        </Button>,
      ]}
    >
      <div ref={ref} className="editor-container" />
    </PageContainer>
  );
};
