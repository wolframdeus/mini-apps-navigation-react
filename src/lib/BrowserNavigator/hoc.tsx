import React, {ComponentType, createElement} from 'react';
import {BrowserNavigatorContext} from './types';
import {
  useHistory,
  useLocation,
  useNavigator,
  useNavigatorContext,
} from './hooks';

interface HOCOptions {
  displayName?: string;
}

/**
 * Generator of HOCs
 * @param {F} field
 * @param {string} displayNameDefaultPrefix
 * @param {() => BrowserNavigatorContext[F]} hook
 * @returns {<P>(Component: React.ComponentType<P>, options?: HOCOptions) => React.ComponentType<P & Record<F, BrowserNavigatorContext[F]>>}
 */
function createHOC<F extends keyof BrowserNavigatorContext>(
  field: F,
  displayNameDefaultPrefix: string,
  hook: () => BrowserNavigatorContext[F],
) {
  return function <P>(
    Component: ComponentType<P>,
    options: HOCOptions = {},
  ): ComponentType<P & Record<F, BrowserNavigatorContext[F]>> {
    const {displayName} = options;

    function HOC(props: P) {
      return createElement(Component, {...props, [field]: hook()});
    }

    Object.defineProperty(Component, 'name', {
      value: displayName || `${displayNameDefaultPrefix}(${Component.displayName})`,
    });

    return HOC;
  };
}

/**
 * HOC which returns component that passes navigator context to component
 * @param {React.ComponentType<P>} Component
 * @param {HOCOptions} options
 * @returns {React.ComponentType<P & {navigation: BrowserNavigatorContext}>}
 */
export function withNavigatorContext<P>(
  Component: ComponentType<P>,
  options: HOCOptions = {},
): ComponentType<P & { navigation: BrowserNavigatorContext }> {
  const {displayName} = options;

  function HOC(props: P) {
    const context = useNavigatorContext();

    return <Component {...props} navigation={context}/>;
  }

  Object.defineProperty(Component, 'name', {
    value: displayName || `WithNavigatorContext(${Component.displayName})`,
  });

  return HOC;
}

/**
 * HOC which passes navigator to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, BrowserNavigatorContext[string]>>}
 */
export const withNavigator = createHOC('navigator', 'WithNavigator', useNavigator);

/**
 * HOC which passes location to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, BrowserNavigatorContext[string]>>}
 */
export const withLocation = createHOC('location', 'WithLocation', useLocation);

/**
 * HOC which passes history to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, BrowserNavigatorContext[string]>>}
 */
export const withHistory = createHOC('history', 'WithHistory', useHistory);
