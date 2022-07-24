import { SummaryBar } from './SummaryBar';
import { TodoItem } from './TodoItem';

function TodosList({ todos, provided }) {
  return (
    <div className='flex flex-col divide-y divide-light-Very-Light-Grayish-Blue dark:divide-dark-Very-Dark-Grayish-Blue bg-light-Very-Light-Gray rounded-md shadow-md shadow-light-Very-Light-Grayish-Blue dark:shadow-none dark:bg-dark-Very-Dark-Desaturated-Blue'>
      {todos.map((todo, index) => (
        <TodoItem key={todo._id} todo={todo} index={index} />
      ))}

      {todos.length > 0 && <SummaryBar todos={todos} />}

      {provided.placeholder}
    </div>
  );
}

export default TodosList;
