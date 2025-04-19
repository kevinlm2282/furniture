import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse, Item, Page } from './types';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { Endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return firstValueFrom(
      this.httpClient.get<BackendResponse<Page<Item[]>>>(`${environment.apiUrl}/${Endpoints.items}`)
    );
  }
}
