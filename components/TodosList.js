import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import deleteIcon from '../public/icon-cross.svg';
import { todosAtom } from '../utils/recoilState/atoms';

function TodosList({ todos }) {
  return (
    <div className='duration-1000 flex flex-col divide-y bg-light-Very-Light-Gray rounded-md shadow-md shadow-light-Very-Light-Grayish-Blue'>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
      {todos.length > 0 && <SummaryBar todos={todos} />}
    </div>
  );
}

export default TodosList;

function TodoItem({ todo }) {
  const setTodos = useSetRecoilState(todosAtom);

  async function handleDelete(deletedTodo) {
    try {
      const res = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ id: deletedTodo._id }),
      });
      if (res.ok)
        setTodos((todos) =>
          todos.filter((todo) => todo._id !== deletedTodo._id)
        );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckTodo(modifiedTodo) {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ id: todo._id, completed: !todo.completed }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok)
      setTodos((todos) => {
        const index = todos.findIndex((todo) => todo._id === modifiedTodo._id);
        return [...todos.slice(0, index), data.todo, ...todos.slice(index + 1)];
      });
  }

  return (
    <div className='w-full rounded-md'>
      <div className='flex items-center gap-3 px-6 py-4'>
        <input
          onChange={() => handleCheckTodo(todo)}
          checked={todo.completed}
          className='w-5 h-5 transition-all border rounded-full appearance-none cursor-pointer border-light-Very-Light-Grayish-Blue focus:outline-none checked:gradient'
          type='checkbox'
          name='completed'
          id='completed_checkbox'
        />
        <p
          className={`flex-1 text-light-Very-Dark-Grayish-Blue focus:outline-none placeholder:text-xs ${
            todo.completed === true && 'line-through text-light-Grayish-Blue'
          }`}
        >
          {todo.text}
        </p>

        <button
          onClick={() => handleDelete(todo)}
          className='flex items-center cursor-pointer'
        >
          <Image
            src={deleteIcon}
            width={15}
            height={15}
            alt='todo delete icon'
          />
        </button>
      </div>
    </div>
  );
}

function SummaryBar() {
  const todos = useRecoilValue(todosAtom);
  const left = todos.filter((todo) => todo.completed === false);
  return (
    <div className='flex items-center justify-between px-6 py-4 text-light-Dark-Grayish-Blue'>
      <p className=''>{left.length} items left</p>
      <button>Clear Completed</button>
    </div>
  );
}
