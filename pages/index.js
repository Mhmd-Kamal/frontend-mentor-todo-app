import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import NewTodo from '../components/NewTodo';
import TodosList from '../components/TodosList';

import darkThemeImg from '../public/icon-moon.svg';
import { filterAtom, todosAtom } from '../utils/recoilState/atoms';
import { filteredTodosSelector } from '../utils/recoilState/selectors';

const Home = () => {
  const filteredTodos = useRecoilValue(filteredTodosSelector);
  const [filter, setFilter] = useRecoilState(filterAtom);
  const setTodos = useSetRecoilState(todosAtom);

  async function fetchData() {
    console.log(todos);
    const res = await fetch('/api/todos');
    const todos = await res.json();
    setTodos(todos);
  }

  useEffect(() => {
    fetchData();
  }, []);

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
        <TodosList todos={filteredTodos} />
        <ul
          id='filters_div'
          className='flex bg-light-Very-Light-Gray font-bold cursor-pointer text-light-Dark-Grayish-Blue justify-center items-center gap-4 shadow-md rounded-md py-4 shadow-light-Very-Light-Grayish-Blue'
          onClick={(e) => setFilter(e.target.id)}
        >
          <li className={filter === 'all' && 'text-Bright-Blue'} id='all'>
            All
          </li>
          <li className={filter === 'active' && 'text-Bright-Blue'} id='active'>
            Active
          </li>
          <li
            className={filter === 'completed' && 'text-Bright-Blue'}
            id='completed'
          >
            Completed
          </li>
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

// export async function getServerSideProps({ req }) {
//   const protocol = req.headers['x-forwarded-proto'] || 'http';
//   const baseURl = req ? `${protocol}://${req.headers.host}` : '';
//   const res = await fetch(baseURl + '/api/todos');
//   const todos = await res.json();
//   return { props: { todos } };
// }
