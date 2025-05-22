import { inputText } from './domElements.js'
import { gameLogic } from '../gameLogic.js'

export function loadPrevAnswers(users, randomUser){
    const storedAnswers = localStorage.getItem('userAnswers')
    const answersArray = storedAnswers ? JSON.parse(storedAnswers) : []

    answersArray.forEach(answer => {
        // console.log(answer)
        inputText.value = answer
        gameLogic(users, randomUser)
    });
}