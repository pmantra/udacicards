import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function formatDecks (input) {
    if(input === null) return []
    const decks = JSON.parse(input)
    //const deckList = Object.values(decks)
    return decks
}

function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

export function getNewDeckObject (title) {
    return {
        [title]: {
            title: title,
            uuid: uuid(),
            questions: []
        }
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Take your Udacicards quiz!',
        body: "👋 don't forget to take the quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()
                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(0)
                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day',
                            })
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}