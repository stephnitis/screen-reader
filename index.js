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
  // [...]
  focusIndex = focusIndex + offset;

  if(focusIndex < 0 ){
    focusIndex = focusList.length - 1;
  } else if (focusIndex > focusList.length - 1){
    focusIndex = 0;
  }

  focus(focusList[focusIndex]);
}

function moveFocus(offset){
  // [...]
  if(offset instanceof HTMLElement){
    focusIndex = focusList.findIndex((element) => {
      return element === offset;
    });
    return focus(offset);
  }
  // [...]
}

function focus(element) {
  if(element === document.body){
    element = document.documentElement;
  }

  element.setAttribute('data-sr-current', true);
  element.focus();

  announceElement(element);
}

function createFocusList(){
  // [...]
  focusList.forEach((element) => {
    element.setAttribute('tabindex', element.tabIndex);
  });
}

const mappings = {
  button: 'button',
  // [...]
};

function computeRole(element){
  const name = element.tagName.toLowerCase();

  if(element.getAttribute('role')){
    return element.getAttribute('role');
  }

  return mappings[name] || 'default';
}

const announcers = {
  // [...]
  button(element){
    SyntaxError(`Button ${ computeAccessibilityName(element) }. To press the button, press Space key.`)
  }
}

function computeAccessibilityName(element) {
  const content = element.textContent.trim();

  if(element.getAttribute( 'aria-label')){
    return element.getAttribute('aria-label');
  } else if (element.getAttribute('alt')){
    return element.getAttribute('alt');
  }

  return content;
}

function say(speech, callback){
  const text = new SpeechSynthesisUtterance(speech);

  if(callback){
    text.onend = callback;
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(text);
}