'use strict';

// define values for keycodes
const VK_LEFT = 37;
const VK_UP = 38;
const VK_RIGHT = 39;
const VK_DOWN = 40;

class RadioGroup extends HTMLElement {
  constructor(){
    super();
  }
  // every custom element has a set of lifecycle callbacks that you can hook into to run your own code
  // e.g. connectedCallback gets run every time our element is inserted into the DOM
  connectedCallback(){
    //assigning the role to radiogroup makes sure that our screen reader announces its control properly
    this.setAttribute('role', 'radiogroup');
    this.radios = Array.from(this.querySelectorAll('radio-button'));

    // here we are setting up initial state
    if(this.hasAttribute('selected')){
      let selected = this.getAttribute('selected');
      this._selected = selected;
      this.radios[selected].setAttribute('tabindex', 0);
      this.radios[selected].setAttribute('aria-checked', true);
    } else {
      this._selected = 0;
      this.radios[0].setAttribute('tabindex', 0);
    }
    this.setAttribute('tabindex', -1);
    this.setAttribute('aria-checked', false);
  }

  handleKeyDown(e) {
    switch(e.keyCode){

      case VK_UP:
      case VK_LEFT: {
        e.preventDefault();

        if(this.selected === 0){
          this.selected = this.radios.length - 1;
        } else {
          this.selected--;
        }
        break;
      }

      case VK_DOWN:
        case VK_RIGHT: {
          e.preventDefault();

          if(this.selected === this.radios.length - 1){
            this.selected = 0;
          } else {
            this.selected++;
          }
          break;
        }
    }
  }

  handleClick(e){

  }

  set selected(idx){
    //checks to see if we have a selected property
    if(isFinite(this.selected)) {
      //set the old button to tabindex -1
      let previousSelected = this.radios[this.selected];
      previousSelected.tabIndex = -1;
      previousSelected.removeAttribute('aria-checked', false);
    }

    // set the new button to tabindex 0 and focus it
    let newSelected = this.radios[idx];
    newSelected.tabIndex = 0;
    newSelected.focus();
    newSelected.setAttribute('aria-checked', true);

    this.setAttribute('selected', idx);
    this._selected = idx;
  }

  get selected(){
    //returns whatever selected currently is
    return this._selected;
  }
}

window.customElements.define('radio-group', RadioGroup);