import React from "react";

export default function MessageItem(props) {
	return (
		<div style={{ animationDelay: `0.8s` }} className={`chat__item`}>
			<div className="chat__item__content">
				<div className="chat__msg">{props.msg}</div>
				<div className="chat__meta">
					<span>By: user</span>
				</div>
			</div>
			<div className="avatar">
				<div className="avatar-img">
					<img src="http://placehold.it/80x80" alt="#" />
				</div>
			</div>
		</div>
	);
}
