import React, { createContext, useContext, useState, useEffect } from 'react';

const OpenAPIContext = createContext();

export const OpenAPIProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = process.env.REACT_APP_API + "openapi.json";
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Check if data is already fetched
    if (!data) {
      fetchData();
    }
  }, [data]);

  return (
    <OpenAPIContext.Provider value={{ data, setData }}>
      {children}
    </OpenAPIContext.Provider>
  );
};

export const useOpenAPI = () => {
  const context = useContext(OpenAPIContext);
  if (!context) {
    console.error('useOpenAPI must be used within an OpenAPIProvider');
  }

  return {
    getData: async () => {
      if (!context.data) {
        // If data is not available, wait for it to be loaded
        await new Promise((resolve) => {
          const checkData = () => {
            if (context.data) {
              resolve();
            } else {
              setTimeout(checkData, 100);
            }
          };

          checkData();
        });
      }

      return context.data;
    },
    setData: context.setData,
  };
};
