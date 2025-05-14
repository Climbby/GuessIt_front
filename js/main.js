import { initAutoComplete, submitAnswer, inputTextSelection, closeColors } from './utils/events.js';
import { fetchUsers, generateDailyUser } from './api.js';
// import { setTitle } from './utils/funcs.js';

const tableName = "TheBridge";
const users = await fetchUsers(tableName);
const randomUser = await generateDailyUser(users);

//sets the title of the page (incase I end up adding multiple tables)
// setTitle(tableName);

//events
initAutoComplete(users, randomUser);
inputTextSelection(users, randomUser);
submitAnswer(users, randomUser);
closeColors();