import React from 'react';

const DetailList = ({ d, s }) => {

    const formatText = (t) => {
        if (t){
            // Publication Cycle
            return getWeekDay(t)
        }
        return null;
    }

    const getWeekDay = (t) => {
        switch (t){
            case 1:
                return "Mon "
            case 2:
                return "Tue "
            case 3:
                return "Wed "
            case 4:
                return "Thu "
            case 5:
                return "Fri "
            case 6:
                return "Sat "
            case 7:
                return "Sun "
            default:
                return null
        }
    }

    const getWeekDayChar = (t) => {
        switch (t){
            case 1:
                return "Mo"
            case 2:
                return "Tu"
            case 3:
                return "We"
            case 4:
                return "Th"
            case 5:
                return "Fr"
            case 6:
                return "Sa"
            case 7:
                return "Su"
            default:
                return null
        }
    }

    const showWeekDays = (t) => {
        t.sort();
        let ret = ''
        for (var w of t){
            ret += getWeekDayChar(w)
        }
        return ret
    }

    const getWeekDayClass = (t) => {
        if (d.includes(t)) {
            return 'weekdayOn'
        }
        return 'weekdayOff'
    }

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead" style={{verticalAlign:"top"}}>{s}:</div>
                    <div className="divTableCell">
                        <div className={getWeekDayClass(1)}>Mo</div>
                        <div className={getWeekDayClass(2)}>Tu</div>
                        <div className={getWeekDayClass(3)}>We</div>
                        <div className={getWeekDayClass(4)}>Th</div>
                        <div className={getWeekDayClass(5)}>Fr</div>
                        <div className={getWeekDayClass(6)}>Sa</div>
                        <div className={getWeekDayClass(7)}>Su</div>

                    </div>
                </div>
            }
        </>
    )
};
export default DetailList;