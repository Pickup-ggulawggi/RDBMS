import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from "./ResultContainer.module.css"

function ResultContainer(props) {

	//store result data 
	const pData = props.playerData.data

	//initial values when create
	const initialValue = {
		teamId: 0,
		leagueId: -1}

	//set value states
	const [inputValues, setInputValues] = useState(initialValue);
	const {
		teamId,
		leagueId,
	} = inputValues

	//get country, league from mysql on first render
	useEffect(() => {
		fetchLeague()
	}, [])
	
	//get team from mysql on first render and when league selected
	useEffect(() => {
		const fetchTeam = async() => {
			await axios.get("http://localhost:5000/team",
				{params: {
					_leagueId: leagueId,
				}}
			).then((result) => {
				const arr = result.data
				setTeams(arr)
			})
		}
		fetchTeam()
	}, [leagueId])

	//update team stats
	const fetchTeamUpdate = async(id) => {
		await axios.get("http://localhost:5000/updateTeam",
		{params: {
		 _teamId: id
	 }
	 }).then((result) => {
		 console.log(result)
	 })
	}

	//handle form values
	const handleChange = (e) => {
		const {value, name: inputName} = e.target
		setInputValues({...inputValues, [inputName]: value})
	}
	
	const handleUpdate = (e) => {
		const i = e.target.value
		const prevTeam = pData[i].teamId
		if (window.confirm(`Are you sure transfer ${pData[i].playerName}?`)) updatePlayer(pData[i].playerId, teamId, prevTeam);
		return 
	}

	const updatePlayer = async(x, y, z) => {
		await axios.get("http://localhost:5000/update",
			{params: {
				_pId: x,
				_teamId: y
			}}
			).then((result) => {
				fetchTeamUpdate(y)
				fetchTeamUpdate(Number(z))
				alert("Player transferred") 
			})
		}

	//display confirm when click delete button
	const handleDelelte = (e) => {
		const pId = pData[e.target.value].playerId;
		const pTeam = pData[e.target.value].teamId
		if (window.confirm(`Are you sure delete Player ${e.target.name}?`)) deletePlayer(pId, pTeam);
	}
	//delete selected player
	const deletePlayer = async(pid, pteam) => {
		await axios.get("http://localhost:5000/delete",
			{params: {
				_pId: pid
			}}
			).then((result) => {
				fetchTeamUpdate(pteam)
				alert("Player deleted") 
			})
		}

	//togle update buttons
	let arr = new Array(50).fill(false)
	const [isOpen, setIsOpen] = useState(arr)
	const onUpdate = (e) => {
		let i = e.target.value
		let arr = [...isOpen]
		arr[i] = !arr[i]
		setIsOpen(arr)
	}

	const [leagues, setLeagues] = useState([]);
	const fetchLeague = async() => {
		await axios.get("http://localhost:5000/league").then((result) => {
			const arr = result.data
			setLeagues(arr)
		})
	}

	const [teams, setTeams] = useState([]);

	//league input container
	const leagueInput = () => {
		return (
			<select className={styles.input_position_box} name='leagueId' onChange={handleChange}>
				{leagues.map((option) => 
					<option
						key={option.leagueId}
						value={option.leagueId}
						name='league'>
						{option.leagueName}
					</option>
				)}
			</select>
		)
	}

	//team input container
	const teamInput = () => {
		return (
			<select className={styles.input_position_box} name='teamId' onChange={handleChange}>
				{teams.map((option) => (
					<option
						key={option.teamId}
						value={option.teamId}
						name='team'>
						{option.teamName}
					</option>
				))}
			</select>)}


	//show update container
	const viewUpdate = (i) => {
		if (isOpen[i]) {
			return (
				<div className={styles.details}>
					<div>
						<div className={styles.updateText}>Country: {pData[i].countryName}</div>
						<div className={styles.updateText}>League: {pData[i].leagueName}</div>
						<div className={styles.updateText}>Team: {pData[i].teamName}</div>
						<div className={styles.updateText}>Age: {pData[i].Age}</div>
						<div className={styles.updateText}>Att workrate: {pData[i].Attworkrate}</div>
						<div className={styles.updateText}>Def workrate: {pData[i].Defworkrate}</div>
						<div className={styles.updateText}>Weakfoot: {pData[i].Weakfoot}</div>
						<div className={styles.updateText}>Skillmoves: {pData[i].Skillmoves}</div>
						<div className={styles.updateText}>Gender: {pData[i].Gender}</div>
						<div className={styles.updateText}>GK: {pData[i].GK}</div>
					</div>
					<div>
						<div className={styles.updateText}>Acceleration: {pData[i].Acceleration}</div>
						<div className={styles.updateText}>Sprint Speed: {pData[i].Sprint}</div>
					</div>
					<div>
						<div className={styles.updateText}>Positioning: {pData[i].Positioning}</div>
						<div className={styles.updateText}>Finishing: {pData[i].Finishing}</div>
						<div className={styles.updateText}>Shooting: {pData[i].Shot}</div>
						<div className={styles.updateText}>Long shot: {pData[i].Long}</div>
						<div className={styles.updateText}>Volleys: {pData[i].Volleys}</div>
						<div className={styles.updateText}>Penalty Kick: {pData[i].Penalties}</div>
					</div>
					<div>
						<div className={styles.updateText}>Vision: {pData[i].Vision}</div>
						<div className={styles.updateText}>Crossing: {pData[i].Crossing}</div>
						<div className={styles.updateText}>Shooting: {pData[i].Shot}</div>
						<div className={styles.updateText}>FK. Accuracy: {pData[i].Free}</div>
						<div className={styles.updateText}>Curve: {pData[i].Curve}</div>
					</div>
					<div>
						<div className={styles.updateText}>Agility: {pData[i].Agility}</div>
						<div className={styles.updateText}>Balance: {pData[i].Balance}</div>
						<div className={styles.updateText}>Reactions: {pData[i].Reactions}</div>
						<div className={styles.updateText}>Ball Control: {pData[i].Ball}</div>
						<div className={styles.updateText}>Composure: {pData[i].Composure}</div>
					</div>
					<div>
						<div className={styles.updateText}>Interceptions: {pData[i].Interceptions}</div>
						<div className={styles.updateText}>Heading: {pData[i].Heading}</div>
						<div className={styles.updateText}>Def. awareness: {pData[i].Def}</div>
						<div className={styles.updateText}>Standing Tackle: {pData[i].Standing}</div>
						<div className={styles.updateText}>Sliding Tackle: {pData[i].Sliding}</div>
					</div>
					<div>
						<div className={styles.updateText}>Jumping: {pData[i].Jumping}</div>
						<div className={styles.updateText}>Stamina: {pData[i].Stamina}</div>
						<div className={styles.updateText}>Strength: {pData[i].Strength}</div>
						<div className={styles.updateText}>Aggression: {pData[i].Aggression}</div>
					</div>
					<div className={styles.updateText}>Transfer {pData[i].playerName} to</div>
					<div className={styles.updateText}>{leagueInput()}</div>
					<div className={styles.updateText}>{teamInput()}</div>
					<button className={styles.submit_button} value={i} onClick={handleUpdate}>submit</button>
				</div>
			)}
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
							<button value={i} onClick={onUpdate}>DETAIL / UPDATE</button>&ensp;
							<button value={i} name={pData[i].playerName} onClick={handleDelelte}>DELETE</button>
						</div>
						<div className={styles.updateContainer}>
							{viewUpdate(i)}
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
