import { RECEIVE_DECKS ,ADD_NEW_DECK } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
        return {
            ...state,
            ...action.decks,
        }
        case ADD_NEW_DECK :
        const { deck } = action
            return {
                ...state,
                ...deck
        }
        default :
            return state
        }
}

export default decks