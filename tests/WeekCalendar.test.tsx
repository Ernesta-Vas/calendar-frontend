import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DateProvider } from '../src/context/DateContext/DateContext';
import { ToastProvider } from '../src/context/ToastContext/ToastContext';
import { WeekCalendar } from '../src/pages/WeekCalendar/WeekCalendar';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <DateProvider>
        <ToastProvider>{ui}</ToastProvider>
      </DateProvider>
    </BrowserRouter>
  );
};

describe('WeekCalendar', () => {
  it('renders week dates', () => {
    renderWithProviders(<WeekCalendar />);
    const weekDays = screen.getAllByText(/понедельник|вторник|среда|четверг|пятница|суббота|воскресенье/i);
    expect(weekDays).toHaveLength(7);
  });

  it('shows "Нет задач" when there are no todos', () => {
    renderWithProviders(<WeekCalendar />);
    const noTodosText = screen.getAllByText(/нет задач/i);
    expect(noTodosText.length).toBeGreaterThan(0);
    expect(noTodosText[0].textContent).toBe('Нет задач');
  });
});