import { initAutoComplete, submitAnswer, inputTextSelection, closeColors, settingsButtons } from './utils/events.js'
import { loadPrevAnswers } from './utils/funcs.js'
import { fetchUsers, generateDailyUser } from './api.js'
import { button } from './utils/domElements.js'

const tableName = "TheBridge"
const users = await fetchUsers(tableName)
const randomUser = await generateDailyUser(users)

loadPrevAnswers(users, randomUser)

//events
initAutoComplete(users, randomUser)
inputTextSelection(users, randomUser)
submitAnswer(users, randomUser)
settingsButtons()
closeColors()

// signals the user that the game is ready
button.style.backgroundColor = 'hsl(195, 60%, 60%)'