import { atom } from 'recoil';

export const todosAtom = atom({ key: 'todos', default: [] });

export const todosOrderAtom = atom({ key: 'todosOrder', default: [] });

export const filterAtom = atom({ key: 'filter', default: 'all' });

export const darkModeAtom = atom({ key: 'darkMode', default: false });
