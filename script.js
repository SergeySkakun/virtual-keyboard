const objModel = {
  tag: 'div',
  class: 'app',
  count: 1,
  children: [
    {
      tag: 'textarea',
      class: 'textarea',
      attributes:
      {
        cols: '30',
        rows: '10',
      },
      count: 1,
    },
    {
      tag: 'div',
      class: 'keyboard',
      count: 1,
      children: [
        {
          tag: 'div',
          class: 'keyboard__line keyboard__line_1st',
          count: 1,
          children: [
            {
              tag: 'div',
              class: 'keyboard__key',
              count: 14,
            },
          ],
        },
        {
          tag: 'div',
          class: 'keyboard__line keyboard__line_2st',
          count: 1,
          children: [
            {
              tag: 'div',
              class: 'keyboard__key',
              count: 14,
            },
          ],
        },
        {
          tag: 'div',
          class: 'keyboard__line keyboard__line_3st',
          count: 1,
          children: [
            {
              tag: 'div',
              class: 'keyboard__key',
              count: 13,
            },
          ],
        },
        {
          tag: 'div',
          class: 'keyboard__line keyboard__line_4st',
          count: 1,
          children: [
            {
              tag: 'div',
              class: 'keyboard__key',
              count: 12,
            },
          ],
        },
        {
          tag: 'div',
          class: 'keyboard__line keyboard__line_5st',
          count: 1,
          children: [
            {
              tag: 'div',
              class: 'keyboard__key',
              count: 7,
            },
            {
              tag: 'div',
              class: 'keyboard__arrows',
              count: 1,
              children: [
                {
                  tag: 'div',
                  class: 'keyboard__line keyboard__line_arrows-1',
                  count: 1,
                  children: [
                    {
                      tag: 'div',
                      class: 'keyboard__key',
                      count: 1,
                    },
                  ],
                },
                {
                  tag: 'div',
                  class: 'keyboard__line keyboard__line_arrows-2',
                  count: 1,
                  children: [
                    {
                      tag: 'div',
                      class: 'keyboard__key',
                      count: 3,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const KEYBOARD_STATE = {
  eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    '[', ']', '\\', 'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    ';', '\'', 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
    ',', '.', '/', 'Shift', 'Ctrl', 'Fn', 'Win', 'Alt', '', 'Alt', 'Ctrl',
    '&uarr;', '&larr;', '&darr;', '&rarr;'],
  ru: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з',
    'х', 'ъ', '\\', 'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д',
    'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь',
    'б', 'ю', '.', 'Shift', 'Ctrl', 'Fn', 'Win', 'Alt', '', 'Alt', 'Ctrl',
    '&uarr;', '&larr;', '&darr;', '&rarr;'],
};
const pressedKeys = new Set();

function createStructure(model, parrent) {
  const element = document.createElement(model.tag);
  element.className = model.class;

  if (model.children) {
    model.children.forEach((el) => {
      createStructure(el, element);
    });
  }

  for (let i = 0; i < model.count; i += 1) {
    parrent.appendChild(element.cloneNode(true));
  }
}

function createKeys(currentLang) {
  const KEYS = document.querySelectorAll('.keyboard__key');

  KEYS.forEach((element, index) => {
    const EL = element;
    EL.innerHTML = KEYBOARD_STATE[currentLang][index];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createStructure(objModel, document.querySelector('body'));

  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'eng');
  }
  createKeys(localStorage.getItem('lang'));
});

document.addEventListener('keydown', (event) => {
  pressedKeys.add(event.code);
  if (pressedKeys.has('AltLeft') && event.code === 'ShiftLeft') {
    if (localStorage.getItem('lang') === 'eng') {
      localStorage.setItem('lang', 'ru');
    } else {
      localStorage.setItem('lang', 'eng');
    }
    createKeys(localStorage.getItem('lang'));
  }
});

document.addEventListener('keyup', (event) => {
  pressedKeys.delete(event.code);
});
