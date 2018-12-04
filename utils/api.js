import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, uuid } from './helpers'

export async function getDecks() {
    return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(store => {
        return store[id]
    })
}

export function saveDeckTitle(title) {
    console.log('saving deck with title', title)
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            uuid: uuid(),
            questions: []
        }
    })).then(getDecks())
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