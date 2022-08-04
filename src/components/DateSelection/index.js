import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import * as moment from "moment";

moment.locale("vi", {
  week: {
    dow: 1,
  },
});
moment.locale("vi");

const weeksInYear = (year) =>
  Math.max(
    moment(new Date(year, 11, 31)).isoWeek(),
    moment(new Date(year, 11, 31 - 7)).isoWeek()
  );

const reportTypeEnum = {
  WEEK: 0,
};

const groupOptions = [
  {
    name: "Tuần",
    value: reportTypeEnum.WEEK,
  },
];

const dateFormat = "DD/MM/YYYY";

const directionEnum = {
  up: "UP",
  down: "DOWN",
};

export default function DateSelection(props) {
  const { handleChange } = props;
  const [value, setValue] = useState();
  const [unit, setUnit] = useState(groupOptions[0]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const currentMonth = moment().month();
  const currentWeek = moment().isoWeek();
  const currentQuarter = moment().quarter();

  useEffect(() => {
    setUnit(groupOptions[0]);
    setValue(currentWeek);
    const { start, end } = getStartAndEndDateOfUnit("week", currentWeek);
    setStartDate(start);
    setEndDate(end);
    handleChange(start, end);
  }, [currentMonth, currentQuarter, currentWeek, 0]);

  const getStartAndEndDateOfUnit = (unit, value) => {
    let isoYear = startDate ? moment(startDate).year() : moment().year();
    let maxUnit = weeksInYear(moment(startDate).year());

    if (value > maxUnit) {
      value = 1;
      isoYear++;
    }
    let start = moment()
      .isoWeekYear(isoYear)
      .utc()
      .isoWeek(value)
      .startOf(unit);
    let end = moment().isoWeekYear(isoYear).utc().isoWeek(value).endOf(unit);

    return { start, end, value };
  };

  const handleChangeValue = (direction) => {
    let newValue = value;
    if (direction === directionEnum.up) {
      newValue = value + 1;
    }
    if (direction === directionEnum.down) {
      newValue = value - 1;
    }
    const { start, end } = getStartAndEndDateOfUnit("week", newValue);
    if (start.isAfter(moment())) {
      return;
    }
    // eslint-disable-next-line default-case
    let valueFormat = +start.format("W");

    setValue(valueFormat);
    setStartDate(start);
    setEndDate(end);
    handleChange(start, end);
  };

  return (
    <Row
      className="items-center justify-content-center"
      style={{ paddingBottom: 20 }}
    >
      <div
        className="date-select-filter"
        onClick={() => handleChangeValue(directionEnum.down)}
      >
        <LeftOutlined style={{ fontSize: "10px", opacity: "0.3" }} />
      </div>
      <div className="">
        <div className="text-center">
          <span className="date-select-head-text">
            {unit.name} {value}
          </span>
        </div>
        <div className="text-center">
          <span className="date-select-body-text">{`${startDate?.format(
            dateFormat
          )} - ${endDate?.format(dateFormat)}`}</span>
        </div>
      </div>
      <div
        className="date-select-filter"
        onClick={() => handleChangeValue(directionEnum.up)}
      >
        <RightOutlined style={{ fontSize: "10px", opacity: "0.3" }} />
      </div>
    </Row>
  );
}
