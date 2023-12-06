import React, {useEffect} from "react";

const OwnershipStructure = ({item}) => {

    // we need the UID of the current entry, we use that to submit it to the endpoint
    const data = { uid: item.uid };

    useEffect(() => {
        //runOS(data, "network-plot")
        window['runOS'](data, "network-plot")
    }, [])

    return (
        <>
            <h3>Ownership Structure</h3>
            <div className="widget" id="network-plot"></div>
        </>
    )
}

export default OwnershipStructure;