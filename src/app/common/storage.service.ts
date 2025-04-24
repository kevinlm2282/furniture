import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  private localStorage = this.document.defaultView?.localStorage

  local = {
    setItemStorage: (key: string, value: any) => {
      // key = `${environment.prefix}-${key}`
      // if (environment.production) {
      //   key = btoa(key)
      //   value = JSON.stringify(value)
      //   value = btoa(value)
      // }
      // if(key != 'theme'){value = JSON.stringify(value)}
      value = JSON.stringify(value)
      this.localStorage?.setItem(key, value)
    },
    getItemStorage: (key: string) => {
      // key = `${environment.prefix}-${key}`
      // if (environment.production)
      //   key = btoa(key)
      let value = this.localStorage?.getItem(key)
      if (!value) return null
      // if (environment.production)
      //   value = atob(value)
      return JSON.parse(value)
      // return value
    },
    setTheme: (key:string, value:any) => {
      this.localStorage?.setItem(key, value)
    },
    getTheme: (key: string) => {
      let value = this.localStorage?.getItem(key)
      return value
    }
    // removeItem: (key: string) => {
    //   key = `${environment.prefix}-${key}`
    //   if (environment.production)
    //     key = btoa(key)
    //   this.localStorage?.removeItem(key)
    // },
    // clear: () => this.localStorage?.clear()
  }
}
