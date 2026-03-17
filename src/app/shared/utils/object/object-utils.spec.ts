import { ObjectUtils } from '@shared/utils';

describe('ObjectUtils', () => {
  describe('isObject', () => {
    it('deve retornar true para objetos', () => {
      expect(ObjectUtils.isObject({})).toBe(true);
      expect(ObjectUtils.isObject({ key: 'value' })).toBe(true);
    });

    it('deve retornar false para não-objetos', () => {
      expect(ObjectUtils.isObject(null)).toBe(false);
      expect(ObjectUtils.isObject(undefined)).toBe(false);
      expect(ObjectUtils.isObject(42)).toBe(false);
      expect(ObjectUtils.isObject('string')).toBe(false);
    });

    it('deve retornar true para null ou undefined', () => {
      expect(ObjectUtils.isObjectEmpty(null)).toBe(true);
      expect(ObjectUtils.isObjectEmpty(undefined)).toBe(true);
    });

    it('deve retornar true para objetos vazios', () => {
      expect(ObjectUtils.isObjectEmpty({})).toBe(true);
    });

    it('deve retornar false para objetos não vazios', () => {
      expect(ObjectUtils.isObjectEmpty({ key: 'value' })).toBe(false);
      expect(ObjectUtils.isObjectEmpty({ key: 0 })).toBe(false);
    });

    it('deve retornar true para objetos com todos os valores nulos, undefined ou vazios', () => {
      expect(ObjectUtils.isObjectEmpty({ key: null })).toBe(true);
      expect(ObjectUtils.isObjectEmpty({ key: undefined })).toBe(true);
      expect(ObjectUtils.isObjectEmpty({ key: '' })).toBe(true);
      expect(ObjectUtils.isObjectEmpty({ key: [] })).toBe(true);
    });

    it('deve retornar false para objetos com ao menos um valor válido', () => {
      expect(ObjectUtils.isObjectEmpty({ key: 42 })).toBe(false);
      expect(ObjectUtils.isObjectEmpty({ key: 'value' })).toBe(false);
      expect(ObjectUtils.isObjectEmpty({ key: [1, 2, 3] })).toBe(false);
      expect(ObjectUtils.isObjectEmpty({ key: new Date() })).toBe(false);
    });

    it('deve retornar true para objetos aninhados vazios', () => {
      const obj = { key: { nestedKey: null } };
      expect(ObjectUtils.isObjectEmpty(obj)).toBe(true);
    });

    it('deve retornar false para objetos aninhados não vazios', () => {
      const obj = { key: { nestedKey: 'value' } };
      expect(ObjectUtils.isObjectEmpty(obj)).toBe(false);
    });

    it('deve retornar true para arrays vazios dentro de objetos', () => {
      const obj = { key: [] };
      expect(ObjectUtils.isObjectEmpty(obj)).toBe(true);
    });

    it('deve retornar false para arrays não vazios dentro de objetos', () => {
      const obj = { key: [1, 2] };
      expect(ObjectUtils.isObjectEmpty(obj)).toBe(false);
    });

    it('deve retornar false para instâncias de Date', () => {
      const obj = { date: new Date() };
      expect(ObjectUtils.isObjectEmpty(obj)).toBe(false);
    });
  });

  describe('transformValueObjectString', () => {
    it('deve retornar null se o objeto for null ou undefined', () => {
      expect(ObjectUtils.transformValueObjectString(null)).toBeNull();
      expect(ObjectUtils.transformValueObjectString(undefined)).toBeNull();
    });

    it('deve transformar valores nulos ou indefinidos em strings vazias', () => {
      const obj = { a: null, b: undefined, c: 123, d: 'test' };
      const result = ObjectUtils.transformValueObjectString(obj);
      expect(result).toEqual({ a: '', b: '', c: 123, d: 'test' });
    });

    it('deve manter os valores que não são nulos ou indefinidos', () => {
      const obj = { a: 1, b: 'string', c: true };
      const result = ObjectUtils.transformValueObjectString(obj);
      expect(result).toEqual({ a: 1, b: 'string', c: true });
    });

    it('deve retornar um objeto vazio se o objeto de entrada for vazio', () => {
      const obj = {};
      const result = ObjectUtils.transformValueObjectString(obj);
      expect(result).toEqual({});
    });
  });

  describe('mergeObject', () => {
    it('deve mesclar dois objetos', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = ObjectUtils.mergeObject(target, source);
      expect(result).toEqual({ a: 1, b: 3, c: 4 } as never);
    });

    it('deve mesclar objetos aninhados', () => {
      const target = { a: 1, b: { x: 1, y: 2 } };
      const source = { b: { y: 3, z: 4 }, c: 5 };
      const result = ObjectUtils.mergeObject(target, source);
      expect(result).toEqual({ a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 } as never);
    });

    it('deve lidar com múltiplas fontes', () => {
      const target = { a: 1 };
      const source1 = { b: 2 };
      const source2 = { c: 3 };
      const result = ObjectUtils.mergeObject(
        target,
        source1 as never,
        source2 as never,
      );
      expect(result).toEqual({ a: 1, b: 2, c: 3 } as never);
    });

    it('não deve modificar o destino se nenhuma fonte for fornecida', () => {
      const target = { a: 1 };
      const result = ObjectUtils.mergeObject(target);
      expect(result).toEqual({ a: 1 });
    });

    it('deve criar objetos aninhados se eles não existirem no destino', () => {
      const target = { a: 1 };
      const source = { b: { c: 2 } };
      const result = ObjectUtils.mergeObject(target, source as object);
      expect(result).toEqual({ a: 1, b: { c: 2 } } as never);
    });
  });

  describe('equals', () => {
    it('deve retornar true para objetos iguais', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };

      expect(ObjectUtils.equals(obj1, obj2)).toBeTrue();
    });

    it('deve retornar false para objetos diferentes', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };

      expect(ObjectUtils.equals(obj1, obj2)).toBeFalse();
    });

    it('deve retornar true para arrays iguais', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3];

      expect(ObjectUtils.equals(arr1, arr2)).toBeTrue();
    });

    it('deve retornar false para arrays diferentes', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 4];

      expect(ObjectUtils.equals(arr1, arr2)).toBeFalse();
    });

    it('deve retornar false para valores primitivos diferentes', () => {
      const value1 = 1;
      const value2 = 2;

      expect(ObjectUtils.equals(value1, value2)).toBeFalse();
    });

    it('deve retornar true para valores primitivos iguais', () => {
      const value1 = 'test';
      const value2 = 'test';

      expect(ObjectUtils.equals(value1, value2)).toBeTrue();
    });

    it('deve retornar false para null comparado com null', () => {
      expect(ObjectUtils.equals(null, null)).toBeTrue();
    });

    it('deve retornar false para undefined comparado com undefined', () => {
      expect(ObjectUtils.equals(undefined, undefined)).toBeTrue();
    });

    it('deve retornar false para um objeto comparado com um array', () => {
      const obj = { a: 1, b: 2 };
      const arr = [1, 2, 3];

      expect(ObjectUtils.equals(obj, arr)).toBeFalse();
    });

    it('deve retornar false para null comparado com um objeto', () => {
      const obj = { a: 1, b: 2 };

      expect(ObjectUtils.equals(null, obj)).toBeFalse();
    });

    it('deve retornar false para undefined comparado com um objeto', () => {
      const obj = { a: 1, b: 2 };

      expect(ObjectUtils.equals(undefined, obj)).toBeFalse();
    });
  });

  describe('deve testar recordToArray', () => {
    it('deve converter um Record com objetos aninhados em um array de valores', () => {
      const record = {
        key1: { prop: 'valor1' },
        key2: { prop: 'valor2' },
        key3: { prop: 'valor3' },
      };

      const result = ObjectUtils.recordToArray(record);
      expect(result).toEqual([
        { prop: 'valor1' },
        { prop: 'valor2' },
        { prop: 'valor3' },
      ]);
    });
  });

  describe('deve testar totalPropertiesWithValue', () => {
    class Parent {
      public inheritedProp: number = 10;
    }

    class Child extends Parent {
      public ownProp1: string = 'value';
      public ownProp2: number = 0;
      public ownProp3: number | null = null;
    }

    it('deve retornar 0 quando o objeto for null ou undefined', () => {
      expect(ObjectUtils.totalPropertiesWithValue(null)).toBe(0);
      expect(ObjectUtils.totalPropertiesWithValue(undefined)).toBe(0);
    });

    it('deve contar todas as propriedades com valor, incluindo 0, mas excluindo nulas e indefinidas', () => {
      const obj = { prop1: 'value', prop2: 0, prop3: null, prop4: undefined };
      expect(ObjectUtils.totalPropertiesWithValue(obj)).toBe(2);
    });

    it('deve excluir as propriedades listadas em excludeProps', () => {
      const obj = { prop1: 'value', prop2: 0, prop3: 'another', prop4: null };
      expect(
        ObjectUtils.totalPropertiesWithValue(obj, {
          excludeProps: ['prop1', 'prop3'],
        }),
      ).toBe(1);
    });

    it('deve contar apenas propriedades próprias quando onlyOwnProperty for true', () => {
      const instance = new Child();
      expect(
        ObjectUtils.totalPropertiesWithValue(instance, {
          onlyOwnProperty: true,
        }),
      ).toBe(3);
    });

    it('deve contar todas as propriedades, próprias e herdadas, quando onlyOwnProperty for false', () => {
      const instance = new Child();
      expect(
        ObjectUtils.totalPropertiesWithValue(instance, {
          onlyOwnProperty: false,
        }),
      ).toBe(3);
    });

    it('deve excluir propriedades herdadas e ignorar propriedades em excludeProps ao mesmo tempo', () => {
      const instance = new Child();
      expect(
        ObjectUtils.totalPropertiesWithValue(instance, {
          onlyOwnProperty: true,
          excludeProps: ['ownProp1'],
        }),
      ).toBe(2);
    });

    it('deve ignorar arrays vazios na contagem', () => {
      const obj = { prop1: 'value', prop2: 0, prop3: [], prop4: [1, 2, 3] };
      expect(ObjectUtils.totalPropertiesWithValue(obj)).toBe(3);
    });
  });

  describe('isObjectNullOrEmpty', () => {
    it('deve retornar true para null', () => {
      expect(ObjectUtils.isObjectNullOrEmpty(null)).toBeTrue();
    });

    it('deve retornar true para undefined', () => {
      expect(ObjectUtils.isObjectNullOrEmpty(undefined)).toBeTrue();
    });

    it('deve retornar true para um objeto vazio', () => {
      expect(ObjectUtils.isObjectNullOrEmpty({})).toBeTrue();
    });

    it('deve retornar false para um objeto com propriedades', () => {
      expect(ObjectUtils.isObjectNullOrEmpty({ key: 'value' })).toBeFalse();
    });

    it('deve retornar false para um array (não considerado vazio)', () => {
      expect(ObjectUtils.isObjectNullOrEmpty([])).toBeFalse();
    });

    it('deve retornar false para uma string vazia (não é objeto)', () => {
      expect(ObjectUtils.isObjectNullOrEmpty('')).toBeFalse();
    });

    it('deve retornar false para um número (não é objeto)', () => {
      expect(ObjectUtils.isObjectNullOrEmpty(0)).toBeFalse();
    });

    it('deve retornar false para um booleano (não é objeto)', () => {
      expect(ObjectUtils.isObjectNullOrEmpty(true)).toBeFalse();
    });

    it('deve retornar true para um objeto criado com Object.create(null)', () => {
      const obj = Object.create(null); // Objeto sem prototype
      expect(ObjectUtils.isObjectNullOrEmpty(obj)).toBeTrue();
    });
  });

  describe('ObjectUtils.recordToKeys', () => {
    it('deve retornar chaves de um Record (string, boolean) com valores truthy', () => {
      const input: Record<string, boolean> = {
        a: true,
        b: false,
        c: true,
      };

      const result = ObjectUtils.recordToKeys(input);
      expect(result).toEqual(['a', 'c']);
    });

    it('deve retornar chaves de um Record (number, boolean) com valores truthy', () => {
      const input: Record<number, boolean> = {
        1: true,
        2: false,
        3: true,
      };

      const result = ObjectUtils.recordToKeys(input, Number);
      expect(result).toEqual([1, 3]);
    });

    it('deve funcionar com Record (string, unknown) com múltiplos tipos de valor', () => {
      const input: Record<string, unknown> = {
        a: 1,
        b: '',
        c: 'hello',
        d: null,
        e: undefined,
        f: [],
      };

      const result = ObjectUtils.recordToKeys(input);
      expect(result).toEqual(['a', 'c', 'f']);
    });
  });

  describe('groupBy', () => {
    interface ItemTeste {
      nome: string;
      perfil: 'ASSISTENTE' | 'ASSESSOR';
    }

    const integrantes: ItemTeste[] = [
      { nome: 'João', perfil: 'ASSISTENTE' },
      { nome: 'Maria', perfil: 'ASSESSOR' },
      { nome: 'Carlos', perfil: 'ASSISTENTE' },
    ];

    it('deve agrupar os itens por perfil', () => {
      const agrupado = ObjectUtils.groupBy(integrantes, (item) => item.perfil);

      expect(Object.keys(agrupado)).toEqual(['ASSISTENTE', 'ASSESSOR']);
      expect(agrupado['ASSISTENTE'].length).toBe(2);
      expect(agrupado['ASSESSOR'].length).toBe(1);
      expect(agrupado['ASSISTENTE'].map((i) => i.nome)).toContain('João');
      expect(agrupado['ASSISTENTE'].map((i) => i.nome)).toContain('Carlos');
      expect(agrupado['ASSESSOR'][0].nome).toBe('Maria');
    });

    it('deve retornar objeto vazio se o array for vazio', () => {
      const agrupado = ObjectUtils.groupBy(
        [],
        (item: ItemTeste) => item.perfil,
      );
      expect(agrupado).toEqual({} as never);
    });
  });

  describe('Utils.distinct', () => {
    it('deve remover números duplicados preservando a ordem da 1ª ocorrência', () => {
      const input = [3, 1, 3, 2, 1, 2, 4];
      const out = ObjectUtils.distinct(input);
      expect(out).toEqual([3, 1, 2, 4]);
    });

    it('deve remover strings duplicadas preservando a ordem (case-sensitive como Set)', () => {
      const input = ['Álvaro', 'Ana', 'Álvaro', 'Bruno', 'Ana', 'Érico'];
      const out = ObjectUtils.distinct(input);
      expect(out).toEqual(['Álvaro', 'Ana', 'Bruno', 'Érico']);
    });

    it('não deve unificar objetos "iguais" por valor se forem referências diferentes', () => {
      const a1 = { id: 1, nome: 'A' };
      const a2 = { id: 1, nome: 'A' };
      const out = ObjectUtils.distinct([a1, a2]);
      expect(out.length).toBe(2);
      expect(out[0]).toBe(a1);
      expect(out[1]).toBe(a2);
    });
  });
});
