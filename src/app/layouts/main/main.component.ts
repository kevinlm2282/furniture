import { Component, computed } from '@angular/core';
import { MediaQueryService } from '../../common/media-query.service';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar'
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Menu } from '../../models/main.model';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../common/global.service';
import { NavbarMainComponent } from '../../components/navbar/main/main.component';
import { ThemeService } from '../../common/theme.service';
import { StorageService } from '../../common/storage.service';


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
  selected = computed(() => this.globalService.page() || { label: '404', icon: 'pi pi-spin pi-globe', description: ''})
  menus: Array<any> = []
  side = false
  openSide = false
  theme = 'light';
  title = "KEVIN"
  subTitle ="use01@gmail.com"
  
  constructor(
    private themeService:ThemeService,
    private storge:StorageService,
    private mediaQueryService:MediaQueryService,
    private globalService:GlobalService,
    private router:Router
  ){
    const menu = this.storge.local.getItemStorage('menu')
    this.menus = this.mappingMenu(menu)
    this.theme = this.themeService.theme();
    this.title = this.storge.local.getItemStorage('role')
    this.subTitle = this.storge.local.getItemStorage('user')
    let data = this.globalService.page.set(this.optionSelect(menu))
    console.log(data)
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
    return menus?.map((item:any, index: number) => (console.log(item.tipo),{
      key: `${type}${item.tipo}-${index}`,
      tipo: item.tipo,
      label: item.nombre,
      description: item.descripcion,
      icon: item.icon,
      expanded: true,
      path: item.ruta,
      children: item.childrens ? this.mappingMenu(item.childrens, `${type}${item.tipo}-${index}-`) : null,
      styleClass: 'text-[var(--bg-option)] fill-[var(--bg-option)]'
    }))
  }

  optionSelect(menus: Array<Menu>) {
    const elements: Array<Menu> = []
    if (!menus) return { label: '404', icon: 'pi pi-spin pi-globe' }
    for (const item of menus) {
      if (item.childrens && item.childrens.length > 0)
        elements.push(...item.childrens)
      if (!item.childrens || item.childrens.length === 0)
        elements.push(item)
    }
    // elements.push({ nombre: 'Inicio', icon: 'pi pi-home', ruta: '/app/invetory', tipo: 'MENU', childrens: []})
    elements.unshift({ nombre: 'Inicio', icon: 'pi pi-home', ruta: '/app/invetory', tipo: 'MENU', childrens: []})
    console.log(elements)
    console.log(this.router.url)
    const select = elements.find((item) => (this.router.url || '').startsWith(item.ruta || ''))
    if (select) return { label: select?.nombre || '4041', icon: select?.icon || 'pi pi-tags' }
    return { label: 'Home Page', icon: 'pi pi-home' }
  }
    
}
