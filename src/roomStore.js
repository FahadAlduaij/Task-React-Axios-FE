import { makeObservable, observable, action } from "mobx";
import axios from "axios";

class RoomStore {
	tasks = [];

	constructor() {
		makeObservable(this, {
			tasks: observable,
			fetchResponse: action,
			createRoom: action,
			deleteRoom: action,
			updateRoom: action,
			sendMessages: action,
		});
	}

	fetchResponse = async () => {
		try {
			const response = await axios.get(
				"https://coded-task-axios-be.herokuapp.com/rooms"
			);
			this.tasks = response.data;
		} catch (error) {
			window.alert(error);
		}
	};

	createRoom = async (newRoom) => {
		try {
			const response = await axios.post(
				"https://coded-task-axios-be.herokuapp.com/rooms",
				newRoom
			);
			this.tasks = [...this.tasks, response.data];
			// setRooms([...rooms, response.data]);
		} catch (error) {
			window.alert(error);
		}
	};

	deleteRoom = async (roomId) => {
		try {
			const response = await axios.delete(
				`https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
			);
			let deleteRoom = this.tasks.filter((room) => room.id !== roomId);
			this.tasks = deleteRoom;
		} catch (error) {
			window.alert(error);
		}
	};

	updateRoom = async (update) => {
		try {
			const response = await axios.put(
				`https://coded-task-axios-be.herokuapp.com/rooms/${update.id}`,
				update
			);
			let tempRooms = this.tasks.map((room) =>
				room.id === update.id ? response.data : room
			);
			this.tasks = tempRooms;
		} catch (error) {
			window.alert(error);
		}
	};

	sendMessages = async (roomID, message) => {
		try {
			const response = await axios.post(
				`https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomID}`,
				message
			);
			let tempmsg = this.tasks.map((room) =>
				room.id === roomID
					? { ...room, messages: [...room.messages, response.data] }
					: room
			);
			this.tasks = tempmsg;
		} catch (error) {
			window.alert(error);
		}
	};
}

const roomStore = new RoomStore();
roomStore.fetchResponse();
export default roomStore;
