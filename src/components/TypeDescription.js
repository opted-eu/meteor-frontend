import React, { useState, useEffect } from "react";
import { useOpenAPI } from "./APISpecs";

const Required = () => {
    return (
        <span> *</span>
    )
}

const Optional = () => {
    return (
        <span className="add_entry_grey"> (optional)</span>
    )
}

const TypeDescription = ({ dgraphType, fieldName, altText }) => {
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

    function capitalizeFirstLetter(string) {
        let str = string.charAt(0).toUpperCase() + string.slice(1);
        str = str.replace("_", " ");
        return str;
    }

    if (typeof(fieldName) != 'undefined'){
        let ret = ''
        if (altText){
            ret = altText + dgraphType + '?'
        } else {
            //console.log(fieldName)
            if (!schema || !schema['properties'] || !schema['properties'][fieldName] || !schema['properties'][fieldName]['description']) {
                ret = capitalizeFirstLetter(fieldName)
            } else {
                ret = capitalizeFirstLetter(schema['properties'][fieldName]['description'])
            }
        }
        let req = false
        if (schema && schema.required && schema.required.includes(fieldName)){
            req = true
        }
        return (
            <>
                {ret}
                {req &&
                    <Required/>
                }
                {!req &&
                    <Optional/>
                }
                </>
            )
    } else {
        if (!schema || !schema.description) {
            return `No description available for ${dgraphType}`;
        }
        return schema.description;
    }

};
  

export default TypeDescription;