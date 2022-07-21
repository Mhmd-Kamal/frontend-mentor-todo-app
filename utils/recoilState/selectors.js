import { selector } from 'recoil';

import { todosAtom, filterAtom } from './atoms';

export const filteredTodosSelector = selector({
  key: 'filteredTodos',
  get: ({ get }) => {
    const todos = get(todosAtom);
    const filter = get(filterAtom);
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
});
