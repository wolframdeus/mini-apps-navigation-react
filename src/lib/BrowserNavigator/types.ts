import {BrowserNavigator, IBrowserNavigator} from '@mini-apps/navigation';
import {ReactNode, ReactNodeArray} from 'react';

export interface BrowserNavigatorProps {
  /**
   * BrowserNavigator instance
   */
  navigator: BrowserNavigator;

  /**
   * Children elements
   */
  children?: ReactNode | ReactNodeArray;
}

export interface BrowserNavigatorContext
  extends Pick<IBrowserNavigator, 'state' | 'history'> {
  navigator: IBrowserNavigator;
}
