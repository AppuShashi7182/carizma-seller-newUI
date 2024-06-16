import { IState } from '../models/IState';

export enum CacheKey {
  States = 'UsStates',
}

interface CacheValues {
  [CacheKey.States]: IState;
}

interface CacheUtil {
  set: <T extends CacheKey>(key: T, object: CacheValues[T]) => void;
  get: <T extends CacheKey>(key: T) => CacheValues[T];
  remove: (key: CacheKey) => void;
  removeAll: () => void;
}

export const cacheUtil: CacheUtil = {
  set: (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
  },
  get: (key) => JSON.parse(localStorage.getItem(key) ?? '{}'),
  remove: (key) => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
};
