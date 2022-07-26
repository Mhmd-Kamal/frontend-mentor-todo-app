import { selector } from 'recoil';

import { todosAtom, filterAtom, todosOrderAtom } from './atoms';

export const filteredTodosSelector = selector({
  key: 'filteredTodos',
  get: ({ get }) => {
    const todos = get(OrderedTodosSelector);
    // console.log(todos);
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

export const OrderedTodosSelector = selector({
  key: 'orderedTodos',
  get: ({ get }) => {
    const todos = get(todosAtom);
    const order = get(todosOrderAtom);

    const orderedTodos = order.map((id) =>
      todos.find((todo) => todo._id === id)
    );

    return orderedTodos;
  },
});
