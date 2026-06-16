import { useMemo } from 'react';
import type { ChartDataPoint } from '@/types/transaction';

type ActivityCalendarProps = {
  currentMonthDate: string | null; // e.g. "01-06-2026" or "YYYY-MM-DD" depending on how we pass it. Let's assume YYYY-MM-DD
  data: ChartDataPoint[];
  onDateClick: (dateStr: string) => void;
};

const DAYS_OF_WEEK = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU'];
const DAYS_OF_WEEK_SHORT = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

function formatCompact(number: number) {
  if (number === 0) return '';
  if (number >= 1000000) {
    return (number / 1000000).toFixed(number % 1000000 !== 0 ? 1 : 0) + 'JT';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(number % 1000 !== 0 ? 1 : 0) + 'RB';
  }
  return number.toString();
}

export default function ActivityCalendar({ currentMonthDate, data, onDateClick }: ActivityCalendarProps) {
  const { month, year, calendarDays } = useMemo(() => {
    if (!currentMonthDate) {
      const now = new Date();
      return { month: now.getMonth(), year: now.getFullYear(), calendarDays: [] };
    }

    // Assume currentMonthDate is YYYY-MM-DD
    const baseDate = new Date(currentMonthDate);
    if (isNaN(baseDate.getTime())) {
      const now = new Date();
      return { month: now.getMonth(), year: now.getFullYear(), calendarDays: [] };
    }

    const y = baseDate.getFullYear();
    const m = baseDate.getMonth();

    const firstDayOfMonth = new Date(y, m, 1);
    const lastDayOfMonth = new Date(y, m + 1, 0);

    // 0 is Sunday, 1 is Monday ... 6 is Saturday
    // We want SN (Monday) to be index 0
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6; // Sunday

    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayData = data.find(d => d.date === dateStr);
      days.push({
        day: i,
        dateStr,
        income: dayData?.income || 0,
        expense: dayData?.expense || 0,
        hasActivity: (dayData?.income || 0) > 0 || (dayData?.expense || 0) > 0
      });
    }

    // Fill remaining slots to complete the grid (usually 5 or 6 rows = 35 or 42 cells)
    const totalCells = Math.ceil(days.length / 7) * 7;
    while (days.length < totalCells) {
      days.push(null);
    }

    return { month: m, year: y, calendarDays: days };
  }, [currentMonthDate, data]);

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  return (
    <div className="w-full flex flex-col bg-white border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-6 text-gray-900">
      <div className="text-xs sm:text-sm font-bold tracking-wider mb-3 sm:mb-6 text-gray-500 uppercase">
        {monthNames[month]} {year}
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1.5 sm:mb-2">
        {DAYS_OF_WEEK.map((day, i) => (
          <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-gray-400">
            <span className="sm:hidden">{DAYS_OF_WEEK_SHORT[i]}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((cell, index) => {
          if (!cell) {
            return <div key={`empty-${index}`} className="min-h-[48px] sm:min-h-[100px] rounded-lg sm:rounded-xl" />;
          }

          const { day, dateStr, income, expense, hasActivity } = cell;

          return (
            <div
              key={dateStr}
              onClick={() => onDateClick(dateStr)}
              className={`relative min-h-[48px] sm:min-h-[100px] rounded-lg sm:rounded-xl p-1.5 sm:p-3 cursor-pointer transition-all hover:scale-105 overflow-hidden flex flex-col justify-between
                ${hasActivity ? 'bg-primary-50 border border-primary-100 hover:bg-primary-100' : 'bg-gray-50 hover:bg-gray-100'}
              `}
            >
              <span className={`text-xs sm:text-sm font-semibold ${hasActivity ? 'text-primary-800' : 'text-gray-400'}`}>
                {day}
              </span>

              <div className="flex flex-col items-end gap-0.5 sm:gap-1 mt-auto text-[9px] sm:text-xs font-bold leading-tight">
                {income > 0 && <span className="text-emerald-600">+{formatCompact(income)}</span>}
                {expense > 0 && <span className="text-rose-600">-{formatCompact(expense)}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
