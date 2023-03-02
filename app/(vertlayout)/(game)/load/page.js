'use client';

import { app, auth, db } from '../../../firebase/config';
import { useEffect } from 'react';
import {
	Heading,
	Box,
	Spinner,
} from '@chakra-ui/react';
import { onAuthStateChanged } from "firebase/auth";

import { collection, doc, onSnapshot, addDoc, getDocs, query, where, getCountFromServer, getDoc, updateDoc } from "firebase/firestore";
import { useStateContext } from '../../../context/userAuthFunctions';
import { Result } from 'postcss';
import { useRouter } from 'next/navigation';

const delay = ms => new Promise(
	resolve => setTimeout(resolve, ms)
);

export default function Page() {

	const router = useRouter();

	const { chatRooms, setChatRooms, user, setUser } = useStateContext();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			setUser(user)
			console.log(user.email)
			// ...
		} else {
			// User is signed out
			// ...
		}
	});


	useEffect(() => {
		// Get Firestore collection reference

		const chatRoomsRef = collection(db, "chatRooms");
		console.log(chatRoomsRef)

		// Listen for updates to the chatRooms collection
		const unsubscribe = onSnapshot(chatRoomsRef, (snapshot) => {
			const chatRooms = [];
			snapshot.forEach(doc => {
				chatRooms.push({
					id: doc.id,
					...doc.data()
				});
			});
			setChatRooms(chatRooms);
			console.log(chatRooms)
		});
		const handleLogin = async (user) => {
			const chatRoomsRef = collection(db, 'chatRooms');
			const querySnapshot = await getDocs(query(chatRoomsRef, where('userId', '==', user.email)));
			const querySnapshotTwo = await getDocs(query(chatRoomsRef, where('status', '==', "waiting")));


			if (querySnapshot.docs.length > 0 || querySnapshotTwo > 0) {
				console.log('User already exists in the chatRooms collection');
			} else {
				try {
					await addDoc(chatRoomsRef, {
						userId: user.email,
						id: user.uid,
						status: 'waiting'
					});
					console.log('Added user to the chatRooms collection');
				} catch (error) {
					console.log(error);
				}
			}
		}

		if (user) {
			handleLogin(user);
			const delayedEffect = setTimeout(() => {
				handleMatchUsers()
			}, 20000);

			return () => clearTimeout(delayedEffect);
		}

		// Clean up subscription on unmount
		return () => unsubscribe();







	}, [user]);



	const handleMatchUsers = async () => {
		// Find all waiting users


		onSnapshot(collection(db, 'chatRooms'), (snapshot) => {
			const chatRooms = [];
			snapshot.forEach(doc => {
				chatRooms.push({
					id: doc.id,
					...doc.data()
				});
			})
		});
		setChatRooms(chatRooms);

		const querySnapshot = await getDocs(query(collection(db, "chatRooms"), where('first_user', '==', user.email)));
		if (querySnapshot.docs.length > 0) {
			console.log("You are alraedy in a chatRoom");
		}


		const waiting = [];
		const snap = await getDocs(query(collection(db, 'chatRooms'), where('status', '==', "waiting")));
		snap.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			waiting.push({ userId: doc.data().userId, id: doc.data().id, status: doc.data().status })
		});
		console.log(waiting)


		if (snap.docs.length > 0) {
			// Determine whether to match with another user or an AI model
			const useAi = Math.random() < 0.5;

			if (useAi) {
				console.log("I am in line 138")

				// Match with an AI model
				const aiRoom = collection(db, 'chatRooms')
				let newRoomID = 0;
				addDoc(aiRoom, {
					first_user: user.email,
					first_id: user.uid,
					second_user: "Open Ai",
					status: 'active',
					asked: 0,
					answered: 0,
				}).then(async docRef => {

					newRoomID = docRef.id; console.log(docRef.id);
					const usersRef = collection(db, "chatRooms");
					const q = query(usersRef, where("userId", "==", user.email));
					const querySnapshot = await getDocs(q);
					let temp_doc;
					querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data());
						temp_doc = doc.id;
					});
					const refref = doc(db, "chatRooms", temp_doc);

					const update = await updateDoc(refref, { status: "active", userId: user.email });

					window.location.href = `/ask?room=${newRoomID}`;
				});

			} else if (!useAi && waiting.length != 0) {
				console.log("I am in line 167")

				// Choose a random waiting user
				const otherUser = waiting[Math.floor(Math.random() * waiting.length)];
				if (otherUser.userId == user.uid && otherUser) {
					console.log("I am in line 215")
					// Match with an AI model
					const _aiRoom = collection(db, 'chatRooms')
					let _newRoomID = 0;
					addDoc(_aiRoom, {
						first_user: user.email,
						first_id: user.uid,
						second_user: "Open Ai",
						status: "active",
						asked: 0,
						answered: 0,
					}).then(async docRef => {
						_newRoomID = docRef.id; console.log(docRef.id);
						const usersRef = collection(db, "chatRooms");
						const q = query(usersRef, where("userId", "==", user.email));
						const querySnapshot = await getDocs(q);
						let temp_doc;
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							temp_doc = doc.id;
						});
						const refref = doc(db, "chatRooms", temp_doc);

						const update = await updateDoc(refref, { status: "active", userId: user.email });

						window.location.href = `/ask?room=${_newRoomID}`;
					}
					)
				}
			} else {
				// Create a new chat room for the two users
				const newRoom = collection(db, 'chatRooms')
				let newRoomID = 0;
				addDoc(newRoom, {
					first_user: user.email,
					first_id: user.uid,
					second_user: otherUser.userId,
					second_id: otherUser.id,
					status: 'active',
					asked: 0,
					answered: 0,
				}).then(async docRef => {
					newRoomID = docRef.id; console.log(docRef.id);

					//update first user state to active
					const usersRef = collection(db, "chatRooms");
					const q = query(usersRef, where("userId", "==", user.email));
					const querySnapshot = await getDocs(q);
					let temp_doc;
					querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data());
						temp_doc = doc.id;
					});
					const refref = doc(db, "chatRooms", temp_doc);

					const update = await updateDoc(refref, { status: "active", userId: user.email });

					// update second user state to active
					const _usersRef = collection(db, "chatRooms");
					const _q = query(_usersRef, where("userId", "==", otherUser.userId));
					const _querySnapshot = await getDocs(_q);
					let _temp_doc;
					_querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data());
						_temp_doc = doc.id;
					});
					const _refref = doc(db, "chatRooms", _temp_doc);

					const _update = await updateDoc(_refref, { status: "active", userId: otherUser.userId });


					window.location.href = `/ask?room=${newRoomID}`;

				});
			}
		} else {
			console.log("I am in line 215")
			// Match with an AI model
			const aiRoom = collection(db, 'chatRooms')
			let newRoomID = 0;
			addDoc(aiRoom, {
				first_user: user.email,
				first_id: user.uid,
				second_user: "Open Ai",
				status: "active",
				asked: 0,
				answered: 0,
			}).then(async docRef => {
				newRoomID = docRef.id; console.log(docRef.id);
				const usersRef = collection(db, "chatRooms");
				const q = query(usersRef, where("userId", "==", user.email));
				const querySnapshot = await getDocs(q);
				let temp_doc;
				querySnapshot.forEach((doc) => {
					console.log(doc.id, " => ", doc.data());
					temp_doc = doc.id;
				});
				const refref = doc(db, "chatRooms", temp_doc);

				const update = await updateDoc(refref, { status: "active", userId: user.email });

				window.location.href = `/ask?room=${newRoomID}`;
			});

			// Redirect to AI chat room
			//window.location.href = `/chat/${aiRoom.id}`;
		}
	}




	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'3xl'} pb='16px'>Finding Match</Heading>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.400'
				color='blue.500'
				size='xl'
			/>
		</Box>
	);
}