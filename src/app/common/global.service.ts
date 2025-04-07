import { Injectable, signal } from '@angular/core';
import { Main } from '../models/main.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  page = signal<Main | undefined>(undefined)
  constructor() { }
}
