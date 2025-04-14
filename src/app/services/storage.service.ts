import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'event_management_data';

  getData<T>(key: string): T[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed[key] || [];
  }

  setData<T>(key: string, items: T[]): void {
    const data = localStorage.getItem(this.storageKey);
    const parsed = data ? JSON.parse(data) : {};
    parsed[key] = items;
    localStorage.setItem(this.storageKey, JSON.stringify(parsed));
  }
}