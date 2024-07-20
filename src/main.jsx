import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='pt-5'>
    <App />
    </div>
  </React.StrictMode>,
)
