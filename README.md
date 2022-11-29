# screen-reader

## Author: Stephanie Hill

### About

This is a project dedicated to learning more about technology designed for accessibility.

### Key terms

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
- focus method

### Resources

- [Let’s create a screen reader!](https://medium.com/content-uneditable/lets-create-a-screen-reader-6734fe45aa3d)
- [Accessibility Screen Readers](https://www.w3schools.com/accessibility/accessibility_screen_readers.php)
- [Voice driven web apps - Introduction to the Web Speech API](https://developer.chrome.com/blog/voice-driven-web-apps-introduction-to-the-web-speech-api/)
- [How to Design Your Website for Screen Reader Accessibility](https://blog.hubspot.com/website/screen-reader-accessibility)
- [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)