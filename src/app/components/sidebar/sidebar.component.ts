import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { GlobalService } from '../../common/global.service';


@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [TreeModule, DividerModule, AvatarModule, ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent  {
  @Input() menus: Array<any> = []
  @Input() title: string = ''
  @Input() subTitle: string = ''
  selectedNode!: any
  @Output() selectMenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {}

  toggleMenu(event: any) {
    if (event?.node?.children && event?.node?.children != 0) {
      event.node.expanded = !event.node.expanded
      return;
    }
    this.globalService.page.set({
      ...event.node
    })
    this.selectMenu.emit(event)
    this.router.navigate([event.node.path])
  }
}