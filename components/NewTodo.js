import { useState, useRef } from 'react';

function NewTodo() {
  const checkbox = useRef();
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(checkbox.current.checked);
    console.log(text);
    setText('');
    checkbox.current.checked = false;
  }

  return (
    <div className='w-full bg-white rounded-md'>
      <form
        onSubmit={handleSubmit}
        className='flex items-stretch gap-3 px-6 py-4'
      >
        <input
          ref={checkbox}
          className='w-5 h-5 transition-all border rounded-full appearance-none cursor-pointer border-light-Very-Light-Grayish-Blue focus:outline-none checked:gradient'
          type='checkbox'
          name='status'
          id='completed_checkbox'
        />
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
          className='flex-1 text-light-Very-Dark-Grayish-Blue focus:outline-none placeholder:text-xs'
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
