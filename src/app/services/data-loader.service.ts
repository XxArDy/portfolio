import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  constructor(private http: HttpClient) {}

  async loadJson<T>(fileName: string): Promise<T> {
    const url = `data/${fileName}.json`;
    return await firstValueFrom(this.http.get<T>(url));
  }
}
