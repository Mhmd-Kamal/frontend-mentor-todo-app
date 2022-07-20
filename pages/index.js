import Head from 'next/head';
import Image from 'next/image';

import NewTodo from '../components/NewTodo';
import TodosList from '../components/TodosList';

import darkThemeImg from '../public/icon-moon.svg';

const Home = () => {
  const todos = [
    { id: 1, text: 'Learn Next.js', completed: true },
    { id: 2, text: 'Learn React', completed: false },
    { id: 3, text: 'Learn Tailwind', completed: true },
    { id: 4, text: 'Learn Styled-Components', completed: false },
    { id: 5, text: 'Learn GraphQL', completed: false },
    { id: 6, text: 'Learn Apollo', completed: false },
  ];
  return (
    <div className='flex flex-col items-stretch min-h-screen px-5 text-sm bg-no-repeat bg-mobile-light bg-light-Very-Light-Grayish-Blue'>
      {/* TODO: add head tag. */}
      <div className='flex items-baseline justify-between w-full py-8'>
        <h1 className='text-2xl font-bold tracking-[0.4em] text-light-Very-Light-Gray'>
          TODO
        </h1>
        <button>
          <Image
            width={20}
            height={20}
            src={darkThemeImg}
            alt='theme selector'
          />
        </button>
      </div>
      <div className='flex-grow flex flex-col gap-4'>
        <NewTodo />
        <TodosList todos={todos} />
        <ul
          id='filters_div'
          className='flex bg-light-Very-Light-Gray font-bold text-light-Dark-Grayish-Blue justify-center items-center gap-4 shadow-md rounded-md py-4 shadow-light-Very-Light-Grayish-Blue'
        >
          <li>All</li>
          <li>Active</li>
          <li>Completed</li>
        </ul>
      </div>
      <div className=''>
        <p className='pb-16 text-sm text-center text-light-Dark-Grayish-Blue'>
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
};

export default Home;
