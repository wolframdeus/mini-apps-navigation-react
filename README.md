[npm-badge]: https://img.shields.io/npm/v/@mini-apps/navigation-react.svg
[npm-link]: https://npmjs.com/package/@mini-apps/navigation-react

[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# Navigation [![NPM][npm-badge]][npm-link]

React implementation of [@mini-apps/navigation](https://www.npmjs.com/package/@mini-apps/navigation)

## Installation
```bash
yarn add @mini-apps/navigation-react
```
or
```bash
npm i @mini-apps/navigation-react
``` 

## Usage

> TLDR;
>
> You can try this lib [here](https://github.com/wolframdeus/mini-apps-navigation-react).
> Just clone repository, install dependencies and run `yarn dev`

Firstly, you have to create instance of `BrowserNavigator` from 
`@mini-apps/navigation`:

```typescript
import {BrowserNavigator as Navigator} from '@mini-apps/navigation';

const navigator = new Navigator();
```

Then, you should import `BrowserNavigator` component from 
`@mini-apps/navigation-react` and pass created navigator:

```typescript jsx
import React, {useEffect, useMemo} from 'react';

import {BrowserNavigator} from '@mini-apps/navigation-react';

// App component will be shown later
import {App} from './App';

import {
  BrowserNavigator as Navigator,
  extractBrowserNavigatorSettings,
} from '@mini-apps/navigation';

function Root() {
  // Create navigator
  const navigator = useMemo(() => new Navigator(), []);

  // Initialize it with extracted from browser settings
  useEffect(() => {
    const settings = extractBrowserNavigatorSettings();

    navigator.init(settings || undefined);

    // We could pass any data we need in init. Moreover, we could just
    // call mount() if extracting initial navigator state is not required
  }, [navigator]);

  return (
    <BrowserNavigator navigator={navigator}>
      <App/>
    </BrowserNavigator>
  );
}
```

Then we are free to use this navigator all over our application:

```typescript jsx
import React from 'react';

import {createSegue} from '@mini-apps/navigation';
import {useHistory, useLocation, useNavigator} from '@mini-apps/navigation-react';

export function App() {
  const navigator = useNavigator();
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <p>Current history</p>
      <div>
        {history.map((loc, idx) => {
          const stringified = JSON.stringify(loc);
          let content = loc === location 
            ? <b>{stringified}</b> 
            : stringified;

          return <div key={idx}>{content}</div>;
        })}
      </div>
      <button onClick={() => navigator.back()}>Back</button>
      <button onClick={() => navigator.forward()}>Forward</button>
      <a href={createSegue({view: 'main'})}>Link to main</a>
      <a href={
        createSegue({view: 'main', popup: 'delete-user', modifiers: ['skip']})}
      >
        Show one time popup which prompts for user delete
      </a>
      <a href={createSegue({view: 'onboarding', modifiers: ['replace']})}>
        Replace current location with onboarding
      </a>
      <a href={createSegue({modifiers: ['back']})}>
        Link to previous location (Back button alternative)
      </a>
    </div>
  );
}
```
