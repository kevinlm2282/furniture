import { MediaQueryService } from './../../common/media-query.service';
import { Component, OnInit, computed } from '@angular/core';
// import { GlobalService } from '@common/global.service';
// import { StorageService } from '@common/storage.service';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
import { StorageService } from '../../common/storage.service';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomePage implements OnInit {
  nombre = ''
  menus: Array<any> = []
  responsive = [
    {
      breakpoint: '2400px',
      numVisible: 5,
      numScroll: 5
    },
    {
      breakpoint: '1800px',
      numVisible: 4,
      numScroll: 4
    },
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '1000px',
        numVisible: 2,
        numScroll: 2
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  mediaQuery = computed(() => {
    return this.mediaQueryService.mediaQuery()
  });
  constructor (
    private storage: StorageService,
    private global: GlobalService,
    private router: Router,
    private mediaQueryService: MediaQueryService
  ){}

  ngOnInit(): void {
    const usuario = this.storage.local.getItemStorage('usuario')
    this.menus = this.storage.local.getItemStorage('menu')?.filter((menu: any) => menu.childrens != 0)
    this.nombre = this.fullname(usuario)
  }

  fullname(row: any) {
    const fullname: Array<string> = []
    if (row?.nombres) fullname.push(row.nombres.trim())
    if (row?.primerApellido) fullname.push(row.primerApellido.trim())
    if (row?.segundoApellido) fullname.push(row.segundoApellido.trim())
    return fullname.join(' ')
  }

  redirect(menu: any) {
    this.global.page.set({ icon: menu.icon || 'pi pi-tags', label: menu.nombre.toUpperCase() })
    this.router.navigate([menu.ruta])
  }

  upper(text: string) {
    return text.toUpperCase()
  }
}
