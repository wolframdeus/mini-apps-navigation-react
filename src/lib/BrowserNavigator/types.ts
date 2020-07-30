import {
  BrowserNavigator,
  NavigatorCompleteLocationType,
} from '@mini-apps/navigation';
import {ReactNode, ReactNodeArray} from 'react';

export interface BrowserNavigatorState {
  location: NavigatorCompleteLocationType;
  history: NavigatorCompleteLocationType[];
}

export type BrowserNavigatorStateAction = {
  type: 'location';
  payload: NavigatorCompleteLocationType;
} | {
  type: 'history';
  payload: NavigatorCompleteLocationType[];
} | {
  type: 'state';
  payload: BrowserNavigatorState;
};

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
  extends Pick<BrowserNavigator, 'location' | 'history'> {
  /**
   * Navigator instance itself
   */
  navigator: BrowserNavigator;
}
