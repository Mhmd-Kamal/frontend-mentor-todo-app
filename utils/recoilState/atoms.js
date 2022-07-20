import { atom } from 'recoil';

export const todosAtom = atom({
  key: 'todos',
  default: [
    { id: 1, text: 'Learn Next.js', completed: true },
    { id: 2, text: 'Learn React', completed: false },
    { id: 3, text: 'Learn Tailwind', completed: true },
    { id: 4, text: 'Learn Styled-Components', completed: false },
    { id: 5, text: 'Learn GraphQL', completed: false },
    { id: 6, text: 'Learn Apollo', completed: false },
  ],
});
export const filterAtom = atom({ key: 'filter', default: 'all' });
