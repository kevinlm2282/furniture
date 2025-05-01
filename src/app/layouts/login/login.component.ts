import { Component, computed } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
// import { ThemeService } from '@common/theme.service';
// import { NavbarLoginComponent } from '@components/navbar/login/login.component';
import { CardModule } from 'primeng/card'
import { ThemeService } from '../../common/theme.service';
import { NavbarLoginComponent } from '../../components/navbar/login/login.component';

@Component({
  selector: 'login-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginLayout {
  theme = computed(() => {
    return this.themeService.theme()
  })
  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {}

  // background(theme: string) {
  //   return `url(assets/img/background-${ theme }.png)`
  // }

  home() {
    this.router.navigate(['/auth/login']);
  }
}
