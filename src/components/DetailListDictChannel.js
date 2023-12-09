import React from 'react';
import LinkNewsSource from './LinkNewsSource';

const DetailListDictChannel = ({ d, s, h=null }) => {

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">
                        {h ? <h3>{s}</h3> : s }
                    </div>
                    <div className="divTableCell">
                        <ul style={{listStyleType: "none", padding: 0}}>
                        {d.map(x => (
                            <div key={x.uid}>
                                {x.channel &&
                                    <><li>
                                        <LinkNewsSource item={x} />
                                        </li>
                                    </>
                                }
                            </div>
                        ))}
                        {d === undefined &&
                            <>
                                None
                            </>
                        }
                        </ul>
                    </div>
                </div>
            }
        </>
    )
};
export default DetailListDictChannel;
