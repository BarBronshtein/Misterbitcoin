import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Cache } from '../models/cache.model';
@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  protected CACHE_KEY: string;
  private cache: Cache;
  constructor(private http: HttpClient) {
    this.CACHE_KEY = 'cache';
    this.cache =
      JSON.parse(localStorage.getItem(this.CACHE_KEY) || 'null') || {};
  }

  public getRate(coins: number) {
    const key = 'currency';
    if (this.cache[key]) return of(this.cache[key] * coins);
    return this.http
      .get<number>(`https://blockchain.info/tobtc?currency=USD&value=1`)
      .pipe(
        map((res) => {
          this.cache.currency = res;
          localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
          return res * coins;
        })
      );
  }

  public getConfirmedTransactions() {
    const key = 'transactions';
    if (this.cache[key]) return of(this.cache[key]);
    return this.http
      .get(
        `https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&format=json&cors=true`
      )
      .pipe(
        map((res: any) => {
          this.cache[key] = res.values.map(
            ({ y }: { y: number; x: Date }) => y
          );
          localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
          return this.cache[key];
        })
      );
  }

  public getMarketPrice() {
    const key = 'price';
    if (this.cache[key]) return of(this.cache[key]);

    return this.http
      .get(
        `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
      )
      .pipe(
        map((res: any) => {
          this.cache[key] = res.values.map(({ y }: { y: number }) => y);
          localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
          return this.cache[key];
        })
      );
  }
}
