import { useSetRecoilState, useRecoilState } from 'recoil';
import { todosAtom, todosOrderAtom } from '../utils/recoilState/atoms';
import Filters from './Filters';

export function SummaryBar({ todos }) {
  const setTodos = useSetRecoilState(todosAtom);
  const [order, setOrder] = useRecoilState(todosOrderAtom);

  const left = todos.filter((todo) => todo.completed === false);

  const completedIDs = todos
    .filter((todo) => todo.completed === true)
    .map((todo) => todo._id);

  async function handleDeleteCompleted() {
    setTodos((todos) => todos.filter((todo) => !todo.completed));

    const newOrder = order.filter((id) => {
      const index = todos.findIndex((todo) => todo._id === id);
      return !todos[index].completed;
    });

    setOrder(newOrder);

    const res = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ completedIDs, order: newOrder }),
    });
  }

  return (
    <div className=' order-last flex items-center justify-between px-6 py-4 text-light-Dark-Grayish-Blue dark:text-light-Very-Dark-Grayish-Blue'>
      <p className=''>{left.length} items left</p>
      <div className='hidden xl:flex'>
        <Filters />
      </div>
      <button onClick={handleDeleteCompleted}>Clear Completed</button>
    </div>
  );
}
