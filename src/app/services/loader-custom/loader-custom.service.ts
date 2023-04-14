import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export const globalLoading = new Subject<boolean>();
export let _loading = false;

@Injectable({
  providedIn: 'root'
})
export class LoaderCustomService {
  private _componentLoaders = new Map<string, Subject<boolean>>();
  loading = new Subject<boolean>();
  emitter = new EventEmitter<{id: string | undefined; loading: boolean}>();

  constructor(private http?: HttpClient) {
    if (!http) {

    }
  }

  start(id?: string, withSubject?: boolean): any {
    if (id) {
      if (!this._componentLoaders.get(id)) {
        this._componentLoaders.set(id, new Subject<boolean>());
      }
      this._componentLoaders.get(id)?.next(true);
      if (withSubject) {
        return this._componentLoaders.get(id);
      }
      return;
    }
    globalLoading.next(true);
  }

  stop(id?: string, withSubject?: boolean): any {
    if (id) {
      if (!this._componentLoaders.get(id)) {
        return Error('Loader not found!');
        
      }
      this._componentLoaders.get(id)?.next(false);
      if (withSubject) {
        return this._componentLoaders.get(id);
      }
      return;
    }
    globalLoading.next(false);
  }

  subscribe(opts?: any, id?: string) {
    if (id) {
      return this._componentLoaders.get(id)?.subscribe(opts ? opts: undefined);
    }
    return this.loading.subscribe(opts ? opts: undefined);
  }

  unsubscribe(opts?: any, id?: string) {
    if (id) {
      const sub = this._componentLoaders.get(id)?.unsubscribe;
      return this._componentLoaders.get(id)?.subscribe(opts ? opts: undefined);
    }
    return this.loading.subscribe(opts ? opts: undefined);
  }

  emit(id?: string) {
    let loadingVal = false;
    this.loading.pipe(map(next => next)).subscribe(val => loadingVal = val);
    this.emitter.emit({
      id: id,
      loading: loadingVal
    });
  }

}
