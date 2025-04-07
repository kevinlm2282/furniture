import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document:Document) { }
  currentTheme = 'light'

  setTheme(){
    let mode = this.getTheme()
    mode = this.currentTheme === 'light' ? 'dark' : 'light'
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement
    if (theme) theme.href = `${mode}.css`
    this.currentTheme = mode
    return mode
  }

  getTheme() {
    return this.currentTheme
  }

  setFirstTheme() {
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement
    if (theme) {
      const mode = this.currentTheme === 'light' ? 'light' : 'dark'
      theme.href = `${mode}.css`
      this.currentTheme = mode
    }
  }
}
