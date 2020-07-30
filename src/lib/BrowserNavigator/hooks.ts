import {useContext, useMemo} from 'react';
import {browserNavigatorContext} from './context';
import {BrowserNavigatorContext} from './types';

/**
 * Hook which returns BrowserNavigator context
 * @returns {BrowserNavigatorContext}
 */
export const useNavigatorContext = () => {
  const context = useContext(browserNavigatorContext);

  if (!context) {
    throw new Error(
      'useBrowserNavigator hook was called outside of BrowserNavigator ' +
      'context. You should not call this hook in elements which are not ' +
      'children of BrowserNavigator'
    );
  }

  return context;
};

/**
 * Creates hook which takes passed field from navigator
 * @param {F} field
 * @returns {() => BrowserNavigatorContext[F]}
 */
function createHook<F extends keyof BrowserNavigatorContext>(field: F) {
  return (): BrowserNavigatorContext[F] => {
    const ctx = useNavigatorContext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => ctx[field], [ctx[field]]);
  };
}

/**
 * Hook which returns current navigator location
 * @type {() => BrowserNavigatorContext['location']}
 */
export const useLocation = createHook('location');

/**
 * Hook which returns current navigator history
 * @type {() => BrowserNavigatorContext['history']}
 */
export const useHistory = createHook('history');

/**
 * Hook which returns navigator
 * @type {() => BrowserNavigatorContext['navigator']}
 */
export const useNavigator = createHook('navigator');
