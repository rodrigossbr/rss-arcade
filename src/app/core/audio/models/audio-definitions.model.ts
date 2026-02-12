import {AudioAction} from '@core/audio';

export interface AudioDefinitions<T extends string> {

  actions: AudioAction<T>[];
}
