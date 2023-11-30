import axios from 'axios';

import styles from "./ResultContainer.module.css"

function ResultContainer(props) {

	//store result data 
	const pData = props.playerData.data

	//display confirm when click delete button
	const handleDelelte = (e) => {
		const pId = e.target.value;
		if (window.confirm(`Are you sure delete Player ${e.target.name}?`)) deletePlayer(pId);
	}
	//delete selected player
	const deletePlayer = async(props) => {
		await axios.get("http://localhost:5000/delete",
			{params: {
				_pId: props
			}}
			).then((result) => {
				alert("Player deleted") 
			})
		}
	//display result
	const fetchResult = () => {
		const newArr = []
		//on first render
		if (!pData) {
			return
		} 
		//if no player returned from server
		else if (!pData.length) {
			return alert("No player corresponding")
		} 
		// player returned correctly
		else {
			for (let i = 0; i < pData.length; i++){
				newArr.push(
					<div className={styles.main}>
						<div className={styles.position}>
							{pData[i].Position}
						</div>
						<div className={styles.name}>
							{pData[i].playerName}
						</div>
						<div>
							OVR: {pData[i].Overall} &ensp;
						</div>
						<div>
							PAC: {pData[i].Pace} &ensp;
						</div>
						<div>
							SHO: {pData[i].Shooting} &ensp;
						</div>
						<div>
							PAS: {pData[i].Passing} &ensp;
						</div>
						<div>
							DRI: {pData[i].Dribbling} &ensp;
						</div>
						<div>
							DEF: {pData[i].Defending} &ensp;
						</div>
						<div>
							PHY: {pData[i].Physicality} &ensp;
						</div>
						<div>
							<button>UPDATE</button>&ensp;
							<button value={pData[i].playerId} name={pData[i].playerName}onClick={handleDelelte}>DELETE</button>
						</div>
					</div>)
			}
			return newArr;}
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>SEARCH RESULT</div>
			{fetchResult()}
		</div>
	)
}

export default ResultContainer
