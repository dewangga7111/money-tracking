'use client';

import { useState, useEffect } from 'react';
import { Popover, RangeCalendar } from '@heroui/react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { format } from 'date-fns';

type DateRangeValue = {
  start: string | null;
  end: string | null;
};

type DateRangeInputProps = {
  label?: string;
  placeholder?: string;
  value?: DateRangeValue | null;
  onChange?: (val: DateRangeValue | null) => void;
};

export default function AppDateRangePicker({
  label = 'Date Range',
  placeholder = 'DD-MM-YYYY - DD-MM-YYYY',
  value,
  onChange,
}: DateRangeInputProps) {
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRangeValue | null>(value ?? null);

  useEffect(() => {
    setSelectedRange(value ?? null);
  }, [value]);

  const formatDate = (date: any) => {
    if (!date) return null;
    const jsDate = date.toDate(getLocalTimeZone());
    return format(jsDate, 'dd-MM-yyyy');
  };

  const handleSelect = (range: any) => {
    if (!range?.start || !range?.end) return;
    const formatted = {
      start: formatDate(range.start),
      end: formatDate(range.end),
    };
    setSelectedRange(formatted);
    onChange?.(formatted);
    setOpen(false);
  };

  const displayValue =
    selectedRange?.start && selectedRange?.end
      ? `${selectedRange.start} - ${selectedRange.end}`
      : null;

  const calendarValue =
    selectedRange?.start && selectedRange?.end
      ? {
          start: parseDate(selectedRange.start.split('-').reverse().join('-')),
          end: parseDate(selectedRange.end.split('-').reverse().join('-')),
        }
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
            <span className={displayValue ? 'text-gray-900' : 'text-gray-400'}>
              {displayValue ?? placeholder}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content placement="bottom start">
          <Popover.Dialog className="p-0 outline-none">
            <RangeCalendar
              aria-label="Select date range"
              value={calendarValue}
              onChange={handleSelect}
            >
              <RangeCalendar.Header className="flex items-center justify-between px-3 py-2">
                <RangeCalendar.NavButton slot="previous" className="p-1 rounded hover:bg-gray-100">
                  <ChevronLeft size={16} />
                </RangeCalendar.NavButton>
                <RangeCalendar.Heading className="text-sm font-semibold" />
                <RangeCalendar.NavButton slot="next" className="p-1 rounded hover:bg-gray-100">
                  <ChevronRight size={16} />
                </RangeCalendar.NavButton>
              </RangeCalendar.Header>
              <RangeCalendar.Grid className="p-2">
                <RangeCalendar.GridHeader className="mb-1">
                  {(day) => (
                    <RangeCalendar.HeaderCell className="text-xs text-gray-500 w-9 text-center font-medium">
                      {day}
                    </RangeCalendar.HeaderCell>
                  )}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => (
                    <RangeCalendar.Cell
                      date={date}
                      className="w-9 h-9 flex items-center justify-center text-sm cursor-pointer outside-month:text-gray-300 selected:bg-primary/20 selection-start:bg-primary selection-start:text-white selection-end:bg-primary selection-end:text-white hover:bg-gray-100"
                    >
                      <RangeCalendar.CellIndicator />
                    </RangeCalendar.Cell>
                  )}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
            </RangeCalendar>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
