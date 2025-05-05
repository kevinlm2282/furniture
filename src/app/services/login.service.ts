import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login/login.request.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Endpoints } from './endpoints';
import { BackendResponse } from '../models/response.model';
import { LoginResponse } from '../models/login/login.response.model';
import { UserData } from '../models/login/user.data.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient ) { }

  login(data: LoginRequest) {
    return firstValueFrom(
      this.http.post<BackendResponse<LoginResponse>>(`${this.API_URL}/${Endpoints.login}`, data)
    );
  }

  userInfo(
    token: string,
  ) {
    return firstValueFrom(
      this.http.get<BackendResponse<UserData>>(`${this.API_URL}/${Endpoints.userInfo}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
}
