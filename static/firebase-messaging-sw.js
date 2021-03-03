
importScripts(
  'https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDtXWh4UP3nDBeDUudcqGyVjIJ4GLGh64M","authDomain":"aichallenge-304910.firebaseapp.com","projectId":"aichallenge-304910","storageBucket":"aichallenge-304910.appspot.com","messagingSenderId":"939108343385","appId":"1:939108343385:web:91529ac9fec89612569b48","measurementId":"G-RXW9NMM24B"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"goToLupasGithub","url":"https:\u002F\u002Fgithub.com\u002Flupas"},{"action":"goToModuleGithub","url":"https:\u002F\u002Fgithub.com\u002Fnuxt-community\u002Ffirebase-module"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
