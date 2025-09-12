import { Injectable } from '@angular/core';
import { MyLinks } from '../models/my-links'
import { DataLoaderService } from './data-loader.service'

@Injectable({ providedIn: 'root' })
export class SocialLinksService {
  private _links!: MyLinks;
  private _loaded = false;

  constructor(private _dataLoader: DataLoaderService) {}

  async getLinks(): Promise<MyLinks> {
    if (!this._loaded) {
      this._links = await this._dataLoader.loadJson<MyLinks>('myLinks');
      this._loaded = true;
    }
    return this._links;
  }
}
