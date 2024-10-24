import * as d3 from "d3";
import React, {useRef, useEffect, useState} from "react";
import {drawChart, parseNodes} from "../utils/networkplot";

const OwnershipStructure = ({uid}) => {

    const plotWidth = 300

    const [endpoint, setEndpoint] = useState(process.env.REACT_APP_API + "view/ownership/" + uid)
    const [loading, setLoading] = useState(true);
    const ref = useRef(null)

    const generateChart = (signal) => {
        setLoading(true)
        return fetch(endpoint, { signal })
            .then((response) => response.json())
            .then((data) => parseNodes(data))
            .then((network) => drawChart(network, {width: plotWidth, height:  plotWidth}, uid))
            .catch((error) => {
                console.error('Error:', error);
            }).finally(
                setLoading(false)
            );
    };


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setEndpoint(process.env.REACT_APP_API + "view/ownership/" + uid)
    
        const appendChart = async () => {
            try {
                const plot = await generateChart(signal);
                if (plot) {
                    ref.current.innerHTML = "";
                    const svgElement = d3.select(ref.current);
                    svgElement.append(() => plot);
    
                    // ensure that hovered elements are on top
                    svgElement.selectAll("a").on("mouseenter", function () {
                        d3.select(this).raise();
                    });
    
                    // zoom
                    function handleZoom(e) {
                        d3.selectAll('svg g')
                            .attr('transform', e.transform);
                    }
                    const zoom = d3.zoom()
                        .on('zoom', handleZoom);
    
    
                    function initZoom() {
                        svgElement
                            .call(zoom);
                    }

                    initZoom()
                }
    
            } catch (error) {
                console.error('Error:', error);
            }
        };
        appendChart();
        return () => {
            controller.abort();
          };

    }, [endpoint, uid, loading])

    return (
        <div className="item-img">
            <h4>Ownership Structure</h4>
            {loading && <p>Loading...</p>}
            <div id='networkplot' ref={ref}></div>
        </div>
    )
}

export default OwnershipStructure;