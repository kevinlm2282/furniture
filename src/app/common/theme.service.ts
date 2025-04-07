import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document:Document) { }

  setTheme(){
    let mode
    mode = mode === 'light' ? 'dark' : 'light'
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement
    if (theme) theme.href = `${mode}.css`
    return mode
  }

  getTheme() {
    const mode ='light';
    const theme = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (theme) theme.href = `${mode}.css`
    return mode
  }
}
