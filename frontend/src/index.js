import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MusicProvider from './core/MusicProvider';


let musicProvider = MusicProvider.sharedProvider();
musicProvider.configure()
let musicInstance = musicProvider.getMusicInstance();
musicInstance.authorize().then(musicUserToken => {
  // temporary 
  console.log(musicUserToken);
});

console.log(musicInstance)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
