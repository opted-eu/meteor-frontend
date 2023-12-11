import * as d3 from "d3";

// declarations

const Icons = {
    "website": "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z",
    "print": "m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z",
    "instagram": "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
    "facebook": "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z",
    "twitter": "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
    "vkontakte": "M31.5 63.5C0 95 0 145.7 0 247V265C0 366.3 0 417 31.5 448.5C63 480 113.7 480 215 480H233C334.3 480 385 480 416.5 448.5C448 417 448 366.3 448 265V247C448 145.7 448 95 416.5 63.5C385 32 334.3 32 233 32H215C113.7 32 63 32 31.5 63.5zM75.6 168.3H126.7C128.4 253.8 166.1 290 196 297.4V168.3H244.2V242C273.7 238.8 304.6 205.2 315.1 168.3H363.3C359.3 187.4 351.5 205.6 340.2 221.6C328.9 237.6 314.5 251.1 297.7 261.2C316.4 270.5 332.9 283.6 346.1 299.8C359.4 315.9 369 334.6 374.5 354.7H321.4C316.6 337.3 306.6 321.6 292.9 309.8C279.1 297.9 262.2 290.4 244.2 288.1V354.7H238.4C136.3 354.7 78 284.7 75.6 168.3z",
    "telegram": "M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"
}


function recurseData(data) {
    // known limitations:
    // 1) does not have any limits, so it will parse the data regardless of its total length
    // can only parse list (Array) relationsships, ignores 1-1 relationships (Object)

    let nodes = []
    let edges = []
    let heap_nodes = []
    let heap_edges = []
    for(let node of data) {
        if (!heap_nodes.includes(node.uid)) {
            heap_nodes.push(node.uid)
            nodes.push({id: node.uid,
                uid: node.uid,
                name: node.name,
                unique_name: node._unique_name,
                type: node['dgraph.type'].pop('Entry'),
                channel: node.channel?._unique_name
            })
        }
        for (let key of Object.keys(node)) {
            if (Array.isArray(node[key])) {
                for (let child of node[key]) {
                    if (Object.keys(child).includes('uid')) {
                        let edge = ''
                        if (key.startsWith('~')) {
                            edge = `${child.uid}_${node.uid}`
                        } else {
                            edge = `${node.uid}_${child.uid}`
                        }
                        if (!heap_edges.includes(edge)) {
                            heap_edges.push(edge)
                            if (key.startsWith('~')) {
                                edges.push({ id: edge, source: child.uid, target: node.uid, relationship: key.replace('~', '') })
                            } else {
                                edges.push({ id: edge, source: node.uid, target: child.uid, relationship: key })
                            }
                        }

                    }
                }
            }
        }
    }

    return { 'nodes': nodes, 'edges': edges, '_heap_nodes': heap_nodes, '_heap_edges': heap_edges }
}


export function parseNodes(rawjson) {

    // sorting produces slightly better graph rendering
    function sortByType(a, b) {
        if (a.type > b.type) return 1;
        if (a.type < b.type) return -1;
        return 0;
    }

    function sortByRelationship(a, b) {
        if (a.relationship > b.relationship) return 1;
        if (a.relationship < b.relationship) return -1;
        return 0;
    }

    let recursed = recurseData(rawjson)
    let n = recursed.nodes.sort(sortByType);
    let e = recursed.edges.sort(sortByRelationship);


    let output = {
        nodes: n,
        links: e
    }
    return output
}


// Draw Network Function

export function drawChart({
                              links,
                              nodes
                          },
                          {
                              width = 400,
                              height = 600,
                              color = "#FFFFFF",
                              nodeRadius = 17,
                              forceStrength = -500,
                              invalidation = null
                          }, data = {}) {

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(30))
        .force("charge", d3.forceManyBody().strength(forceStrength))
        .force("x", d3.forceX())
        .force("y", d3.forceY());
    // .force("bounds", boxingForce);

    const svg = d3.create("svg")
        .attr("version", "1.1")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2 - nodeRadius*2, -height / 2, width -nodeRadius*2, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(links)
        .join("marker")
        .attr("id", d => `arrow-${d.index}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", function(d) {
            let arrowSize = 7
            if (d.target.type === 'Organization') {
                return nodeRadius*1.2 + arrowSize
            } else {
                return nodeRadius + arrowSize
            }
        })
        .attr("refY", 0)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", color)
        .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("stroke", color)
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.index}`, window.location)})`);

    const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("a")
        .data(nodes)
        .join("a")
        .attr("href", d => `/detail/${d.unique_name}`)
        .attr("class", d => `node-type-${d.type}`)
        .classed('node-group', true)
        .classed('text-decoration-none', true)
        .call(drag(simulation));

    node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", function (d) {
            if (d.type === 'Organization') {
                return nodeRadius * 1.2
            } else {
                return nodeRadius
            }
        })
        .attr("class", d => d.type)
        .classed("currentNode", d => d.uid === data.uid)


    // render channel-icon
    // one day group according to channel: https://bl.ocks.org/GerHobbelt/3104394
    node.selectAll(".NewsSource")
        .each(function(d) {
            this.classList.add("color-" + d.channel);
        });

    svg.selectAll(".node-type-NewsSource")
        .append("path")
        .style('color', 'white')
        .style('fill', 'white')
        .attr('d', d => Icons[d.channel])
        .attr("transform", "translate(-12, -12)");

    node.append("title")
        .text(d => `${d.name} (${d.type})`)

    node.append("text")
        .attr("x", 0)
        .attr("y", nodeRadius * 2)
        .attr('text-anchor', 'middle')
        .classed('nodeLabel', true)
        .text(d => truncate(d.name))
        .clone(true).lower()
    // .attr("fill", "none")
    // .attr("stroke", "white")
    // .attr("stroke-width", 1);

    node.selectAll("text").raise()

    // helper functions

    // function linkArc(d) {
    //     const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    //     return `
    //               M${d.source.x},${d.source.y}
    //               A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    //           `;
    // };

    function truncate(input) {
        if (input.length > 25) {
            return input.substring(0, 25) + '...';
        }
        return input;
    };


    // simulation functions

    // function boxingForce() {
    //     const radius = width;

    //     for (let node of nodes) {
    //         // Of the positions exceed the box, set them to the boundary position.
    //         // You may want to include your nodes width to not overlap with the box.
    //         node.x = Math.max(-radius, Math.min(radius, node.x));
    //         node.y = Math.max(-radius, Math.min(radius, node.y));
    //     }
    // }

    function drag(simulation) {

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    simulation.on("tick", () => {
        // if links should be arcs use this function
        // note to adjust refY to move arrow head
        // link.attr("d", linkArc);

        link.attr("d", function (d) {
            return `        
              M${d.source.x},${d.source.y}
              L ${d.target.x},${d.target.y}
              `
        });
        node.attr("transform", function (d) {

            return `translate(${d.x},${d.y})`
        });

    });

    // wait some ticks and then resize
    const t = d3.timer((elapsed) => {
        if (elapsed > 500) {
            t.stop()
            // let bbox = d3.select('#network-plot svg').node().getBBox();
            let bbox = svg.node().getBBox();
            //console.log(bbox)
            svg.transition().duration(400)
                .attr("viewBox", `${bbox.x},${bbox.y-nodeRadius*2},${bbox.width+nodeRadius*2},${bbox.height+nodeRadius*2}`)
        };
    }, 150);

    if (invalidation != null) invalidation.then(() => simulation.stop());

    return svg.node();
}