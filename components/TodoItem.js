import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import deleteIcon from '../public/icon-cross.svg';
import { todosAtom } from '../utils/recoilState/atoms';

export function TodoItem({ todo }) {
  const setTodos = useSetRecoilState(todosAtom);

  async function handleDelete(deletedTodo) {
    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: 'DELETE',
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
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const data = await res.json();
    // console.log(data);
    if (res.ok)
      setTodos((todos) => {
        const index = todos.findIndex((todo) => todo._id === modifiedTodo._id);
        return [...todos.slice(0, index), data.todo, ...todos.slice(index + 1)];
      });
  }

  return (
    <div className='w-full '>
      <div className='flex items-center gap-3 px-6 py-4'>
        <input
          onChange={() => handleCheckTodo(todo)}
          checked={todo.completed}
          className='w-5 h-5  border rounded-full appearance-none cursor-pointer border-light-Very-Light-Grayish-Blue dark:border-dark-Very-Dark-Grayish-Blue focus:outline-none checked:gradient'
          type='checkbox'
          name='completed'
          id='completed_checkbox'
        />
        <p
          className={`flex-1 text-light-Very-Dark-Grayish-Blue dark:text-dark-Dark-Grayish-Blue focus:outline-none placeholder:text-xs ${
            todo.completed === true &&
            'line-through text-light-Grayish-Blue dark:text-dark-Very-Dark-Grayish-Blue'
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
