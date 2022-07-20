import Image from 'next/image';

import deleteIcon from '../public/icon-cross.svg';

function TodosList({ todos }) {
  return (
    <div className='flex flex-col divide-y bg-light-Very-Light-Gray rounded-md shadow-md shadow-light-Very-Light-Grayish-Blue'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length > 0 && <SummaryBar todos={todos} />}
    </div>
  );
}

export default TodosList;

function TodoItem({ todo }) {
  return (
    <div className='w-full rounded-md'>
      <div className='flex items-center gap-3 px-6 py-4'>
        <input
          // ref={checkbox}
          checked={todo.completed}
          className='w-5 h-5 transition-all border rounded-full appearance-none cursor-pointer border-light-Very-Light-Grayish-Blue focus:outline-none checked:gradient'
          type='checkbox'
          name='completed'
          id='completed_checkbox'
        />
        <p
          className={`flex-1 text-light-Very-Dark-Grayish-Blue focus:outline-none placeholder:text-xs ${
            todo.completed === true && 'line-through'
          }`}
        >
          {todo.text}
        </p>

        <button className='flex items-center cursor-pointer'>
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

function SummaryBar({ todos }) {
  const left = todos.filter((todo) => todo.completed === false);
  return (
    <div className='flex items-center justify-between px-6 py-4 text-light-Dark-Grayish-Blue'>
      <p className=''>{left.length} items left</p>
      <button>Clear Completed</button>
    </div>
  );
}
