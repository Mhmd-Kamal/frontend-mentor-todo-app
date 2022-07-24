import { useSetRecoilState } from 'recoil';
import { todosAtom } from '../utils/recoilState/atoms';
import Filters from './Filters';

export function SummaryBar({ todos }) {
  const setTodos = useSetRecoilState(todosAtom);

  const left = todos.filter((todo) => todo.completed === false);

  const completedIDs = todos
    .filter((todo) => todo.completed === true)
    .map((todo) => todo._id);

  async function handleDeleteCompleted() {
    const res = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ completedIDs }),
    });

    const data = await res.json();
    setTodos(data.todos);
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
