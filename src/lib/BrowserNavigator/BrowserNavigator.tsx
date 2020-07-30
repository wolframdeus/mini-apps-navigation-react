import React, {
  memo, Reducer,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {browserNavigatorContext} from './context';

import {
  BrowserNavigatorContext,
  BrowserNavigatorProps,
  BrowserNavigatorState, BrowserNavigatorStateAction,
} from './types';
import {StateChangedEventParam} from '@mini-apps/navigation';

const {Provider} = browserNavigatorContext;

const reducer: Reducer<BrowserNavigatorState, BrowserNavigatorStateAction> = (
  state,
  action,
) => {
  if (action.type === 'state') {
    return action.payload;
  }
  if (action.type === 'location') {
    return {...state, location: action.payload};
  }
  return {...state, history: action.payload};
};

export const BrowserNavigator = memo<BrowserNavigatorProps>(
  function BrowserNavigator(props) {
    const {navigator, children} = props;

    const [state, dispatch] = useReducer(reducer, {
      location: navigator.location,
      history: navigator.history,
    });

    const context = useMemo<BrowserNavigatorContext>(() => ({
      ...state,
      navigator,
    }), [state, navigator]);

    // Update location and history in state when it changed in navigator
    useEffect(() => {
      const listener = ({stack, location}: StateChangedEventParam) => {
        if (location && stack) {
          dispatch({
            type: 'state',
            payload: {
              history: stack.currentStack,
              location: location.currentLocation,
            },
          });
        } else if (location) {
          dispatch({type: 'location', payload: location.currentLocation});
        } else if (stack) {
          dispatch({type: 'history', payload: [...stack.currentStack]});
        }
      };

      navigator.on('state-changed', listener);

      return () => navigator.off('state-changed', listener);
    }, [navigator]);

    return <Provider value={context}>{children}</Provider>;
  },
);
