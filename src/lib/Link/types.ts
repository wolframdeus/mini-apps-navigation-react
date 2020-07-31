import {MouseEvent, ReactElement} from 'react';
import {NavigatorLocationType} from '@mini-apps/navigation';

export interface LinkProps {
  /**
   * Child item. Props "href" and "onClick" are passed to it
   */
  children: ReactElement<{
    href?: string;
    onClick?(e: MouseEvent<HTMLElement>): void;
  }>;

  /**
   * Should navigator go back when link is clicked. Should not be passed along
   * with "location" prop
   */
  back?: true;

  /**
   * Navigator next location when link is clicked. Should not be passed along
   * with "back" prop
   */
  location?: NavigatorLocationType;
}
