import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
	apiKey: 'AIzaSyCWbMcxWa3v9M_UFC_ywRVISzg8uTMPlDo',
	authDomain: 'svelte-word-game.firebaseapp.com',
	projectId: 'svelte-word-game',
	storageBucket: 'svelte-word-game.appspot.com',
	messagingSenderId: '994544551969',
	appId: '1:994544551969:web:a7b8e6e42353c9751e3b60',
	measurementId: 'G-76NGQ0DC9P'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = getFirestore();

export const getCollection = () => {};
