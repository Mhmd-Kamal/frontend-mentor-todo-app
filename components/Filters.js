import { useRecoilState } from 'recoil';
import { filterAtom } from '../utils/recoilState/atoms';

export default function Filters({}) {
  const [filter, setFilter] = useRecoilState(filterAtom);

  return (
    <ul
      id='filters_div'
      className='flex bg-light-Very-Light-Gray dark:bg-dark-Very-Dark-Desaturated-Blue font-bold cursor-pointer text-light-Dark-Grayish-Blue dark:text-light-Very-Dark-Grayish-Blue justify-center items-center gap-4 shadow-md rounded-md py-4 xl:py-0 shadow-light-Very-Light-Grayish-Blue dark:shadow-none desktop:shadow-none'
      onClick={(e) => setFilter(e.target.id)}
    >
      <li className={filter === 'all' ? 'text-Bright-Blue' : ''} id='all'>
        All
      </li>
      <li className={filter === 'active' ? 'text-Bright-Blue' : ''} id='active'>
        Active
      </li>
      <li
        className={filter === 'completed' ? 'text-Bright-Blue' : ''}
        id='completed'
      >
        Completed
      </li>
    </ul>
  );
}
