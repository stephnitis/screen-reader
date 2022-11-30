# screen-reader

## Author: Stephanie Hill

### About

This is a project dedicated to learning more about technology designed for accessibility.

### Key terms & notes

#### Focus

- Focus: selecting an element and directing keyboard elements to that selected element
  - critical, how users reach all the interactive controls in our application
  - navigated via tab or tab-shift keys on keyboard
- Tab-order is the order that elements are focused in the document
  - inferred by the DOM ordering of your mark-up
- Not all elements are focusable: non interactive elements
- Best practice is to move elements higher in the DOM if we want them displayed first
- tabindex attribute: specifies the tab order of an element when the tab button is used for navigating
  - can be used on any HTML element
  - `tabindex="0"` item becomes programmatically focusable, thus we could call its focus method and it would direct focus to it, useful to direct a user to a specific control, possibly after they perform a specific action on the page
  - `tabindex="-1"` useful for managing focus, items are not interactive, but are focusable, possibly useful for disabling interactive controls
  - `tabindex="<value > 0>"` element will be jumped ahead of everything else in the tab order: not recommended

#### Roving `tabindex` || Roving Focus

- Treat complex controls, whenever possible, as a single Tab stop, so the user can tab into it use their arrow keys to interact with it if they like, or bypass by hitting tab key again
- Define own HTML elements using the custom elements spec (allows you to create custom tags which inherit from native HTML element)

``` javascript
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
        break;
      }

      case VK_DOWN:
        case VK_RIGHT: {
          break;
        }
    }
  }

  handleClick(e){

  }

  set selected(idx){
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
```

#### Buttons

- synthetic click activation: If you add a "click" handler to a button, it will run when the user presses ENTER or SPACE
- If clicking on the element will perform an action on the page, use `<button>`.
- If clicking on the element will navigate the user to a new page then use `<a>`. This includes single page web apps that load new content and update the URL using the History API.
- The reason for this is that buttons and links are announced differently by screen readers. Using the correct element helps screen reader users know which outcome to expect.

### Resources

- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [Let’s create a screen reader!](https://medium.com/content-uneditable/lets-create-a-screen-reader-6734fe45aa3d)
- [Accessibility Screen Readers](https://www.w3schools.com/accessibility/accessibility_screen_readers.php)
- [Voice driven web apps - Introduction to the Web Speech API](https://developer.chrome.com/blog/voice-driven-web-apps-introduction-to-the-web-speech-api/)
- [How to Design Your Website for Screen Reader Accessibility](https://blog.hubspot.com/website/screen-reader-accessibility)
- [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [Inert Polyfill](https://github.com/WICG/inert)