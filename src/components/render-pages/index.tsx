import React, { ReactChild } from 'react';
import RenderContent, { RenderContentProps } from '../render-content';
import RenderHeader, { RenderHeaderProps } from '../render-header';
import classNames from 'classnames';
import './index.less';

interface Props {
  className?: string;
  children?: ReactChild;
  headerProps?: RenderHeaderProps;
  contentProps?: RenderContentProps;
}

function RenderPages({ children, headerProps, contentProps, className }: Props) {
  return (
    <div
      className={classNames(
        {
          'common-render-pages': true,
        },
        className,
      )}
    >
      <RenderHeader {...headerProps} />
      <RenderContent {...contentProps}>{children}</RenderContent>
    </div>
  );
}

export default RenderPages;
