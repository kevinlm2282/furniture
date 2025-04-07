import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { MatchMediaQuery } from './constants/global.constants';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { MediaQueryService } from './common/media-query.service';
import { ThemeService } from './common/theme.service';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy{
  
  title = 'furniture';
  mediaQuery?: string = MatchMediaQuery.md;
  private mediaQueryList?: MediaQueryList;
  private readonly destroy$: Subject<void> = new Subject<void>();
  private subscribes: Array<Subscription> = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mediaQueryService: MediaQueryService,
    private themeService: ThemeService,
  ){}

    ngOnDestroy(): void {
      this.subscribes.forEach(sub => sub.unsubscribe())
      this.destroy$.next();
      this.destroy$.complete();
    }
    
    ngOnInit(): void {
      this.getMediaQuery()
      this.themeService.setFirstTheme()
      const response = this.document.defaultView?.window
      if(!response) return;
        this.subscribes.push(
          fromEvent(response, 'resize')
            .subscribe(() => {
              this.getMediaQuery()
            })
          )
    }

    getMediaQuery(){
      for (const mediaQuery in MatchMediaQuery) {
        const value = MatchMediaQuery[mediaQuery]
        if (!this.document.defaultView?.matchMedia) return
          this.mediaQueryList = this.document.defaultView?.matchMedia(value)
        if (this.mediaQueryList?.matches) {
          this.mediaQuery = mediaQuery
          this.mediaQueryService.mediaQuery.set(this.mediaQuery)
        }
      }
    }

  
}
