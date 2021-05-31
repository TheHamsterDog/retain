import logo from './logo.svg';
import './index.css';
import React from 'react';
import Loading from './components/main/loading';
import Helmet from 'react-helmet';
const Loaded = React.lazy(() => import('./components/main/loaded'));

function App() {
  return (
    <div >
      <Helmet>
        <title>Retain: A simple note keeping app!</title>
        <link rel="icon" href="https://image.flaticon.com/icons/png/512/107/107788.png"></link>
      </Helmet>
      <React.Suspense fallback={<Loading/>}>

        <Loaded />
      </React.Suspense>

    </div>
  );
}
export default App;
