import React from 'react';
import { useRecoilValue } from 'recoil';

import { darkModeAtom } from '../utils/recoilState/atoms';

function ThemeProvider(props) {
  const darkMode = useRecoilValue(darkModeAtom);

  return <div className={darkMode ? 'dark' : ''}>{props.children}</div>;
}

export default ThemeProvider;
