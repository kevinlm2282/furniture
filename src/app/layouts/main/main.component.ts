import { Component, computed } from '@angular/core';
import { MediaQueryService } from '../../common/media-query.service';
import { NavbarMainComponent } from '../../components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar'
import * as JsonData from '../../../../public/menu.json';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'main-layout',
  imports: [
    NavbarMainComponent,
    SidebarComponent,
    CardModule,
    SidebarModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainLayout {

  mediaQuery = computed(() => this.mediaQueryService.mediaQuery())
  selected = { label: '404', icon: 'pi pi-spin pi-globe' }
  menus = this.mappingMenu(JsonData)
  side = false
  openSide = false
  constructor(
    private mediaQueryService:MediaQueryService
  ){
    console.log("el mediaQuery",this.mediaQuery())
    console.log(this.menus)
  }

  home() {
  }

  logout(){
    
  }

  toggleSidebar(event: any) {
    this.openSide = true
    this.side = event
    if (!event)
      setTimeout(() => this.openSide = false, 200)
  }

  mappingMenu(menus:any, type: string = ''): any {
    const listMenus:Array<any> = []
    for (const element of menus.default) {
      const menu:any = {
          tipo: element.tipo,
          label: element.nombre,
          icon: element.icon,
          expanded: true,
          path: element.ruta,
          children: [],
          styleClass: 'text-[--bg-option] fill-[--bg-option]'
      }
      listMenus.push(menu)
    }
    return listMenus
    // return menus?.map((item:any, index: number) => ({
    //   key: `${type}${item.tipo}-${index}`,
    //   tipo: item.tipo,
    //   label: item.nombre,
    //   icon: item.icon,
    //   expanded: true,
    //   path: item.ruta,
    //   children: item.childrens ? this.mappingMenu(item.childrens, `${type}${item.tipo}-`) : null,
    //   styleClass: 'text-[--bg-option] fill-[--bg-option]'
    // }))
  }
    
}
