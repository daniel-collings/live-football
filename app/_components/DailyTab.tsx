"use client";

import React, { useState } from "react";

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  const [dates, setDates] = useState<Date[]>(generateDates());

  const handleDateClick = (date: Date) => {
    onChange(date);
  };

  return (
    <div className="flex overflow-x-scroll">
      {dates.map((date, index) => {
        const isSelected = date.getTime() === selectedDate.getTime();
        const isToday = isDateToday(date);
        const isYesterday = isDateYesterday(date);

        let label = date.getDate().toString();
        if (isToday) label = "Today";
        if (isYesterday) label = "Yesterday";

        return (
          <div
            key={date.getTime()}
            className={`px-4 py-2 cursor-pointer ${
              isSelected ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleDateClick(date)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const generateDates = (): Date[] => {
  const today = new Date();
  const dates: Date[] = [];

  // Add yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  dates.push(yesterday);

  // Add today's date
  dates.push(today);

  // Add the next 5 days
  for (let i = 1; i <= 5; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + i);
    dates.push(futureDate);
  }

  return dates;
};

const isDateToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isDateYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export default DatePicker;
