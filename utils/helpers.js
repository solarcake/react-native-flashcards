import {Notifications, Permissions} from 'expo'
import {AsyncStorage} from 'react-native'

const NOTIFICATION_KEY= 'flashcards:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  

export function createNotification() {
    return {
        title: 'Start study',
        body: 'do not forget to study today',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                // notify 5 seconds after the app starts
                Notifications.cancelAllScheduledNotificationsAsync()
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: new Date().getTime() + 5000,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      }).catch((e) => alert(e))
  }