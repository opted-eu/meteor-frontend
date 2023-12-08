import React, {useEffect, useState} from "react";
import { useOpenAPI } from "./APISpecs";

const Version = () => {

    const openApi = useOpenAPI();
    const [loading, setLoading] = useState(true);
    const [apiVersion, setApiVersion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await openApi.getData();
            setApiVersion(data.info?.version);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [apiVersion, openApi]);

    return (
        <>
            {apiVersion &&
                <span className="version">{apiVersion}</span>
            }
        </>
    )
}

export default Version;