import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './helpers'
import { formatDecks } from '../utils/helpers'

export async function getDecks() {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return JSON.parse(decks)
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(store => {
        return store[id]
    })
}

export function saveDeckTitle(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export async function saveCardToDeck(title, card) {
    const decks = await getDecks()
    const updatedDeck = decks[title]
    updatedDeck.questions.push(card)
    return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: updatedDeck
    }))
}

export function removeDeck (title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export async function removeDecks() {
    try {
        await AsyncStorage.removeItem(DECKS_STORAGE_KEY)
        return true
    }
    catch(exception) {
        return false
    }
}