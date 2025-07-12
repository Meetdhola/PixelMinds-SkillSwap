import React from 'react';

const TabsContext = React.createContext();

export function Tabs({ value, onValueChange, children, className = '' }) {
  const contextValue = React.useMemo(
    () => ({
      activeTab: value,
      onValueChange,
    }),
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={`tabs ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-2 mb-6 rounded-2xl bg-white/30 backdrop-blur-md shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', children }) {
  const { activeTab, onValueChange } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  const handleClick = () => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`py-3 font-semibold text-lg rounded-2xl transition-all duration-300 ${
        isActive ? 'bg-white text-indigo-600' : 'text-white'
      } ${className}`}
      type="button"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children }) {
  const { activeTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <div
      className={`${isActive ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity duration-300 ${className}`}
      role="tabpanel"
      hidden={!isActive}
    >
      {children}
    </div>
  );
}
