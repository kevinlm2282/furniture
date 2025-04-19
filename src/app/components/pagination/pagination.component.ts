import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
// import { RowSelect } from '@constants/global.constant';
// import { Option } from '@models/crud.model';
import { DividerModule } from 'primeng/divider';
import { RowSelect } from '../../constants/global.constants';
import { Option } from '../../models/crud.model';

@Component({
  selector: 'pagination-component',
  standalone: true,
  imports: [
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    DividerModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() mediaQuery: string = ''

  @Input() total: number = 0;
  @Input() rows?: Array<Option<number, number>> = RowSelect;

  row: number = 0
  limit: number = 10

  @Output() changePage: EventEmitter<{ rows: number, page: number }> = new EventEmitter()

  reset(event: any) {
    this.row = 0
    this.limit = event.value
    this.changePage.emit({ rows: event.value, page: 0 })
  }

  page(event: any) {
    this.row = event.first
    this.limit = event.rows || 0
    this.changePage.emit({ rows: event.rows, page: event.page })
  }

  ngOnInit(): void {
    this.reset({ value: this.limit })
  }
}
