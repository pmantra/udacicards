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

export function addCardToDeck(title, card) {

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