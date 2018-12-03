export const ADD_NEW_DECK = 'ADD_NEW_DECK'

export function addNewDeck (deck) {
  return {
    type: ADD_NEW_DECK,
    deck,
  }
}