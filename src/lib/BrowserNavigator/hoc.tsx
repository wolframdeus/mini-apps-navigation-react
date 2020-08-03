import React, {ComponentType, createElement} from 'react';
import {BrowserNavigatorContext} from './types';
import {
  useNavigatorHistory, useNavigatorState, useNavigator, useNavigatorContext,
} from './hooks';

interface HOCOptions {
  displayName?: string;
}

/**
 * Generator of HOCs
 * @param propName
 * @param {string} displayNameDefaultPrefix
 * @param {() => BrowserNavigatorContext[F]} hook
 * @returns {<P>(Component: React.ComponentType<P>, options?: HOCOptions) => React.ComponentType<P & Record<F, BrowserNavigatorContext[F]>>}
 */
function createHOC<PropName extends string, HookValue = any>(
  propName: PropName,
  hook: () => HookValue,
  displayNameDefaultPrefix: string,
) {
  return function <P>(
    Component: ComponentType<P>,
    options: HOCOptions = {},
  ): ComponentType<P & Record<PropName, HookValue>> {
    const {displayName} = options;

    function HOC(props: P) {
      return createElement(Component, {...props, [propName]: hook()});
    }

    Object.defineProperty(Component, 'name', {
      value: displayName || `${displayNameDefaultPrefix}(${Component.displayName})`,
    });

    return HOC;
  };
}

/**
 * HOC which passes navigator context to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, BrowserNavigatorContext>>}
 */
export const withNavigatorContext = createHOC('navigatorContext', useNavigatorContext, 'WithNavigator');

/**
 * HOC which passes navigator to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, IBrowserNavigator>>}
 */
export const withNavigator = createHOC('navigator', useNavigator, 'WithNavigator');

/**
 * HOC which passes state to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, NavigatorState | null>>}
 */
export const withNavigatorState = createHOC('navigatorState', useNavigatorState, 'WithState');

/**
 * HOC which passes history to wrapped component
 * @type {<P>(Component: React.ComponentType<unknown>, options?: HOCOptions) => React.ComponentType<Record<string, NavigatorState[]>>}
 */
export const withNavigatorHistory = createHOC('navigatorHistory', useNavigatorHistory, 'WithHistory');
