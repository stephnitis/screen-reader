'use strict';

let focusList = [];

function createFocusList(){
  focusList.push(...document.querySelectorAll( 'html, body >:not( [aria-hidden=true]'));

  focusList = focusList.filter((element) => {
    const styles = getComputedStyle(element);

    if(styles.visibility === 'hidden' || styles.display === 'none'){
      return false;
    }

    return true;
  });
  // [...]
}

function moveFocus(offset){
  [...]
  focusIndex = focusIndex + offset;

  if(focusIndex < 0 ){
    focusIndex = focusList.length - 1;
  } else if (focusIndex > focusList.length - 1){
    focusIndex = 0;
  }

  focus(focusList[focusIndex]);
}