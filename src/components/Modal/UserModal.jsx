import React, { useState } from 'react';
import styled from 'styled-components';
import UserImg from '../Asset/UserImg.png';
import { useNavigate } from 'react-router';
import './modal.css'

export const UserSetting = () => {
	const workspaceName = 'Avion School';
	const [isUserActive, setUserActive] = useState(
		localStorage.getItem('isUserActive')
	);

	const navigate = useNavigate();

	const isUserActiveHandler = () => {
		localStorage.getItem('isUserActive') === 'true'
			? localStorage.setItem('isUserActive', 'false')
			: localStorage.setItem('isUserActive', 'true');
		setUserActive(!isUserActive);
	};

	let user = JSON.parse(localStorage.getItem('userInfo'));

	const logOutHandler = () => {
		localStorage.clear();
		navigate('/');
		window.location.reload();
	};

	return (
		<div className='userSetting-container'>
				<div className="UserProfile">
					<div className="UserImage"><img src={UserImg} alt='User' /></div>
					<div className="UserName">
						<span className='user-name'><b>{user.email}</b></span>
						<span className='user-status'>{localStorage.getItem('isUserActive') === 'true'? 'Away': 'Active'}
						</span>
					</div>
				</div>
				<div className="UserStatus">
					<div className="UpdateStatus"><span>Update your status</span></div>
					<div className="SetStatus" onClick={isUserActiveHandler}>
						Set yourself as{' '}
						<b>
							{localStorage.getItem('isUserActive') === 'false'
								? 'active'
								: 'away'}
						</b>
					</div>
					<div className="PauseNotification"><span>Pause notifications</span></div>
				</div>
				<div className="ProfileOptions">
					<div className="Profile"><span>Profile</span></div>
					<div className="Preference"><span>Preferences</span></div>
				</div>
				<div className="Wrapper">
					<div className="Download">
						<span>Downloads</span>
						<span className='download-shortcut'>Ctrl+Shift+J</span>
					</div>
					<div className="SignOut" onClick={logOutHandler}>
					<span>Sign out of {workspaceName}</span>
					</div>
				</div>

		</div>
	);
};
