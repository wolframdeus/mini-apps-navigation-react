import {
  cloneElement,
  memo,
  MouseEvent,
  useCallback,
} from 'react';

import {createLink, fulfillState, REPLACE_MOD} from '@mini-apps/navigation';
import {useNavigator} from '../BrowserNavigator';

import {LinkProps} from './types';

/**
 * Component which wraps child element and passes href and extended onClick
 * callback.
 * @type {React.NamedExoticComponent<LinkProps>}
 */
export const Link = memo(function Link(props: LinkProps) {
  const {children} = props;
  const navigator = useNavigator();

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    // Prevent default browser behaviour
    e.preventDefault();

    // Push new state to navigator
    if ('back' in props) {
      navigator.back();
    } else if ('replace' in props) {
      navigator.replaceState(props.state, {oneTime: props.oneTime});
    } else {
      navigator.pushState(props.state, {oneTime: props.oneTime});
    }

    // Call previously bound callback
    if (children.props.onClick) {
      children.props.onClick(e);
    }
  }, [props, children.props, navigator]);

  if ('back' in props) {
    return cloneElement(children, {
      href: createLink(fulfillState({view: '', modifiers: ['back']})),
      onClick,
    });
  }

  const modifiers = 'replace' in props ? [REPLACE_MOD] : [];

  return cloneElement(children, {
    href: createLink(fulfillState({...props.state, modifiers})),
    onClick,
  });
});
