import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ date, onDateChange }) => {
  return (
    <div>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Pilih tanggal"
        className="w-[105px] text-dark-1 dark:text-white border-0 px-[6px] outline-none bg-light-background dark:bg-light-3 font-bold underline cursor-pointer"
      />
    </div>
  );
};

export default Datepicker;
