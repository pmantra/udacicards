export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addNewDeck (deck) {
  return {
    type: ADD_NEW_DECK,
    deck,
  }
}

export function addCardToDeck (question, answer, title) {
  return {
    type: ADD_CARD_TO_DECK,
    question,
    answer,
    title
  }
}

export function deleteDeck (title) {
  return {
    type: DELETE_DECK,
    title
  }
}