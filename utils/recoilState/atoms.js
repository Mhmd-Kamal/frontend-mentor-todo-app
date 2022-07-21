import { atom } from 'recoil';

export const todosAtom = atom({ key: 'todos', default: [] });

export const filterAtom = atom({ key: 'filter', default: 'all' });
