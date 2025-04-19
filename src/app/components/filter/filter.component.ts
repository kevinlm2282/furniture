import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
// import { ChipsModule } from 'primeng/chips';
// import { Filter } from '@models/crud.model';
import { CalendarModule } from 'primeng/calendar';
import dayjs from 'dayjs';
import { Filter } from '../../models/crud.model';
// import { ChipsModule } from 'primeng/chips';

@Component({
  selector: 'filter-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    // ChipsModule,
    CalendarModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  @Input() filters: Array<Filter<any, any>> | undefined;

  @Output() filter: EventEmitter<any> = new EventEmitter()

  form: FormGroup = new FormGroup<any>({});
  maxDefault = dayjs().add(100, 'year').toDate()
  minDefault = dayjs().add(-100, 'year').toDate()

  ngOnInit(): void {
    if (!this.filters) return
    const form: any = {}
    for (const { control, defaultValue, rules } of this.filters)
      form[control] = new FormControl({ value: defaultValue, disabled: false }, this.setRules(rules))
    this.form = new FormGroup(form)
  }

  eventFilter(): void {
    const filter: any = {}
    for (const key in this.form.value) {
      const property = this.getProperty(key)
      if (this.form.value[key])
        filter[key] = this.form.value[key]
      if (filter[key] && property?.type === 'calendar' && dayjs(filter[key]).isValid()) {
        let date = dayjs(filter[key])
        if (property.calendar?.default === 'last') date = date.endOf(property.calendar?.view || 'day')
        if (property.calendar?.default === 'first') date = date.startOf(property.calendar?.view || 'day')
        filter[key] = date.format('DD/MM/YYYY')
      }
    }
    this.filter.emit(filter)
  }

  getProperty(filter: string) {
    return this.filters?.find(item => item.control === filter)
  }

  addNuevaPalabraClave(event: any) {
    if (!Array.isArray(this.form.value.palabraClave)) return
    const contenido = [...this.form.value.palabraClave]
    contenido.splice(-1, 1)
    const nuevaPalabra = event.value.toUpperCase()
    this.form.patchValue({ palabraClave: [...contenido, nuevaPalabra] })
  }

  maxDateControl(date: any) {
    if (isNaN(Date.parse(date)))
      return this.form.value[date] || this.maxDefault
    return date || this.maxDefault
  }

  minDateControl(date: any) {
    if (isNaN(Date.parse(date)))
      return this.form.value[date] || this.minDefault
    return date || this.minDefault
  }

  setRules(rules: Array<{ validator: Validators }> | undefined) {
    const newRules: any = []
    if  (!rules) return newRules
    for (const rule of rules)
      newRules.push(rule.validator)
    return newRules
  }
}
