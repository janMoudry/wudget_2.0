import React from "react";

interface BooleanShowProps {
  cond: boolean;
  children: [
    React.ReactElement<{ children: React.ReactNode }>,
    React.ReactElement<{ children: React.ReactNode }>
  ];
}

const BooleanShow: React.FC<BooleanShowProps> & {
  True: React.FC<{ children: React.ReactNode }>;
  False: React.FC<{ children: React.ReactNode }>;
} = ({ cond, children }) => {
  let childToRender = null;

  children.forEach((child, index) => {
    if (cond && index === 0) {
      childToRender = child;
    } else if (!cond && index === 1) {
      childToRender = child;
    }
  });

  return <>{childToRender}</>;
};

BooleanShow.True = ({ children }) => {
  return <>{children}</>;
};

BooleanShow.False = ({ children }) => {
  return <>{children}</>;
};

export default BooleanShow;
