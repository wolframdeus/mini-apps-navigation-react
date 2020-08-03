import React, {useMemo} from 'react';

import {
  useNavigatorState,
  useNavigatorHistory,
  useNavigator,
  Link,
} from './lib';

import classes from './App.module.css';
import {
  createLink,
  NavigatorState,
  NavigatorSimplifiedState,
} from '@mini-apps/navigation';

export function App() {
  const navigator = useNavigator();
  const state = useNavigatorState();
  const history = useNavigatorHistory();

  const links = useMemo<[string, NavigatorState | NavigatorSimplifiedState][]>(() => [
    ['onboarding', {view: 'onboarding'}],
    ['friends', {view: 'friends'}],
    ['friends / Vlad', {
      view: 'friends', params: {
        name: 'Vlad',
      },
    }],
    ['friends / Vlad / Info (modal)', {
      view: 'friends',
      modal: 'info',
      params: {name: 'Vlad'},
    }],
    ['friends / Vlad / Info (modal) / Delete friend confirm (alert)', {
      view: 'friends',
      modal: 'info',
      popup: 'delete',
      modifiers: ['skip'],
      params: {name: 'Vlad'},
    }],
  ], []);

  return (
    <div>
      <p className={classes.title}>Current history</p>
      <div className={classes.history}>
        {history.map((s, idx) => {
          let className = classes.location;

          if (s === state) {
            className += ' ' + classes['location--current'];
          }
          if (s.modifiers.includes('skip')) {
            className += ' ' + classes['location--skipped'];
          }

          return (
            <div className={className} key={idx}>
              {JSON.stringify(s)}
            </div>
          );
        })}
      </div>
      <div className={classes.flex}>
        <div className={classes.flex}>
          <button
            className={classes.button}
            onClick={() => navigator.back()}
          >
            history.back()
          </button>
          <button
            className={classes.button}
            onClick={() => navigator.forward()}
          >
            history.forward()
          </button>
        </div>
        <div className={classes['tools-divider']}>or</div>
        <div className={classes.flex}>
          <Link back={true}>
            <a className={classes.button}>Back link</a>
          </Link>
          <a
            href={createLink({view: '', modifiers: ['back']})}
            className={classes.button}
          >
            Usual back link (browser history will be cut, but navigator&apos;s
            one will be saved)
          </a>
        </div>
      </div>
      {links.map(([title, state], idx) => (
        <div key={idx}>
          <Link state={state}>
            <a>{title}</a>
          </Link>
        </div>
      ))}
      <div>
        <Link state={{view: 'onboarding'}} replace={true}>
          <a>Replace link (onboarding)</a>
        </Link>
      </div>
    </div>
  );
}
