import React, {useMemo} from 'react';

import {useHistory, useLocation, useNavigator, Link} from './lib';

import classes from './App.module.css';
import {createSegue, NavigatorLocationType} from '@mini-apps/navigation';

export function App() {
  const navigator = useNavigator();
  const location = useLocation();
  const history = useHistory();

  const links = useMemo<[string, NavigatorLocationType][]>(() => [
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
    ['Replace link (onboarding) ', {view: 'onboarding'}],
  ], []);

  return (
    <div>
      <p className={classes.title}>Current history</p>
      <div className={classes.history}>
        {history.map((loc, idx) => {
          let className = classes.location;

          if (loc === location) {
            className += ' ' + classes['location--current'];
          }
          if (loc.modifiers.includes('skip')) {
            className += ' ' + classes['location--skipped'];
          }

          return (
            <div className={className} key={idx}>
              {JSON.stringify(loc)}
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
            href={createSegue({modifiers: ['back']})}
            className={classes.button}
          >
            Usual back link (browser history will be cut, but navigator&apos;s
            one will be saved)
          </a>
        </div>
      </div>
      {links.map(([title, location], idx) => (
        <div key={idx}>
          <Link location={location}>
            <a>{title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
