import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState, useRecoilState } from 'recoil';

import deleteIcon from '../public/icon-cross.svg';
import { todosAtom, todosOrderAtom } from '../utils/recoilState/atoms';

export function TodoItem({ todo, index }) {
  const setTodos = useSetRecoilState(todosAtom);
  const [order, setOrder] = useRecoilState(todosOrderAtom);

  async function handleDelete(deletedTodo) {
    try {
      setTodos((todos) => todos.filter((todo) => todo._id !== deletedTodo._id));

      const newOrder = order.filter((id) => id !== deletedTodo._id);
      setOrder(newOrder);

      const res = await fetch(`/api/todos/${deletedTodo._id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ newOrder }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckTodo(modifiedTodo) {
    setTodos((todos) => {
      const index = todos.findIndex((todo) => todo._id === modifiedTodo._id);
      return [
        ...todos.slice(0, index),
        { ...todos[index], completed: !todos[index].completed },
        ...todos.slice(index + 1),
      ];
    });

    const res = await fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    if (!res.ok) {
      setTodos((todos) => {
        const index = todos.findIndex((todo) => todo._id === modifiedTodo._id);
        return [
          ...todos.slice(0, index),
          { ...todo[index], completed: !todo[index].completed },
          ...todos.slice(index + 1),
        ];
      });
    }
  }

  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided, snapshot) => (
        <div
          className='w-full  bg-light-Very-Light-Gray dark:bg-dark-Very-Dark-Desaturated-Blue'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
              className={`flex-1 text-light-Very-Dark-Grayish-Blue dark:text-light-Dark-Grayish-Blue focus:outline-none placeholder:text-xs ${
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
      )}
    </Draggable>
  );
}
