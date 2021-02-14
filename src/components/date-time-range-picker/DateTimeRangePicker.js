import React from 'react'
import DatetimeRangePicker from "react-datetime-range-picker";
import './date-time-range-picker.css';
import moment from "moment-timezone";

function DateTimeRangePicker(props) {
    const validateStartDate = (currentDate, selectedDate) => {
        const cd = currentDate.toDate();
        const sd = selectedDate ? selectedDate.toDate() : new Date();
        return cd > sd;
    };

    const validateEndDate = (currentDate, selectedDate) => {
        let startDate = moment(
            props.startDate
        );
        const cd = currentDate.toDate();
        const sd = selectedDate ? selectedDate.toDate() : startDate.toDate();
        return cd > sd;
    };

    return (
        <DatetimeRangePicker
            onChange={props.onChangeHandler}
            isValidStartDate={(currentDate, selectedDate) =>
                validateStartDate(currentDate, selectedDate)
            }
            isValidEndDate={(currentDate, selectedDate) =>
                validateEndDate(currentDate, selectedDate)}
            input={props.input}
            inline={props.inline}
            closeOnTab={props.closeOnTab}
            inputProps={props.inputProps}
            closeOnSelect={props.closeOnSelect}
            className={props.className ? props.className : ''}
            startDate={props.startDate}
            endDate={props.endDate}
        />
    )
}

export default DateTimeRangePicker
