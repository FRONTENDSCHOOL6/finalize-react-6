import pipe from 'ramda/es/pipe';
import { createWithEqualityFn } from 'zustand/traditional';
import { devtools, persist } from 'zustand/middleware';
import { immer } from '@/middlewares/immer';
import { log } from '@/middlewares/log';

const withPersist = (config) => persist(config, { name: 'app-store' });

const createStore = pipe(
  devtools,
  immer,
  log,
  withPersist,
  createWithEqualityFn
);

export default createStore;
