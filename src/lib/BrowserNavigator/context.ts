import {createContext} from 'react';
import {BrowserNavigatorContext} from './types';

/**
 * BrowserNavigator context
 * @type {React.Context<BrowserNavigatorContext | null>}
 */
export const browserNavigatorContext = createContext<BrowserNavigatorContext | null>(null);
browserNavigatorContext.displayName = 'BrowserNavigatorContext';
