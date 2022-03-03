import React from 'react';
import Preferences from '../components/Preferences';

export default function Homepage() {
  return (
    <>
      <h1>Recomate - helps you find what else is worth watching</h1>
      <div>{/* Login or signup here | Maybe as a separate components */}</div>
      <button>Just let me see what else to watch</button>
      {/* ⬆ This will triger the preferences element to show ⬆ */}
      <Preferences />
    </>
  );
}
