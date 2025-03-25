import { initAutoComplete, submitAnswer, inputTextSelection } from './utils/events.js';
import { makeLabels } from './utils/funcs.js';
import { fetchUsers } from './api.js';

fetchUsers().then(data => {
  
  const users = data
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];

  //events
  initAutoComplete(users, randomUser);
  inputTextSelection(users, randomUser);
  submitAnswer(users, randomUser);
  makeLabels(users[0]);

});
