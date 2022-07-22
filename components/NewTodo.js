import { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosAtom } from '../utils/recoilState/atoms';

function NewTodo() {
  const setTodos = useSetRecoilState(todosAtom);

  const checkbox = useRef();
  const [text, setText] = useState('');

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const completed = checkbox.current.checked;

      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ text, completed }),
      });
      const data = await res.json();
      if (res.ok) setTodos((todos) => [...todos, data.newTodo]);

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
