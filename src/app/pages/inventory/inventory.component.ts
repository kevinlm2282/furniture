import { Component, computed, OnInit, ViewChild } from '@angular/core';
import { CrudtableComponent } from '../../components/crudtable/crudtable.component';
import { Filter } from '../../models/crud.model';
import { CardModule } from 'primeng/card';
import { GlobalService } from '../../common/global.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  imports: [
    CrudtableComponent,
    CardModule

  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {

  selected = computed(() => this.globalService.page() || { label: '404', icon: 'pi pi-spin pi-globe', description: 'd' })
  @ViewChild(CrudtableComponent) table!: CrudtableComponent;
  
  constructor(
    private globalService:GlobalService,
    private inventoryService:InventoryService
  ){
    console.log(this.selected())
  }

  ngOnInit(): void {
   this.getItems();
  }

  total:any = 0
  items:any = []
  columns = [
    { key: 'id' , label: 'CODIGO'},
    { key: 'name', label: 'NOMBRE'},
    { key: 'quantity', label: 'CANTIDAD'},
    { key: 'sellPrice', label: 'PRECIO'},
    { key: 'fabricationCost', label: 'COSTO FABRICACIÓN'},
    { key: 'color', label: 'COLOR'},
    { key: 'category', label: 'CATEGORÍA'},
  ]
  
  filters: Array<Filter<string, string>> = [
    { label: 'NOMBRE', control: 'nombre', type: 'text', style: 'col-span-12 md:col-span-4' },
    { label: 'DESCRIPCIÓN', control: 'descripcion', type: 'text', style: 'col-span-12 md:col-span-4' },
  ]

  async getItems() {
    const res = await this.inventoryService.getItems();
    console.log(res);
    if (res.success) {
      this.items = res.data.content;
      this.total = res.data.totalElements;
    }
  }

  async change({}:any){}

  refresh({}:any){}

  onRow({}:any){}

}
