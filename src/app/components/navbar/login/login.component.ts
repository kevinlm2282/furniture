import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../common/theme.service';

@Component({
  selector: 'navbar-login',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class NavbarLoginComponent implements OnInit {
  @Output() onLogo: EventEmitter<any> = new EventEmitter();

  theme = 'sun'

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    console.log("el tema es")
    const theme = this.themeService.getTheme()
    this.theme = theme === 'dark' ? 'moon' : 'sun'
  }

  changeTheme() {
    // const theme = this.themeService.setTheme()
    // this.theme = theme === 'dark'? 'moon' : 'sun'
    const theme = this.themeService.setTheme()
    this.theme = theme === 'dark'? 'moon' : 'sun'
    console.log(`se cambia de tema ${theme}`)
  }

  logo() {
    this.onLogo.emit()
  }
}
