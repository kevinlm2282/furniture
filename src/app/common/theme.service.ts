import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private storage = inject(StorageService);

  constructor(@Inject(DOCUMENT) private document:Document) {}
  theme = signal(this.storage.local.getTheme('theme') || 'light');
  // currentTheme = 'light'

  // setTheme(){
  //   let mode = this.getTheme()
  //   mode = this.currentTheme === 'light' ? 'dark' : 'light'
  //   const theme = this.document.getElementById('app-theme') as HTMLLinkElement
  //   if (theme) theme.href = `${mode}.css`
  //   this.currentTheme = mode
  //   return mode
  // }

  // getTheme() {
  //   return this.currentTheme
  // }

  // setFirstTheme() {
  //   const theme = this.document.getElementById('app-theme') as HTMLLinkElement
  //   if (theme) {
  //     const mode = this.currentTheme === 'light' ? 'light' : 'dark'
  //     theme.href = `${mode}.css`
  //     this.currentTheme = mode
  //   }
  // }

  setTheme() {
    let mode = this.storage.local.getTheme('theme')
    mode = mode === 'light' ? 'dark' : 'light'
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement
    if (theme) theme.href = `${mode}.css`
    this.theme.set(mode)
    this.storage.local.setTheme('theme', mode)
    return mode
  }

  getTheme() {
    const mode = this.storage.local.getTheme('theme') || 'light';
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement;
    this.storage.local.setTheme('theme', mode)
    if (theme) theme.href = `${mode}.css`
    return mode
  }
}
