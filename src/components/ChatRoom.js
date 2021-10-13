import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MessageItem from "./MessageItem";
import ScrollableFeed from "react-scrollable-feed";
import roomStore from "../roomStore";
import { observer } from "mobx-react-lite";

function ChatRoom() {
	const roomSlug = useParams().roomSlug;

	const room = roomStore.tasks.find((room) => room.slug === roomSlug);

	const messagesList = room.messages.map((msg) => {
		return <MessageItem msg={msg.msg} />;
	});

	const [msg, setMsg] = useState({ msg: "" });

	const handleChange = (event) => {
		setMsg({ ...msg, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		roomStore.sendMessages(room.id, msg);
		setMsg({ msg: "" });
	};

	return (
		<div className="main__chatcontent">
			<div className="content__header">
				<div className="blocks">
					<div className="current-chatting-user">
						<div className="avatar">
							<div className="avatar-img">
								<img src={room.image} alt="#" />
							</div>
						</div>
						<p>{room.title}</p>
					</div>
				</div>
			</div>
			<div className="content__body">
				<ScrollableFeed>
					<div className="chat__items">{messagesList}</div>
				</ScrollableFeed>
			</div>
			<div className="content__footer">
				<div className="sendNewMessage">
					<button className="addFiles">
						<i className="fa fa-plus"></i>
					</button>
					<input
						type="text"
						value={msg.msg}
						name="msg"
						onChange={handleChange}
						placeholder="Type a message here"
					/>
					<button className="btnSendMsg" onClick={handleSubmit} id="sendMsgBtn">
						<i className="fa fa-paper-plane"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
export default observer(ChatRoom);
