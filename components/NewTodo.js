import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { todosAtom, todosOrderAtom } from '../utils/recoilState/atoms';

function NewTodo() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [order, setOrder] = useRecoilState(todosOrderAtom);
  const checkbox = useRef();
  const [text, setText] = useState('');

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      // console.log(order);
      const completed = checkbox.current.checked;
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ text, completed, order }),
      });
      const data = await res.json();
      if (res.ok) {
        setTodos((todos) => [data.newTodo, ...todos]);
        setOrder((order) => [data.newTodo._id, ...order]);
      }

      setText('');
      checkbox.current.checked = false;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full bg-white dark:bg-dark-Very-Dark-Desaturated-Blue rounded-md'>
      <form
        onSubmit={handleSubmit}
        className='flex items-stretch gap-3 px-6 py-4'
      >
        <input
          ref={checkbox}
          className='w-5 h-5 transition-all border rounded-full appearance-none cursor-pointer border-light-Very-Light-Grayish-Blue dark:border-dark-Very-Dark-Grayish-Blue focus:outline-none checked:gradient'
          type='checkbox'
          name='status'
          id='completed_checkbox'
        />
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
          className='flex-1 text-light-Very-Dark-Grayish-Blue focus:outline-none placeholder:text-xs bg-inherit'
          placeholder='Create a new todo...'
          type='text'
          name='text'
          id='new_todo_text'
        />
      </form>
    </div>
  );
}

export default NewTodo;
