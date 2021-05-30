import logo from './logo.svg';
import './index.css';
import React from 'react';
import Helmet from 'react-helmet';
const Loaded = React.lazy(() => import('./components/main/loaded'));
let i = 1;
let theme = i === 0 ? "light" : "dark";
function App() {

  const [state, setState] = React.useState({ labels: [], currentLabel: "", search: "" });

  return (
    <div className={theme + "-app"}>
      <Helmet>
        <title>Retain: A simple note keeping app!</title>
        <link rel="icon" href="https://image.flaticon.com/icons/png/512/107/107788.png"></link>
      </Helmet>
      <React.Suspense fallback={<div>Loading</div>}>

        <Loaded />
      </React.Suspense>

    </div>
  );
}
export default App;
