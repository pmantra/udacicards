import { AsyncStorage } from 'react-native'

export function getDecks() {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            console.log('stores', stores)
          /* stores.map((result, i, store) => {
            let key = store[i][0]
            let value = store[i][1]
          }) */
        })
      })
}

export function getDeck(id) {

}

export function saveDeckTitle(title) {
    console.log('saving deck with title', title)
    return AsyncStorage.mergeItem(title, JSON.stringify({
        'title': title
    })).then(getDecks())
}

export function addCardToDeck(title, card) {

}