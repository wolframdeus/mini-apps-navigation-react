import React, {
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {browserNavigatorContext} from './context';

import {
  BrowserNavigatorContext,
  BrowserNavigatorProps,
} from './types';
import {StateChangedEventParam} from '@mini-apps/navigation';

const {Provider} = browserNavigatorContext;

export const BrowserNavigator = memo<BrowserNavigatorProps>(
  function BrowserNavigator(props) {
    const {navigator, children} = props;

    const [navOptions, setNavOptions] = useState(() => ({
      state: navigator.state,
      history: navigator.history,
    }));

    const context = useMemo<BrowserNavigatorContext>(() => ({
      ...navOptions,
      navigator,
    }), [navOptions, navigator]);

    // Update state and history in state when it changed in navigator
    useEffect(() => {
      const listener = ({history, state}: StateChangedEventParam) => {
        setNavOptions(navOptions => ({
          state: state?.current || navOptions.state,
          history: history ? [...history.current] : navOptions.history,
        }));
      };

      navigator.on('change', listener);

      return () => navigator.off('change', listener);
    }, [navigator]);

    return <Provider value={context}>{children}</Provider>;
  },
);
