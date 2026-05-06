'use client';

import { useState, useEffect } from 'react';
import { Popover, Calendar } from '@heroui/react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { format } from 'date-fns';

type DateInputProps = {
  label?: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (val: string) => void;
};

export default function AppDatePicker({
  label = 'Date',
  placeholder = 'DD-MM-YYYY',
  value,
  onChange,
}: DateInputProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(value ?? null);

  useEffect(() => {
    setSelectedDate(value ?? null);
  }, [value]);

  const handleSelect = (date: any) => {
    const jsDate = date.toDate(getLocalTimeZone());
    const formatted = format(jsDate, 'dd-MM-yyyy');
    setSelectedDate(formatted);
    onChange?.(formatted);
    setOpen(false);
  };

  const calendarValue = selectedDate
    ? parseDate(selectedDate.split('-').reverse().join('-'))
    : null;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <Popover isOpen={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <button
            type="button"
            className="flex items-center gap-2 w-full px-3 h-10 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 text-left"
          >
            <CalendarDays size={16} className="text-gray-400 shrink-0" />
            <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>
              {selectedDate ?? placeholder}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content placement="bottom start">
          <Popover.Dialog className="p-0 outline-none">
            <Calendar
              aria-label="Select date"
              value={calendarValue}
              onChange={handleSelect}
            >
              <Calendar.Header className="flex items-center justify-between px-3 py-2">
                <Calendar.NavButton slot="previous" className="p-1 rounded hover:bg-gray-100">
                  <ChevronLeft size={16} />
                </Calendar.NavButton>
                <Calendar.Heading className="text-sm font-semibold" />
                <Calendar.NavButton slot="next" className="p-1 rounded hover:bg-gray-100">
                  <ChevronRight size={16} />
                </Calendar.NavButton>
              </Calendar.Header>
              <Calendar.Grid className="p-2">
                <Calendar.GridHeader className="mb-1">
                  {(day) => (
                    <Calendar.HeaderCell className="text-xs text-gray-500 w-9 text-center font-medium">
                      {day}
                    </Calendar.HeaderCell>
                  )}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => (
                    <Calendar.Cell
                      date={date}
                      className="w-9 h-9 flex items-center justify-center rounded-full text-sm hover:bg-gray-100 cursor-pointer outside-month:text-gray-300 selected:bg-primary selected:text-white"
                    >
                      <Calendar.CellIndicator />
                    </Calendar.Cell>
                  )}
                </Calendar.GridBody>
              </Calendar.Grid>
            </Calendar>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
