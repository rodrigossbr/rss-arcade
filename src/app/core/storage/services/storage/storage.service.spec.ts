import { StorageService } from '@app/core';

interface StorageModelTest {
  data: string;
}

describe('StorageService', () => {
  const runTests = (useLocalStorage?: boolean) => {
    let storageService: StorageService;
    const prefix = 'testPrefix';
    const storage = useLocalStorage ? localStorage : sessionStorage;
    const storageName = useLocalStorage ? 'localStorage' : 'sessionStorage';

    beforeEach(() => {
      if (useLocalStorage == undefined) {
        storageService = new StorageService(prefix);
      } else {
        storageService = new StorageService(prefix, useLocalStorage);
      }

      storage.clear();
    });

    afterEach(() => {
      storage.clear();
    });

    describe(`usando ${storageName}`, () => {
      it('deve adicionar um item ao storage com o prefixo correto', () => {
        const key: string = 'testKey';
        const value = { data: 'testData' };
        storageService.setItem(key, value);

        const storedValue = storage.getItem(`${prefix}:${key}`);
        expect(storedValue).not.toBeNull();
        expect(JSON.parse(storedValue!)).toEqual(value);
      });

      it('deve recuperar um item do storage com o prefixo correto', () => {
        const key: string = 'testKey';
        const value: StorageModelTest = { data: 'testData' };
        storage.setItem(`${prefix}:${key}`, JSON.stringify(value));

        const retrievedValue = storageService.getItem(key);
        expect(retrievedValue).toEqual(value);
      });

      it('deve retornar null para um item não existente', () => {
        const key: string = 'nonExistentKey';
        const retrievedValue: StorageModelTest | null =
          storageService.getItem(key);
        expect(retrievedValue).toBeNull();
      });

      it('deve remover um item do storage com o prefixo correto', () => {
        const key: string = 'testKey';
        const value: StorageModelTest = { data: 'testData' };
        storage.setItem(`${prefix}:${key}`, JSON.stringify(value));

        storageService.removeItem(key);
        const removedValue: string | null = storage.getItem(`${prefix}:${key}`);
        expect(removedValue).toBeNull();
      });

      it('deve limpar todos os itens com o prefixo', () => {
        const key1: string = 'testKey1';
        const key2: string = 'testKey2';
        const value: StorageModelTest = { data: 'testData' };

        storage.setItem(`${prefix}:${key1}`, JSON.stringify(value));
        storage.setItem(`${prefix}:${key2}`, JSON.stringify(value));
        storage.setItem(`otherPrefix:testKey3`, JSON.stringify(value));

        storageService.clear();

        expect(storage.getItem(`${prefix}:${key1}`)).toBeNull();
        expect(storage.getItem(`${prefix}:${key2}`)).toBeNull();
        expect(storage.getItem(`otherPrefix:testKey3`)).not.toBeNull();
      });

      it('deve limpar todos os itens de localStorage e sessionStorage', () => {
        localStorage.setItem(
          'prefixoTeste:item1',
          JSON.stringify({ valor: 'item1' }),
        );
        localStorage.setItem(
          'outroPrefixo:item2',
          JSON.stringify({ valor: 'item2' }),
        );
        sessionStorage.setItem(
          'prefixoTeste:item3',
          JSON.stringify({ valor: 'item3' }),
        );
        sessionStorage.setItem(
          'outroPrefixo:item4',
          JSON.stringify({ valor: 'item4' }),
        );

        expect(localStorage.getItem('prefixoTeste:item1')).toBeTruthy();
        expect(localStorage.getItem('outroPrefixo:item2')).toBeTruthy();
        expect(sessionStorage.getItem('prefixoTeste:item3')).toBeTruthy();
        expect(sessionStorage.getItem('outroPrefixo:item4')).toBeTruthy();

        storageService.clearAllStorages();

        expect(localStorage.getItem('prefixoTeste:item1')).toBeNull();
        expect(localStorage.getItem('outroPrefixo:item2')).toBeNull();
        expect(sessionStorage.getItem('prefixoTeste:item3')).toBeNull();
        expect(sessionStorage.getItem('outroPrefixo:item4')).toBeNull();
      });
    });
  };

  runTests(); // Testes default para sessionStorage
  runTests(false); // Testes para sessionStorage
  runTests(true); // Testes para localStorage
});
