import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class EventBusService {
    public tokenSubject$ = new Subject<string>();
    private accessToken = '';
    private infoMenu: string[] = [];

    public getAccessToken(): string {
        return this.accessToken;
      }

      public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
        this.tokenSubject$.next(accessToken);
      }

      public getInfoMenu(): string[] {
        return this.infoMenu;
      }

      public setInfoMenu(menu: string[]): void {
        this.infoMenu = menu;
      }
  }