import React from 'react';
import Search from './Search';

const App = () => {
  return (
    <div className="ui grid container center aligned" style={{marginTop: "20px"}}>
      <h1>Search Wikipedia</h1>
      <div className="column sixteen wide">
        <Search />
      </div>
    </div>
  );
};

export default App;
