import { useState, useEffect } from "react";
import axios from "axios";

import styles from '../TeamInfoPage/TeamInfo.module.css'

function TeamInfo() {
	//initial values when search
	const initialValue = {
		leagueId: 0,
	}

	const [data, setData] = useState(0)

	//set value states
	const [inputValues, setInputValues] = useState(initialValue);
	const {
		leagueId,} = inputValues

	useEffect(() => {
		fetchLeague()
	}, [])


	//handle form values
	const handleChange = (e) => {
		const {value, name: inputName} = e.target
    setInputValues({...inputValues, [inputName]: value})
	}

	//connect to server to retrieve data
	const fetchSubmit = async() => {
		await axios.get("http://localhost:5000/teaminfo",
		 {params: {
			_leagueId: leagueId,
		}
		}).then((result) => {
			console.log(result)
			setData(result.data)
		})
	}

	const [leagues, setLeagues] = useState([]);
	const fetchLeague = async() => {
		await axios.get("http://localhost:5000/league").then((result) => {
			const arr = result.data
			setLeagues(arr)
		})
	}

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

	const viewTeams = () => {
		if (!data) return
		else {
			const newArr = []
			for ( var i = 0; i< data.length; i++) {
				newArr.push(
					<div className={styles.team}>
						<div className={styles.textbox}>
							{data[i].teamName}
						</div>
						<div className={styles.text}>
							OVR: {data[i].OVR}
						</div>
						<div className={styles.text}>
							ATT: {data[i].ATT}
						</div>
						<div className={styles.text}>
							MID: {data[i].MID}
						</div>
						<div className={styles.text}>
							DEF: {data[i].DEF}
						</div>
						<div className={styles.text}>
							NUMBER of PLAYERS: {data[i].playerNum}
						</div>
					</div>
				)
			}
			return (
				newArr
			)
		}
	} 

	return (
		<div>
			<div className={styles.title}>
				Search Teams
			</div>
			{leagueInput()}
			<button onClick={fetchSubmit}>submit</button>
			<div>
				{viewTeams()}
			</div>
		</div>
	)
}

export default TeamInfo
