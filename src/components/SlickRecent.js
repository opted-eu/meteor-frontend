import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const SimpleSlider = () => {
    const settings = {
        lazyLoad: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])

    const fetchItemData = () => {
        setDetails([]);
        fetch(process.env.REACT_APP_API + "view/recent?limit=10")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItems(data);
                const p = [];
                data.forEach(b => {
                    p.push(
                        fetch(process.env.REACT_APP_API + "view/entry/" + b._unique_name)
                            .then(response1 => {
                                return response1.json()
                            })
                            .then(data1 => {
                                return data1;
                            })
                    )
                });
                Promise.all(p).then((d) => setDetails(d));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
    }, [])

    const getDesc = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            if (res.description){
                var s = res.description;
                var length = 100;
                var trimmedString = s.length > length ?
                    s.substring(0, length - 3) + "... (more)" : s;
                return trimmedString;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const getDgraph = (d) => {
        if(d) {
            return d["dgraph.type"];
        } else {
            return null;
        }
    }

    const showItemName = (name) => {
        var len = name.length;
        if(len > 50) {
            return name.substring(0,50)
        } else {
            return name
        }
    }

    const getlink = (uid) => {
        return '/detail/' + uid
    }

    const bg_img = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/European-parliament-strasbourg-inside.jpg/256px-European-parliament-strasbourg-inside.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cyrus_Engerer_addressing_PL_AGM_2013.JPG/256px-Cyrus_Engerer_addressing_PL_AGM_2013.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/House_of_Commons_2010.jpg/256px-House_of_Commons_2010.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Working-class_protest_in_Greece.JPG/256px-Working-class_protest_in_Greece.JPG"
    ]

    const getImg = (i) => {
        if (i > 3){
            i = i%4
        }
        return 'url(' + bg_img[i] + ')'
    }

    return (
        <div className="slick">
            <h2>Recent Entries</h2>
                {items.length > 0 && (
                    <Slider {...settings}>
                        {items.map((item, index) => (
                            <div key={item._unique_name}>
                                <Link to={getlink(item._unique_name)}>
                                    <div className="item" style={{backgroundImage:getImg(index)}}>
                                        <div className="item-overlay">
                                            <div className="item-title-slick">{showItemName(item.name)}</div>
                                            <div className="item-type-slick">{getDgraph(item)}</div>
                                            <div className="item-desc-slick">{getDesc(item._unique_name)}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                )}
        </div>
    );
}

export default SimpleSlider;