import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
// import { ThemeService } from '@common/theme.service';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table'
// import { Notify } from '@models/main.model';
import { DividerModule } from 'primeng/divider';
import { ThemeService } from '../../common/theme.service';

@Component({
  selector: 'navbar-main',
  standalone:true,
  imports: [
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    BadgeModule,
    OverlayPanelModule,
    TableModule,
    DividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarMainComponent {

  @Input() mediaQuery: string = ''
  @Input() sidebarOpen: boolean = false
  @Input() showSiderbar: boolean = true
  @Input() showNotification: boolean = false
  @Input() showLogout: boolean = true
  // @Input() notifiers: Array<Notify> = []

  @Output() onMenu: EventEmitter<any> = new EventEmitter();
  @Output() onLogout: EventEmitter<any> = new EventEmitter();
  @Output() onLogo: EventEmitter<any> = new EventEmitter();
  @Output() onNotify: EventEmitter<any> = new EventEmitter();

  theme = 'sun'
  selectedProduct?: any

  constructor(
    private themeService: ThemeService,
    // private globalService: GlobalService,
    // private router: Router,
  ) {}

  ngOnInit(): void {
    const theme = this.themeService.getTheme()
    this.theme = theme === 'dark' ? 'moon' : 'sun'
  }

  changeTheme() {
    console.log("se cambia de tema")
    const theme = this.themeService.setTheme()
    this.theme = theme === 'dark'? 'moon' : 'sun'
  }

  menu() {
    this.sidebarOpen = !this.sidebarOpen
    this.onMenu.emit(this.sidebarOpen)
  }

  logout() {
    this.onLogout.emit()
  }

  logo() {
    this.onLogo.emit()
  }

  // actionNotify(notify: Notify, op: OverlayPanel) {
  //   notify.data.notifyActive = true
  //   this.globalService.notify.set(notify)
  //   this.router.navigate([notify.path])
  //   this.onNotify.emit(notify)
  //   op.hide()
  // }
}
