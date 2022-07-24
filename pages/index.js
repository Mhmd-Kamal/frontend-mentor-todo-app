import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import NewTodo from '../components/NewTodo';
import TodosList from '../components/TodosList';
import Filters from '../components/Filters';

import darkThemeImg from '../public/icon-moon.svg';
import lightThemeImg from '../public/icon-sun.svg';

import { darkModeAtom, todosAtom } from '../utils/recoilState/atoms';
import { filteredTodosSelector } from '../utils/recoilState/selectors';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Home = () => {
  const filteredTodos = useRecoilValue(filteredTodosSelector);
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);

  async function fetchData() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    setTodos(todos);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const newTodos = [...todos];
    // newTodos.splice(result.source.index, 1);
    // newTodos.splice(
    //   result.destination.index,
    //   0,
    //   todos
    // );

    // TODO: rearrange todos to be {{id: 1, ...}, {id: 2, ...}, ...,{order:[1,2,3,4,5]}}
  };

  return (
    <div className='flex justify-center min-h-screen text-sm bg-no-repeat bg-mobile-light desktop:bg-desktop-light bg-light-Very-Light-Grayish-Blue dark:bg-mobile-dark dark:bg-dark-Very-Dark-Blue dark:desktop:bg-desktop-dark'>
      <div
        className={`flex flex-col items-stretch  px-5 w-full md:w-4/5 lg:w-2/5`}
      >
        <Head>
          <title>Todos App</title>
          <link rel='icon' href='/favicon-32x32.png' />
          <meta
            name='description'
            content='A solution for frontend mentor todo app challenge'
          />
          <meta content='text/html;charset=UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta name='application-name' content='Todos App' />
        </Head>
        <div className='flex items-baseline justify-between w-full py-8'>
          <h1 className='text-2xl font-bold tracking-[0.4em] text-light-Very-Light-Gray'>
            TODO
          </h1>
          <button onClick={() => setDarkMode(!darkMode)}>
            <Image
              width={20}
              height={20}
              src={darkMode ? lightThemeImg : darkThemeImg}
              alt='theme selector'
            />
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='flex-grow flex flex-col gap-4'>
            <NewTodo />

            {filteredTodos.length === 0 ? (
              <div>lodaing...</div>
            ) : (
              <Droppable droppableId='droppable'>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TodosList provided={provided} todos={filteredTodos} />
                    {/* {provided.placeholder} */}
                  </div>
                )}
              </Droppable>
            )}

            <div className='block xl:hidden'>
              <Filters />
            </div>
          </div>
        </DragDropContext>
        <div className=''>
          <p className='pb-16 pt-4 text-sm text-center text-light-Dark-Grayish-Blue dark:text-dark-Dark-Grayish-Blue'>
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
