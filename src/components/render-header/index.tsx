import React, { ReactNode } from 'react';
import { RollbackOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { history } from 'umi';
import './index.less';

export interface RenderHeaderProps {
  title?: any;
  backUrl?: null | string;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
}

const RenderHeader = ({ title = null, backUrl = null, center, right, className }: RenderHeaderProps) => {
  return (
    <header
      className={classNames(
        {
          'common-header': true,
        },
        className,
      )}
    >
      <h2>
        {backUrl ? (
          <RollbackOutlined
            onClick={() => {
              history.push(backUrl);
            }}
          />
        ) : null}
        {title}
      </h2>
      <div className="header-center">{center}</div>
      <div className="header-right">{right}</div>
    </header>
  );
};
export default RenderHeader;
