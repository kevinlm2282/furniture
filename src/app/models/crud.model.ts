import { Validators } from "@angular/forms";

export interface Filter<label, value> {
  label: string;
  control: string;
  type: 'text' | 'chip' | 'select' | 'number' | 'calendar';
  style?: string;
  inputUpper?: boolean;
  options?: Array<Option<label, value>>;
  calendar?: {
    minDate: Date | string;
    maxDate: Date | string;
    format?: string | 'dd/mm/yy',
    view?: 'month' | 'year' | 'date',
    default?: string
  },
  virtualScroll?: boolean
  virtualScrollSize?: number
  defaultValue?: any
  rules?: Array<{ rule: string, validator: Validators, message: string }>
}

export interface Option<l, v> {
  label: l;
  value: v;
}

export interface Column {
  label: string;
  key: string;
  aling?: string;
}