import { initAutoComplete, submitAnswer, inputTextSelection, closeColors, settingsButtons } from './utils/events.js'
import { loadPrevAnswers } from './utils/prevAnswers.js'
import { fetchUsers, generateDailyUser } from './api.js'
import { button } from './utils/domElements.js'
// import { setTitle } from './utils/funcs.js'

const tableName = "TheBridge"
const users = await fetchUsers(tableName)
const randomUser = await generateDailyUser(users)

//sets the title of the page (incase I end up adding multiple tables)
// setTitle(tableName)

loadPrevAnswers(users, randomUser)

//events
initAutoComplete(users, randomUser)
inputTextSelection(users, randomUser)
submitAnswer(users, randomUser)
settingsButtons()
closeColors()

// signals the user that the game is ready
button.style.backgroundColor = 'hsl(195, 60%, 60%)'