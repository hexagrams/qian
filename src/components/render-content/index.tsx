import React, { ReactChild } from 'react';
import { Button, Input, ButtonProps } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import classnames from 'classnames';
import './index.less';

const { Search } = Input;

interface otherProps extends ButtonProps {
  [other: string]: any;
}

export interface RenderContentProps {
  children?: ReactChild;
  className?: any;
  renderLeft?: otherProps[];
  rightOption?: SearchProps;
}
const RenderContent = ({
  children,
  className,
  renderLeft = [],
  rightOption,
}: RenderContentProps) => {
  return (
    <main
      className={classnames(
        {
          'common-content': true,
        },
        className,
      )}
    >
      {(renderLeft && renderLeft.length) || rightOption ? (
        <header>
          <div className="left">
            {renderLeft.map((item, index) => (
              <Button className="content-btn" type="primary" {...item}>
                {item.title}
              </Button>
            ))}
          </div>
          <div className="right">
            {rightOption ? (
              <Search className="right-search" allowClear enterButton="搜索" {...rightOption} />
            ) : null}
          </div>
        </header>
      ) : null}

      {children}
    </main>
  );
};
export default RenderContent;
