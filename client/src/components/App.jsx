import React from 'react';
import StarRating from './shared/StarRating';

export default function App() {
  return (
    <div className="App">
      <StarRating color="black" rating={3.8} size="3em" />
    </div>
  );
}
