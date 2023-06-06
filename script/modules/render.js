import {createRow, deleteControl} from './elementsControl.js';
import {addItem, popupForm, delBtn, list, popupFormAmount, popupFormPrice, popupFormDiscount, popupFormTotal, button, colorArray, checkbox} from './indentificators.js';
import {data} from './data.js';

const renderItems = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

const addItemData = (item) => {
  data.push(item);
};

const addItemPage = (item, list) => {
  list.append(createRow(item));
};

export {
  renderItems,
  addItemData,
  addItemPage,
};
