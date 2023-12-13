import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const SlickSimilar = ({uid}) => {
    const slick = 1

    var slides
    var slick_css
    var slick_desc
    var slick_results
    var slick_title_length
    var slick_breakpoints = []

    if (slick === 1) {
        slides = 5
        slick_css = "slick-detail"
        slick_desc = true
        slick_results = 10
        slick_title_length = 50
        slick_breakpoints = [4,3,2,1]
    }
    if (slick === 2) {
        slides = 8
        slick_css = "slick-detail-small"
        slick_desc = false
        slick_results = 16
        slick_title_length = 45
        slick_breakpoints = [6,5,3,2]
    }

    const settings = {
        lazyLoad: true,
        //dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slides,
        slidesToScroll: slides,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: slick_breakpoints[0],
                    slidesToScroll: slick_breakpoints[0],
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: slick_breakpoints[1],
                    slidesToScroll: slick_breakpoints[1],
                    initialSlide: slick_breakpoints[1]
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: slick_breakpoints[2],
                    slidesToScroll: slick_breakpoints[2]
                }
            }
            ,
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: slick_breakpoints[3],
                    slidesToScroll: slick_breakpoints[3]
                }
            }
        ]
    };
    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])

    const fetchItemData = () => {
        setDetails([]);
        fetch(process.env.REACT_APP_API + "view/similar/" + uid + "?max_results=" + slick_results)
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
    }, [uid])

    const getDesc = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            if (res.description){
                var s = res.description;
                var length = 50;
                var trimmedString = s.length > length ?
                    s.substring(0, length - 3) + "... (more)" : s;
                var firstLetter = trimmedString.charAt(0)
                var firstLetterCap = firstLetter.toUpperCase()
                var remainingLetters = trimmedString.slice(1)
                return firstLetterCap + remainingLetters
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const getDgraph = (d) => {
        if(d) {
            for (var e of d["dgraph.type"]){
                if (e !== "Entry"){
                    return e;
                }
            }

        } else {
            return null;
        }
    }

    const showItemName = (name) => {
        var len = name.length;
        if(len > slick_title_length) {
            return name.substring(0,slick_title_length) + '...'
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
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Working-class_protest_in_Greece.JPG/256px-Working-class_protest_in_Greece.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Politics_at_the_2015_Iowa_State_Fair_%2820424491760%29_%282%29.jpg/256px-Politics_at_the_2015_Iowa_State_Fair_%2820424491760%29_%282%29.jpg"
    ]

    const getImg = (i) => {
        if (i > 4){
            i = i%5
        }
        return 'url(' + bg_img[i] + ')'
    }

    return (
        <div className={slick_css}>
            {/*<span className="slick-detail-header">Similar Records</span>*/}
                {items.length > 0 && (
                    <Slider {...settings}>
                        {items.map((item, index) => (
                            <div key={item._unique_name}>
                                <Link to={getlink(item._unique_name)}>
                                    <div className="item" style={{backgroundImage:getImg(index)}}>
                                        <div className="item-overlay">
                                            <div className="item-title-slick">{showItemName(item.name)}</div>
                                            <div className="item-type-slick">{getDgraph(item)}</div>
                                            {slick_desc &&
                                                <div className="item-desc-slick">{getDesc(item._unique_name)}</div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                )}
                {items.length === 0 &&
                    <Slider {...settings}>
                        <div>
                            <div className="item">
                                <div className="item-overlay">
                                    <div className="item-title-slick"></div>
                                    <div className="item-type-slick"></div>
                                    <div className="item-desc-slick"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="item">
                                <div className="item-overlay">
                                    <div className="item-title-slick"></div>
                                    <div className="item-type-slick"></div>
                                    <div className="item-desc-slick"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="item">
                                <div className="item-overlay">
                                    <div className="item-title-slick"></div>
                                    <div className="item-type-slick"></div>
                                    <div className="item-desc-slick"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="item">
                                <div className="item-overlay">
                                    <div className="item-title-slick"></div>
                                    <div className="item-type-slick"></div>
                                    <div className="item-desc-slick"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="item">
                                <div className="item-overlay">
                                    <div className="item-title-slick"></div>
                                    <div className="item-type-slick"></div>
                                    <div className="item-desc-slick"></div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                }
        </div>
    );
}

export default SlickSimilar;