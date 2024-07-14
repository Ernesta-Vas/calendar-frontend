import React from 'react';

import { months } from '../../../constant/dates';
import { useDateContext } from '../../../context/DateContext/DateContext';
import { Select } from '../../../ui/Select';

import {SelectorsContainer} from './style'


export const DateSelectors: React.FC = () => {
  const { selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedWeek, setSelectedWeek } = useDateContext();

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  const weeks = Array.from({ length: 5 }, (_, i) => i + 1);  

  return (
    <SelectorsContainer>
      <Select
        label="Год"
        selectedValue={selectedYear}
        options={years}
        onChange={setSelectedYear}
        displayValue={(year) => `${year}`}
      />
      <Select
        label="Месяц"
        selectedValue={months[selectedMonth - 1]}
        options={months}
        onChange={(month) => setSelectedMonth(months.indexOf(month) + 1)}
        displayValue={(month) => month}
      />
      <Select
        label="Неделя"
        selectedValue={selectedWeek}
        options={weeks}
        onChange={setSelectedWeek}
        displayValue={(week) => `Неделя ${week}`}
      />
    </SelectorsContainer>
  );
};
