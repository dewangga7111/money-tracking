export type FilterFieldType = 'input' | 'autocomplete' | 'datepicker' | 'daterange';

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterField = {
  type: FilterFieldType;
  key: string;
  label: string;
  placeholder?: string;
  options?: FilterOption[];
};
