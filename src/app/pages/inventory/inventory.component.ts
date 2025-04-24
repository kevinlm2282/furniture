import { Component, computed, ViewChild } from '@angular/core';
import { CrudtableComponent } from '../../components/crudtable/crudtable.component';
import { Filter } from '../../models/crud.model';
import { CardModule } from 'primeng/card';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'app-inventory',
  imports: [
    CrudtableComponent,
    CardModule

  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

  selected = computed(() => this.globalService.page() || { label: '404', icon: 'pi pi-spin pi-globe', description: 'd' })
  @ViewChild(CrudtableComponent) table!: CrudtableComponent;
  
  constructor(
    private globalService:GlobalService
  ){
    console.log(this.selected())
  }

  total:any = 0
  items:any = []
  columns = [
    { key: 'CODIGO', label: 'CODIGO'},
    { key: 'DESCRIPCION', label: 'DESCRIPCIÓN'}
  ]
  
  filters: Array<Filter<string, string>> = [
    { label: 'CODIGO', control: 'codigo', type: 'text', style: 'col-span-12 md:col-span-4' },
    { label: 'DESCRIPCIÓN', control: 'descripcion', type: 'text', style: 'col-span-12 md:col-span-4' },
  ]


  async change({}:any){}

  refresh({}:any){}

  onRow({}:any){}

}
