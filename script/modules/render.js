import {deleteItemFromServer, createRow, deleteControl} from './elementsControl.js';
import {addItem, popupForm, delBtn, list, popupFormAmount, popupFormPrice, popupFormDiscount, popupFormTotal, button, colorArray, checkbox} from './indentificators.js';

const fetchGoods = async () => {
  try {
    const response = await fetch('https://fallacious-gentle-oriole.glitch.me/api/goods');
    if (!response.ok) {
      throw new Error('Failed to fetch goods from the server');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const renderItems = async (elem) => {
  const data = await fetchGoods();
  const allRow = data.map(item => {
    const row = createRow(item);
    row.dataset.id = item.id;
    return row;
  });

  elem.append(...allRow);
  return allRow;
};

const displayErrorMessage = (message) => {
  const errorMessageDiv = document.querySelector('.error-message');
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = 'block';
};

const hideErrorMessage = () => {
  const errorMessageDiv = document.querySelector('.error-message');
  errorMessageDiv.style.display = 'none';
};

const addItemData = async (item) => {
  try {
    const response = await fetch('https://fallacious-gentle-oriole.glitch.me/api/goods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      try {
        const parsedError = JSON.parse(errorMessage);
        displayErrorMessage(parsedError.message || 'Что-то пошло не так...');
      } catch (error) {
        displayErrorMessage('Что-то пошло не так...');
      }

      throw new Error(`Failed to add item to the server. Server responded with status ${response.status}. Error message: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Item added successfully:', data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addItemPage = async (item, list) => {
  try {
    await addItemData(item);
    hideErrorMessage();
    list.append(createRow(item));
  } catch (error) {
    console.error('Failed to add item to the page:', error);
  }
};

export {
  fetchGoods,
  renderItems,
  addItemData,
  addItemPage,
};
