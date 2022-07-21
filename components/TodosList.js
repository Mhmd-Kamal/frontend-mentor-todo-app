import { SummaryBar } from './SummaryBar';
import { TodoItem } from './TodoItem';

function TodosList({ todos }) {
  return (
    <div className='duration-1000 flex flex-col divide-y bg-light-Very-Light-Gray rounded-md shadow-md shadow-light-Very-Light-Grayish-Blue'>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
      {todos.length > 0 && <SummaryBar todos={todos} />}
    </div>
  );
}

export default TodosList;
