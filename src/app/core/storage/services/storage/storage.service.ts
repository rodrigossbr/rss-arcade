export abstract class StorageService {
  private readonly storage: Storage;
  private readonly prefix: string;

  protected constructor(prefix: string, useLocalStorage: boolean = false) {
    this.prefix = prefix;
    console.log('STORAGE', localStorage, sessionStorage)
    this.storage = useLocalStorage ? localStorage : sessionStorage;
  }

  protected setItem<T>(key: string, value: T): void {
    const fullKey = this.getKey(key);
    const stringValue = JSON.stringify(value);
    this.storage.setItem(fullKey, stringValue);
  }

  protected getItem<T>(key: string): T | null {
    const fullKey = this.getKey(key);
    const value = this.storage.getItem(fullKey);
    return value ? (JSON.parse(value) as T) : null;
  }

  protected getKeys(): string[] {
    return Object.keys(this.storage).filter((key) => {
      return key.startsWith(this.prefix);
    });
  }

  protected removeItem(key: string): void {
    const fullKey = this.getKey(key);
    this.storage.removeItem(fullKey);
  }

  protected clear(): void {
    Object.keys(this.storage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        this.storage.removeItem(key);
      }
    });
  }

  public clearAllStorages(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }
}
