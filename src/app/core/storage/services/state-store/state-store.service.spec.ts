import { TestBed } from '@angular/core/testing';
import { StateStoreService, StorageService } from '@app/core';
import { Injectable } from '@angular/core';
import { asyncScheduler, scheduled } from 'rxjs';

const prefixKey: string = 'prefix-key';
const storageKey: string = 'teste-key';
const initialState: State = { data: 'Teste state', dataTest: 'Data teste' };

interface State {
  data: string;
  dataTest: string;
}

@Injectable()
class TestStateStoreService extends StateStoreService<State> {
  public constructor() {
    super(prefixKey, storageKey);
  }

  public initialState(): State {
    return initialState;
  }
}

describe('StateStoreService', () => {
  let service: TestStateStoreService;
  let storageService: StorageService;

  beforeEach(() => {
    storageService = new StorageService(prefixKey);
    storageService.clear();

    TestBed.configureTestingModule({
      providers: [
        TestStateStoreService,
        {
          provide: StorageService,
          useValue: storageService,
        },
      ],
    });

    service = TestBed.inject(TestStateStoreService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar o estado inicial se não houver estado armazenado', () => {
    const state = service.getState();
    expect(state).toEqual({ data: 'Teste state', dataTest: 'Data teste' });
  });

  it('deve carregar o estado do StorageService se disponível', () => {
    const storedState: State = { data: 'Teste state', dataTest: 'Data teste' };
    storageService.setItem(storageKey, storedState);

    const newService = new TestStateStoreService();
    expect(newService.getState()).toEqual(storedState);
  });

  it('deve atualizar o estado e persistir no StorageService', () => {
    const newState: State = {
      data: 'Teste state update',
      dataTest: 'Data teste update',
    };
    service.updateState(newState);

    expect(service.getState()).toEqual(newState);
  });

  it('deve atualizar parcialmente o estado', () => {
    service.updateState(initialState);

    const newData: string = 'Teste state update partial';
    service.updatePartialState({
      data: newData,
    });

    expect(service.getState().data).toEqual(newData);
    expect(service.getState().dataTest).toEqual(initialState.dataTest);
  });

  it('deve limpar o estado e remover do StorageService', () => {
    service.clearState();

    expect(service.getState()).toBeUndefined();
    expect(storageService.getItem(storageKey)).toBeNull();
  });

  it('deve resetar o estado para o valor inicial', () => {
    const newState: State = {
      data: 'Teste state',
      dataTest: 'Data teste',
    };
    service.updateState(newState);

    service.resetState();

    expect(service.getState()).toEqual(initialState);
  });

  describe('deve testar setCustomKey', () => {
    it('deve atualizar customStorageKey e chamar emitState', () => {
      const newKey = 'novo-key';
      const emitStateSpy = spyOn(
        service,
        'emitInitialState' as never,
      ).and.callThrough();

      service.setCustomKey(newKey);

      expect(service['customStorageKey']).toBe(newKey);
      expect(emitStateSpy).toHaveBeenCalled();
    });

    it('deve refletir customStorageKey no getStoreKey', () => {
      const newKey = 'novo-key';
      service.setCustomKey(newKey);

      const expectedStoreKey = `${newKey}:${storageKey}`;
      expect(service['getStoreKey']()).toBe(expectedStoreKey);
    });
  });

  describe('deve testar getCustomKey', () => {
    it('deve retornar o customStorageKey padrão', () => {
      const customKey = service.getCustomKey();
      expect(customKey).toBe('');
    });

    it('deve retornar o customStorageKey atualizado', () => {
      const newKey = 'novo-key';
      service.setCustomKey(newKey);
      const customKey = service.getCustomKey();
      expect(customKey).toBe(newKey);
    });
  });

  describe('deve testar hasCustomKey', () => {
    it('deve retornar true quando o customKey está presente no StorageService', () => {
      const newKey = 'novo-key';
      service.setCustomKey(newKey);
      const customKey = service['getStoreKey']();

      storageService.setItem(customKey, {});

      const result = service.hasCustomKey(newKey);
      expect(result).toBeTrue();
    });

    it('deve retornar false quando o customKey não está presente no StorageService', () => {
      const newKey = 'novo-key';
      service.setCustomKey(newKey);
      const customKey = service['getStoreKey']();

      storageService.setItem(customKey, {});

      const result = service.hasCustomKey('key-diferente');
      expect(result).toBeFalse();
    });
  });

  describe('deve testar clearStateAll', () => {
    it('deve chamar o método emitState com undefined e a opção de emitir como true', () => {
      const emitStateSpy = spyOn(
        service,
        'emitState' as never,
      ).and.callThrough();

      service.clearStateAll();

      expect(emitStateSpy).toHaveBeenCalled();
    });
  });

  describe('deve testar clearAllStorages', () => {
    it('deve chamar o método clearAllStorages do store', () => {
      localStorage.setItem(
        'prefixoTeste:item1',
        JSON.stringify({ valor: 'item1' }),
      );
      sessionStorage.setItem(
        'prefixoTeste:item3',
        JSON.stringify({ valor: 'item3' }),
      );

      expect(localStorage.getItem('prefixoTeste:item1')).toBeTruthy();
      expect(sessionStorage.getItem('prefixoTeste:item3')).toBeTruthy();

      storageService.clearAllStorages();

      expect(localStorage.getItem('prefixoTeste:item1')).toBeNull();
      expect(sessionStorage.getItem('prefixoTeste:item3')).toBeNull();
    });
  });

  describe('deve testar state$', () => {
    it('deve testar o state$ com state vazio', (done) => {
      const stateMock: State = {
        data: 'teste',
        dataTest: 'teste',
      };

      service['valueState'] = {
        data: 'teste',
        dataTest: 'teste',
      };
      service['stateStore$'] = scheduled([undefined], asyncScheduler);

      service.state$.subscribe((state) => {
        expect(state).toEqual(stateMock);
        done();
      });
    });
  });
});
