import React, { useState } from 'react';

type TabProps = {
    tabs: string[];
    onTabChange: (tab: string) => void;
};

const Tabs: React.FC<TabProps> = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className="flex">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 ${
                        activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;