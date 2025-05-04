import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Rule } from '../../models/form.model';
import * as JsonData from '../../../../public/menu.json';
import * as JsonDataSeller from '../../../../public/sellerMenu.json'
import { StorageService } from '../../common/storage.service';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/login/login.request.model';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    CardModule,
    ToastModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  loading: boolean = false

  rules: {
    username: Array<Rule>;
    password: Array<Rule>;
  } = {
    password: [{ type:'required', message: 'El campo es requerido' }],
    username: [{ type:'required', message: 'El campo es requerido' }],
  }

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private storage: StorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const token = this.storage.local.getItemStorage('token')
    if (token)
      this.router.navigate(['/app/home'])
  }

  disabled(disable: boolean, form: FormGroup) {
    this.loading = disable
    for (const key in form.controls)
      if (disable) form.get(key)?.disable()
      else form.get(key)?.enable()
  }

  async auth() {
    if (!this.form.valid) return
    // this.disabled(true, this.form)
    
    try {
      const loginResponse = await this.loginService.login({
        username: this.form.get('username')?.value || '',
        password: this.form.get('password')?.value || ''
      })

      this.storage.local.setItemStorage('token', loginResponse.data.accessToken)

      const userResponse = await this.loginService.userInfo(loginResponse.data.accessToken)
  
      this.loadResponse({role: userResponse.data.role, user: userResponse.data.username})

    } catch (error) {
      console.error(error)
      //TODO: add error message alert or something similar
      return
    }

  }

  loadResponse = (result: any) => {
    if(result.role == 'ADMINISTRATOR'){
      this.storage.local.setItemStorage('menu', JsonData.data)
    }
    if(result.role == 'SELLER'){
      this.storage.local.setItemStorage('menu', JsonDataSeller.data)
    }
    this.storage.local.setItemStorage('user', result.user)
    this.storage.local.setItemStorage('role', result.role)
    this.router.navigate([`/app/home`])
  }
}
