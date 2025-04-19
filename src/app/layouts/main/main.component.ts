import { Component, computed } from '@angular/core';
import { MediaQueryService } from '../../common/media-query.service';
import { NavbarMainComponent } from '../../components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar'
import * as JsonData from '../../../../public/menu.json';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Menu } from '../../models/main.model';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'main-layout',
  imports: [
    NavbarMainComponent,
    SidebarComponent,
    CardModule,
    SidebarModule,
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainLayout {

  mediaQuery = computed(() => this.mediaQueryService.mediaQuery())
  selected = computed(() => this.globalService.page() || { label: '404', icon: 'pi pi-spin pi-globe' })
  menus: Array<any> = []
  side = false
  openSide = false
  
  constructor(
    private mediaQueryService:MediaQueryService,
    private globalService:GlobalService
  ){
    console.log("el mediaQuery",this.mediaQuery())
    // console.log(JsonData.data)
    this.menus = this.mappingMenu(JsonData.data)
  }

  home() {
    // this.router.navigate([menus[0].ruta])
  }

  logout(){
    
  }

  toggleSidebar(event: any) {
    this.openSide = true
    this.side = event
    if (!event)
      setTimeout(() => this.openSide = false, 200)
  }

  mappingMenu(menus: Array<Menu>, type: string = ''): any {
    // console.log(menus)
    return menus?.map((item:any, index: number) => (console.log(item.tipo),{
      key: `${type}${item.tipo}-${index}`,
      tipo: item.tipo,
      label: item.nombre,
      icon: item.icon,
      expanded: true,
      path: item.ruta,
      children: item.childrens ? this.mappingMenu(item.childrens) : null,
      styleClass: 'text-[--bg-option] fill-[--bg-option]'
    }))
  }
    
}
