type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

export class ObjectUtils {
  public static isObject(item: unknown): boolean {
    return Boolean(item && typeof item === 'object');
  }

  public static isObjectNullOrEmpty(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      return Object.keys(obj).length === 0;
    }

    return false;
  }

  public static isObjectEmpty<T extends object>(
    obj: T | null | undefined,
  ): boolean {
    if (!obj || typeof obj !== 'object') return true;

    return Object.values(obj).every((value) => {
      if (value === null || value === undefined || value === '') return true;
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === 'object' && !(value instanceof Date))
        return this.isObjectEmpty(value);
      return false;
    });
  }

  public static transformValueObjectString<T extends object>(
    obj: T | null | undefined,
  ): { [key in keyof T]: string | T[key] } | null {
    if (!obj || typeof obj !== 'object') return null;

    const transformedObj = {} as { [key in keyof T]: string | T[key] };

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        transformedObj[key] =
          value === null || value === undefined ? '' : value;
      }
    }

    return transformedObj;
  }

  public static mergeObject<T>(
    target: T,
    ...sources: RecursivePartial<T>[]
  ): T {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target as object, { [key]: {} });
          this.mergeObject(target[key], source[key] as object);
        } else {
          Object.assign(target as object, { [key]: source[key] });
        }
      }
    }

    return this.mergeObject(target, ...sources);
  }

  public static equals(object1: unknown, object2: unknown): boolean {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  public static totalPropertiesWithValue(
    obj: object | undefined | null,
    options?: { excludeProps?: string[]; onlyOwnProperty?: boolean },
  ): number {
    const { excludeProps = [], onlyOwnProperty = false } = options
      ? options
      : {};

    return obj
      ? Object.entries(obj).filter(
          ([key, value]) =>
            // eslint-disable-next-line no-prototype-builtins
            (!onlyOwnProperty || obj.hasOwnProperty(key)) &&
            !excludeProps.includes(key) &&
            (value || value === 0) &&
            !(Array.isArray(value) && value.length === 0),
        ).length
      : 0;
  }

  public static getEnumKeys<T>(anEnum: T): string[] {
    return Object.keys(anEnum as []);
  }

  public static getEnumValues<T>(anEnum: T): string[] {
    return ObjectUtils.getEnumKeys(anEnum).map(
      (key) => anEnum[key as keyof T],
    ) as string[];
  }

  public static recordToArray<K extends string | number | symbol, V>(
    record: Record<K, V>,
  ): V[] {
    return Object.values(record);
  }

  public static recordToKeys<K extends string | number | symbol, V>(
    record: Record<K, V>,
    convertKey?: (key: string) => K,
  ): K[] {
    return Object.entries(record)
      .filter(([_, value]) => Boolean(value))
      .map(([key]) => (convertKey ? convertKey(key) : (key as K)));
  }

  public static deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  public static groupBy<T, K extends PropertyKey>(
    array: T[],
    keyGetter: (item: T) => K,
  ): Record<K, T[]> {
    return array.reduce(
      (acc, item) => {
        const key = keyGetter(item);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      },
      {} as Record<K, T[]>,
    );
  }

  public static sort<T>(options: T[], atribute: string = 'label'): T[] {
    const collator = new Intl.Collator('pt-BR', {
      sensitivity: 'base',
      ignorePunctuation: true,
    });

    return options.sort((a, b) =>
      collator.compare(a[atribute as never], b[atribute as never]),
    );
  }

  public static distinct<T>(options: T[]): T[] {
    return [...new Set(options)];
  }
}
