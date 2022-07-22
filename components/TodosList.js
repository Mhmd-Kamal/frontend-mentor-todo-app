import { SummaryBar } from './SummaryBar';
import { TodoItem } from './TodoItem';

function TodosList({ todos }) {
  return (
    <div className='flex flex-col divide-y divide-light-Very-Light-Grayish-Blue dark:divide-dark-Very-Dark-Grayish-Blue bg-light-Very-Light-Gray rounded-md shadow-md shadow-light-Very-Light-Grayish-Blue dark:shadow-none dark:bg-dark-Very-Dark-Desaturated-Blue'>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
      {todos.length > 0 && <SummaryBar todos={todos} />}
    </div>
  );
}

export default TodosList;
