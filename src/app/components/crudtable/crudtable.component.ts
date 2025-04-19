import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Signal, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
// import { Filter, Column, Option } from '../../models/crud.model'
// import { RowSelect } from '@constants/global.constant';
// import { MediaQueryService } from '@common/media-query.service';
// import { FilterComponent } from '@components/filter/filter.component';
// import { PaginationComponent } from '@components/pagination/pagination.component';
import dayjs from 'dayjs';
import { Column, Filter, Option } from '../../models/crud.model';
import { RowSelect } from '../../constants/global.constants';
import { MediaQueryService } from '../../common/media-query.service';
import { FilterComponent } from '../filter/filter.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'crudtable-component',
  imports: [
    ButtonModule,
    FilterComponent,
    PaginationComponent,
    TableModule,
    CardModule,
    DividerModule,
    CommonModule,
  ],
  templateUrl: './crudtable.component.html',
  styleUrl: './crudtable.component.scss'
})
export class CrudtableComponent implements OnInit {
  @ViewChild(PaginationComponent) pagination!: PaginationComponent

  @Input() content!: TemplateRef<ElementRef>
  @Input() item!: TemplateRef<ElementRef>
  @Input() buttons!: TemplateRef<ElementRef>
  @Input() action!: TemplateRef<ElementRef>
  @Input() filters: Array<Filter<any, any>> | undefined;
  @Input() columns?: Array<Column> = []
  @Input() rows?: Array<Option<number, number>> = RowSelect;
  @Input() items: Array<any> = []
  @Input() viewAdd: boolean = true;
  @Input() readonly?: boolean = false
  @Input() rowEvent?: boolean = false
  @Input() styleClassRow: string = ''
  @Input() styleClassActionTable: string = 'w-14'
  @Input() styleClassSelectRow: string = ''
  @Input() total: number = 0;

  @Output() change: EventEmitter<any> = new EventEmitter()
  @Output() refresh: EventEmitter<any> = new EventEmitter()
  @Output() add: EventEmitter<any> = new EventEmitter()
  @Output() onRow: EventEmitter<any> = new EventEmitter()

  informacion: {
    open: { filter: boolean },
    control: { rows: number, page: number },
    mediaQuery: Signal<string>,
    filter: any,
    loading: boolean
  } = {
    open: { filter: false },
    control: { rows: 10, page: 0 },
    mediaQuery: computed(() => {
      return this.mediaQueryService.mediaQuery()
    }),
    filter: {},
    loading: false,
  }
  constructor(
    private mediaQueryService: MediaQueryService
  ) {}

  ngOnInit(): void {
    if (!this.filters) return
    for (const filter of this.filters) {
      if (!filter.defaultValue) continue
      if (filter.type === 'calendar') {
        this.informacion.filter[filter.control] = dayjs(filter.defaultValue).format('DD/MM/YYYY')
        continue
      }
      this.informacion.filter[filter.control] = filter.defaultValue
    }
  }

  reset() {
    this.pagination.reset({ value: this.informacion.control.rows })
  }

  eventFilter(value: any) {
    this.informacion.filter = value
    this.reset()
  }

  eventRefresh() {
    this.informacion.loading = true
    if (!this.informacion.control) return
    this.refresh.emit({ control: this.informacion.control, filter: this.informacion.filter })
    this.informacion.loading = false
  }

  addRegister() { this.add.emit() }

  page(event: any) {
    if (!event) return
    this.informacion.control.page = event.page
    this.informacion.control.rows = event.rows
    this.change.emit({ control: this.informacion.control, filter: this.informacion.filter })
  }

  context(implicit: any, other: any) {
    return {
      '$implicit': implicit,
      ...other
    }
  }

  onRowEvent(item: any, index: number) {
    if (this.rowEvent) this.onRow.emit({ item, index })
  }
}