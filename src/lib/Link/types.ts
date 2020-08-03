import {MouseEvent, ReactElement} from 'react';
import {BrowserNavigatorStateType} from '@mini-apps/navigation';

export type LinkProps = {
  /**
   * Child item. Props "href" and "onClick" are passed to it
   */
  children: ReactElement<{
    href?: string;
    onClick?(e: MouseEvent<HTMLElement>): void;
  }>;
} & ({
  /**
   * Should navigator go back when link is clicked. Should not be passed along
   * with "state" prop
   */
  back: true;
} | {
  /**
   * Should navigator replace current location with new one
   */
  replace?: true;

  /**
   * Should this state be visited only once
   */
  oneTime?: boolean;

  /**
   * When link is clicked, navigator will push this link
   */
  state: BrowserNavigatorStateType;
})
