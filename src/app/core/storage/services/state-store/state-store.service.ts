import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';

interface OptionStateStore {
  useLocalStorage: boolean;
  initialEmit: boolean;
}

export abstract class StateStoreService<T> extends StorageService {
  private stateStore$: Observable<T | undefined>;
  private valueState!: T;
  private stateSubject: ReplaySubject<T>;
  private customStorageKey: string = '';

  protected constructor(
    private readonly prefixKey: string,
    private readonly storageKey: string,
    readonly stateOptions: Partial<OptionStateStore> = {
      useLocalStorage: false,
      initialEmit: true,
    },
  ) {
    const {useLocalStorage, initialEmit} = stateOptions;
    super(prefixKey, useLocalStorage);

    this.stateSubject = new ReplaySubject<T>(1);
    this.stateStore$ = this.stateSubject.asObservable();
    if (initialEmit) {
      this.emitInitialState();
    }
  }

  public abstract initialState(): T;

  public setCustomKey(key: string): void {
    this.customStorageKey = key;
    this.emitInitialState();
  }

  public getCustomKey(): string {
    return this.customStorageKey;
  }

  public hasCustomKey(key: string): boolean {
    const customKey = this.prefixKey + ':' + key + ':' + this.storageKey;

    return this.getKeys().some((k) => k.includes(customKey));
  }

  public updateState(
    newState: T,
    options: { emit: boolean } = {emit: true},
  ): void {
    this.saveToStorage(newState);
    this.emitState(newState, options);
  }

  public updatePartialState(
    partialState: Partial<T>,
    options: { emit: boolean } = {emit: true},
  ): void {
    const currentState = this.valueState;
    const newState = {...currentState, ...partialState};
    this.saveToStorage(newState);
    this.emitState(newState, options);
  }

  public get state$(): Observable<T | undefined> {
    return this.stateStore$.pipe(map((state) => state || this.valueState));
  }

  public getState(): T {
    return this.valueState;
  }

  public clearState(options: { emit: boolean } = {emit: true}): void {
    this.valueState = undefined as unknown as T;
    this.removeItem(this.getStoreKey());
    this.emitState(undefined as unknown as T, options);
  }

  public clearStateAll(options: { emit: boolean } = {emit: true}): void {
    this.clear();
    this.emitState(undefined as unknown as T, options);
  }

  public resetState(options: { emit: boolean } = {emit: true}): void {
    this.updateState(this.initialState(), options);
  }

  private emitInitialState() {
    const storedState = this.loadFromStorage();
    this.valueState = storedState || this.initialState();
    this.stateSubject.next(this.valueState);
  }

  private emitState(newState: T, options: { emit: boolean }) {
    if (options.emit) {
      this.stateSubject.next(newState);
    }
  }

  private loadFromStorage(): T | null {
    return this.getItem(this.getStoreKey());
  }

  private saveToStorage(state: T): void {
    this.valueState = state;
    this.setItem(this.getStoreKey(), state);
  }

  private getStoreKey(): string {
    return this.customStorageKey
      ? `${this.customStorageKey}:${this.storageKey}`
      : this.storageKey;
  }
}
