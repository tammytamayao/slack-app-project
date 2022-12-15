import {useState, useContext} from "react";
import {UserContextHeader} from "../context/HeaderContext";
import {baseURL} from "../config/AxiosConfig";
import Plus from '../components/Asset/Plus.svg';
import './Channel.css';


export const CreateChannel = () => {
    const headers = useContext(UserContextHeader);

    const prevChannelsList=JSON.parse(localStorage.getItem('channelsList')) || [];
    const [channelsList,setChannelsList]=useState(prevChannelsList);

    const [newChannel, setNewChannel] = useState([]);
    const [channelName,setChannelName]=useState("");
    const [newChannelSuccess, setNewChannelSuccess]=useState(false);

    const createNewChannel = (e) => {
        e.preventDefault();
        let raw = JSON.stringify({
			name: channelName,
			user_ids: [],
		});

		let requestCreateNewChannel = {
			method: 'POST',
			headers: headers,
			body: raw,
			redirect: 'follow',
		};

		fetch(`${baseURL}/channels`, requestCreateNewChannel)
			.then((response) => response.json())
			.then((result) => {
				setNewChannel((newChannel) => newChannel + 1);
				console.log(result.data);
				if(result.data.id !== null) {
					setNewChannelSuccess(true);
					alert("Successfully added new channel");
					getAllChannels();
					setChannelName('');
				}
				setNewChannelSuccess(false);
			})
			.catch((error) => {
				console.log(error);
				alert("Invalid input. Use other Channel name");
			});
		}

    const getAllChannels = () => {
		let requestAllChannels = {
			method: 'GET',
			headers: headers,
			redirect: 'follow',
		};

		fetch(`${baseURL}/channels`, requestAllChannels)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						name: item.name,
						id: item.id,
						owner_id: item.owner_id,
						created_at: new Date(item.created_at),
						updated_at: new Date(item.updated_at),
					});
				});
				updatedList.forEach((item) => {
					item.created_at = item.created_at.toUTCString();
					item.updated_at = item.updated_at.toUTCString();
				});
				setChannelsList(updatedList);
                localStorage.setItem('channelsList',JSON.stringify(updatedList));
                window.location.reload();
			})
			.catch((error) => console.log('error', error));
	};

    return (
        <div  className="DM-Header-container-container">
              <div className="DM-Header-container">
    <div className="DM-title-container"><span className="DM-title">Add New Channel</span></div>
            <form action="" onSubmit={(e) => createNewChannel(e)}>
            <div className="DM-Header-label-container">
                <span className="DM-Header-label">
                    <label>To: </label>
                    <input type="text" placeholder={"Enter channel name here"} onChange={e => setChannelName(e.target.value)}/>
                    <button className="channelBtn"><img src={Plus} className="ChannelIcon" alt="MsgIcon"/></button>
                </span>
            </div>             
            </form>
            </div>
        </div>
    )
}