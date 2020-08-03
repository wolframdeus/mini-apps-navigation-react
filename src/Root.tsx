import React, {useEffect, useMemo} from 'react';

import {BrowserNavigator} from './lib/BrowserNavigator';
import {App} from './App';

import {
  BrowserNavigator as Navigator,
  extractInitOptions,
} from '@mini-apps/navigation';

export function Root() {
  // Create navigator
  const navigator = useMemo(() => new Navigator(), []);

  // Initialize it with extracted from browser settings
  useEffect(() => {
    const settings = extractInitOptions();

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
