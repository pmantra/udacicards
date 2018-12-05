export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'

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