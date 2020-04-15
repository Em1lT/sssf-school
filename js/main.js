window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      console.log(navigator);
      console.log("navigator");
      navigator.serviceWorker.register('./sw.js')
      .then((success) => {

      })
    }
  }