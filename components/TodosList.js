import { useRecoilValue } from 'recoil';

import { todosAtom } from '../utils/recoilState/atoms';
import { filteredTodosSelector } from '../utils/recoilState/selectors';

import { SummaryBar } from './SummaryBar';
import { TodoItem } from './TodoItem';

function TodosList({ provided }) {
  const filteredTodos = useRecoilValue(filteredTodosSelector);
  const todos = useRecoilValue(todosAtom);
  return (
    <div className='flex flex-col divide-y divide-light-Very-Light-Grayish-Blue dark:divide-dark-Very-Dark-Grayish-Blue bg-light-Very-Light-Gray rounded-md shadow-md shadow-light-Very-Light-Grayish-Blue dark:shadow-none dark:bg-dark-Very-Dark-Desaturated-Blue'>
      {filteredTodos.map((todo, index) => (
        <TodoItem key={todo._id} todo={todo} index={index} />
      ))}

      {todos.length > 0 && <SummaryBar todos={todos} />}

      {provided.placeholder}
    </div>
  );
}

export default TodosList;
