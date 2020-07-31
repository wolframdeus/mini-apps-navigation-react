import {
  cloneElement,
  memo,
  MouseEvent,
  useCallback,
} from 'react';

import {createSegue} from '@mini-apps/navigation';
import {useNavigator} from '../BrowserNavigator';

import {LinkProps} from './types';

/**
 * Component which wraps child element and passes href and extended onClick
 * callback.
 * @type {React.NamedExoticComponent<LinkProps>}
 */
export const Link = memo(function Link(props: LinkProps) {
  const {children, back, location} = props;
  const navigator = useNavigator();

  if (typeof back !== 'undefined' && location) {
    throw new Error(
      '"back" and "location" properties were passed together. This is ' +
      'forbidden behaviour.',
    );
  }

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    // Prevent default browser behaviour
    e.preventDefault();

    // Push new location to navigator
    if (back || location?.modifiers?.includes('back')) {
      navigator.back();
    } else if (location) {
      navigator.pushLocation(location);
    }

    // Call previously bound callback
    if (children.props.onClick) {
      children.props.onClick(e);
    }
    // eslint-disable-next-line
  }, [navigator, back, location, children.props.onClick]);

  if (back || location?.modifiers?.includes('back')) {
    return cloneElement(children, {
      href: createSegue({modifiers: ['back']}),
      onClick,
    });
  }

  if (!location) {
    throw new Error(
      'Unable to create segue. "back" or "location" properties should be ' +
      'passed.',
    );
  }

  return cloneElement(children, {href: createSegue(location), onClick});
});
