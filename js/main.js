import { initAutoComplete, submitAnswer, inputTextSelection, closeColors } from './utils/events.js';
import { makeLabels, setTitle } from './utils/funcs.js';
import { fetchUsers } from './api.js';

const tableName = "TheBridge";

fetchUsers(tableName).then(data => {
  
  const users = data
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];

  setTitle(tableName);

  //events
  initAutoComplete(users, randomUser);
  inputTextSelection(users, randomUser);
  submitAnswer(users, randomUser);
  makeLabels(users[0]);
  closeColors();

});