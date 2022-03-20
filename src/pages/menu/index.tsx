import React from 'react';
import RenderPages from '@/components/render-pages';

function Menu() {
  return (
    <RenderPages
      headerProps={{ title: '菜单管理' }}
      contentProps={{
        renderLeft: [
          {
            key: 1,
            title: '新增菜单',
            onClick: () => {},
          },
        ],
        rightOption: {
          placeholder: '请输入',
          onSearch: (value) => {
            console.log(value);
          },
        },
      }}
    >
      2
    </RenderPages>
  );
}

export default Menu;
