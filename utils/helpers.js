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

export async function setLocalNotification() {
    const notification = await AsyncStorage.getItem(NOTIFICATION_KEY);
    const data = JSON.parse(notification);
    if (data === null) {
       const status = await Permissions.askAsync(Permissions.NOTIFICATIONS)
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
   }
}

export function shuffleArray(array) {
    for(let i=0; i < array.length; i ++) {
        let newPosition = getRandomNumber(array.length);
        let temp = array[i];
        array[i] = array[newPosition];
        array[newPosition] = temp;
    }

    return array;
  }
  

function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
  