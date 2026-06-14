import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  get title(): string {
    return 'BoMRA MIS';
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
