// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>  
//       <App/>
//    </React.StrictMode>, 
// );

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

