import React, { FC, useState } from "react";

interface TabProps {
  children: React.ReactNode;
  title: string;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  tabsClassname?: string;
  contentClassname?: string;
  containerClassname?: string;
}

const Tabs: FC<TabsProps> & {
  Tab: FC<{ children: React.ReactNode; title: string }>;
} = ({ children, tabsClassname, contentClassname, containerClassname }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={`flex flex-col w-full ${containerClassname}`}>
      <div className={`flex gap-2 flex-wrap max-w-full ${tabsClassname}`}>
        {children.map((child, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md hover:shadow-md transition-all border-1 ${
              selectedTab === index && "bg-primary"
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className={`mt-4 ${contentClassname}`}>{children[selectedTab]}</div>
    </div>
  );
};

Tabs.Tab = ({ children }) => {
  return <>{children}</>;
};

export default Tabs;
