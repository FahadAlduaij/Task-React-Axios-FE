import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
	const [rooms, setRooms] = useState([]);

	const fetchResponse = async () => {
		try {
			const response = await axios.get(
				"https://coded-task-axios-be.herokuapp.com/rooms"
			);
			setRooms(response.data);
		} catch (error) {
			window.alert(error);
		}
	};

	const createRoom = async (newRoom) => {
		// to do : call BE to create a room
		try {
			const response = await axios.post(
				"https://coded-task-axios-be.herokuapp.com/rooms",
				newRoom
			);

			setRooms([...rooms, response.data]);
		} catch (error) {
			window.alert(error);
		}
	};

	const deleteRoom = async (roomId) => {
		// to do : call BE to delete a room
		try {
			const response = await axios.delete(
				`https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
			);
			let deleteRoom = rooms.filter((room) => room.id !== roomId);
			setRooms(deleteRoom);
		} catch (error) {
			window.alert(error);
		}
	};

	const updateRoom = async (roomId, update) => {
		// to do : call BE to delete a room
		try {
			
			const response = await axios.put(
				`https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`,
				update
			);

			setRooms([response.data]);
		} catch (error) {
			window.alert(error);
		}
	};


	const sendMessages = async (roomID, message) => {
		try {
			const response = await axios.post(`https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomID}`, message)
			setRooms([response.data]);
		} catch (error) {
			window.alert(error);
		}
		
	}

	useEffect(() => {
		fetchResponse();
	}, []);

	return (
		<div className="__main">
			<div className="main__chatbody">
				<Switch>
					<Route path="/room/:roomSlug">
						<ChatRoom rooms={rooms} sendMessages={sendMessages}/>
					</Route>
					<Route exact path="/">
						<center>
							<ChatRoomsList
								rooms={rooms}
								createRoom={createRoom}
								deleteRoom={deleteRoom}
								updateRoom={updateRoom}
							/>
						</center>
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
