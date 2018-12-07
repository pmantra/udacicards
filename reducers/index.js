import { RECEIVE_DECKS ,ADD_NEW_DECK, ADD_CARD_TO_DECK, DELETE_DECK } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_NEW_DECK:
            const { deck } = action
            return {
                    ...state,
                    ...deck
            }
        case ADD_CARD_TO_DECK:
            const { question, answer, title } = action
            const newCard = {
                question,
                answer
            }
            const updatedDeck = {
                [title]: {
                    ...state[title],
                    questions: state[title].questions.concat(newCard)
                }
            }
            return {
                ...state,
                ...updatedDeck
            }
        case DELETE_DECK:
            delete state[action.title]
            return {
                ...state
            }
        default :
            return state
        }
}

export default decks