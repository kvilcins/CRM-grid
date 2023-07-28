import {createRow} from './elementsControl.js';
import {displayErrorMessage} from './modal.js';

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

// const addItemPage = async (item, list) => {
//   try {
//     const newItem = await addItemData(item);
//
//     await renderItems(list);
//
//     hideErrorMessage();
//     calcTotalCrmPrice();
//   } catch (error) {
//     console.error('Failed to add item to the page:', error);
//   }
// };

const clearTable = (table) => {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
};


const renderItems = async (elem) => {
  try {
    const data = await fetchGoods();

    const existingIds = new Set();
    const newData = data.filter((item) => {
      if (existingIds.has(item.id)) {
        return false;
      } else {
        existingIds.add(item.id);
        return true;
      }
    });

    clearTable(elem);

    const allRow = newData.map(item => {
      const row = createRow(item);
      row.dataset.id = item.id;
      return row;
    });

    elem.append(...allRow);
    return allRow;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  fetchGoods,
  addItemData,
  clearTable,
  renderItems,
};
