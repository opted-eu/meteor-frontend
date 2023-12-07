import React, { useState, useEffect } from "react";
import { useOpenAPI } from "./APISpecs";

const TypeDescription = ({ dgraphType }) => {
    const openApi = useOpenAPI();
    const [loading, setLoading] = useState(true);
    const [schema, setSchema] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await openApi.getData();
          setSchema(data.components.schemas[dgraphType]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [dgraphType, openApi]);
  
    if (loading) {
      return "Loading...";
    }
  
    if (!schema || !schema.description) {
      return `No description available for ${dgraphType}`;
    }
  
    return schema.description;
  };
  

export default TypeDescription;