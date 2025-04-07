
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    DividerModule,
    AvatarModule,
    ButtonModule,
    BadgeModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() menus: Array<any> = []

  @Output() selectMenu: EventEmitter<any> = new EventEmitter();

  usuario: string = ''
  cargo: string = ''
  entidad: string = ''
  data?: any

  constructor(
    private globalService: GlobalService,
    // private storageService: StorageService,
    private router: Router,
  ) {
    // const usuario = this.storageService.local.getItem('usuario')
    // this.data = usuario;
    // this.usuario = this.fullname(usuario)
    // this.cargo = usuario.cargo.nombre
    // this.entidad = usuario.cargo.entidad.nombre
  }

  fullname(row: any) {
    const fullname: Array<string> = []
    if (row?.nombre) fullname.push(row.nombre.trim())
    if (row?.primerApellido) fullname.push(row.primerApellido.trim())
    if (row?.segundoApellido) fullname.push(row.segundoApellido.trim())
    return fullname.join(' ')
  }

  toggleMenu(event: any) {
    this.globalService.page.set(event)
    this.selectMenu.emit(event)
    this.router.navigate([event.path])
  }

  edithProfile(){
    this.router.navigate(['app/personal'])
  }
}
