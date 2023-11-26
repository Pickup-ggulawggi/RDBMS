import { useState } from 'react'
import axios from 'axios';
import styles from './SearchContainer.module.css'

function SearchContainer(props) {

	const initialValue = {
		minAcceleration: 0,
		maxAcceleration: 99,
		minAge: 0,
		maxAge: 99,
		minAgression: 0, 
		maxAggression: 99,
		minAgility: 0,
		maxAgility: 99,
		Attworkrate: "High",
		minBalance: 0,
		maxBalance: 99,
		minBall: 0,
		maxBall: 99,
		minComposure: 0,
		maxComposure: 99,
		minCrossing: 0,
		maxCrossing: 0,
		minCurve: 0,
		maxCurve: 99,
		minDef: 0,
		maxDef: 99,
		minDefending: 0,
		maxDefending: 99,
		Defworkrate: "Low",
		minDribbling: 0,
		maxDribbling: 99,
		minFinishing: 0,
		maxFinishing: 99,
		minFree: 0,
		maxFree: 99,
		minGK: 0,
		maxGK: 99,
		Gender: "M",
		minHeading: 0,
		maxHeading: 99,
		minInterceptions: 0,
		maxInterceptions: 99,
		minJumping: 0,
		maxJumping: 99,
		minLong: 0,
		maxLong: 99,
		minOverall: 0,
		maxOverall: 99,
		minPace: 0,
		maxPace: 99,
		minPassing: 0,
		maxPassing: 99,
		minPenalties: 0,
		maxPenalties: 99,
		minPhysicality: 0,
		maxPhysicality: 99,
		position: "ALL",
		minPositioning: 0,
		maxPositioning: 99,
		Preferredfoot: "",
		minReactions: 0,
		maxReactions: 99,
		minShooting: 0,
		maxShooting: 99,
		minShot: 0,
		maxShot: 99,
		Skillmoves: "5",
		minSliding: 0,
		maxSliding: 99,
		minSprint: 0,
		maxSprint: 99,
		minStamina: 0,
		maxStamina: 99,
		minStanding: 0,
		maxStanding: 99,
		minStrength: 0,
		maxStrength: 99,
		minVision: 0,
		maxVision: 99,
		minVolleys: 0,
		maxVolleys: 99,
		Weakfoot: "4",
		countryId: -1,
		playerId: -1,
		teamId: -1,
		playerName: "",
		teamName: "",
		countryName: "",
		leagueName: "",
	}
	const [inputValues, setInputValues] = useState(initialValue);
	const {
		minAcceleration,
		maxAcceleration,
		minAge,
		maxAge,
		minAgression,
		maxAggression,
		minAgility,
		maxAgility,
		Attworkrate,
		minBalance,
		maxBalance,
		minBall,
		maxBall,
		minComposure,
		maxComposure,
		minCrossing,
		maxCrossing,
		minCurve,
		maxCurve,
		minDef,
		maxDef,
		minDefending,
		maxDefending,
		Defworkrate,
		minDribbling,
		maxDribbling,
		minFinishing,
		maxFinishing,
		minFree,
		maxFree,
		minGK,
		maxGK,
		Gender,
		minHeading,
		maxHeading,
		minInterceptions,
		maxInterceptions,
		minJumping,
		maxJumping,
		minLong,
		maxLong,
		minOverall,
		maxOverall,
		minPace,
		maxPace,
		minPassing,
		maxPassing,
		minPenalties,
		maxPenalties,
		minPhysicality,
		maxPhysicality,
		position,
		minPositioning,
		maxPositioning,
		Preferredfoot,
		minReactions,
		maxReactions,
		minShooting,
		maxShooting,
		minShot,
		maxShot,
		Skillmoves,
		minSliding,
		maxSliding,
		minSprint,
		maxSprint,
		minStamina,
		maxStamina,
		minStanding,
		maxStanding,
		minStrength,
		maxStrength,
		minVision,
		maxVision,
		minVolleys,
		maxVolleys,
		Weakfoot,
		countryId,
		playerId,
		teamId,
		playerName,
		teamName,
		countryName,
		leagueName,} = inputValues

	const mainStatText = [ "Overall", "Pace", "Shooting", "Passing", "Dribbling" , "Defending","Physicality"]
	const mainStat = [
		[minOverall, "minOverall"], [maxOverall, "maxOverall"],
		[minPace, "minPace"], [maxPace, "maxPace"],  
		[minShooting, "minShooting"], [maxShooting, "maxShooting"], 
		[minPassing, "minPassing"], [maxPassing, "maxPassing"],
		[minDribbling, "minDribbling"], [maxDribbling, "maxDribbling"],
		[minDefending, "minDefending"], [maxDefending, "maxDefending"],
		[minPhysicality, "minPhysicality"], [maxPhysicality, "maxPhysicality"]
	];

	//handle form values
	const handleChange = (e) => {
		const {value, name: inputName} = e.target
		console.log(`Selected ${inputName}: ${value}`);
    setInputValues({...inputValues, [inputName]: value})
	}

	//on submit button
	const handleSubmit = async (e) => {
		e.preventDefault();
		const {value, name: inputName} = e.target
    setInputValues({...inputValues, [inputName]: value})
		fetchSubmit()
	}

	//mainstat input container
	const mainStatInput = () => {
		const newArr = []
		for (let i = 0; i < 14; i++){
			if (i%2 === 0) {
				newArr.push(
					<div className={styles.text}>{mainStatText[i/2]}</div> 
				)
			}
			newArr.push(
				<input
				className={styles.input_int_box}
				type='number'
				name= {mainStat[i][1]}
				value= {mainStat[i][0]}
				onChange={handleChange}
				/>)
		}
		return newArr;
	}

	//position input container
	const positionInput = () => {
		const positions = [
			{value: "ALL"},
			{value: "GK"},
			{value: "RWB"},
			{value: "RB"},
			{value: "CB"},
			{value: "LWB"},
			{value: "LB"},
			{value: "CM"},
			{value: "CDM"},
			{value: "CAM"},
			{value: "RM"},
			{value: "LM"},
			{value: "RW"},
			{value: "LW"},
			{value: "CF"},
			{value: "ST"},
		]
		return (
			<select className={styles.input_position_box} name='position' onChange={handleChange}>
				{positions.map((option) => (
				  <option
						key={option.value}
						value={option.value}
						name='Position'>
						{option.value}
					</option>	
				))}
			</select>
		)
	}

	//connect to server
	const fetchSubmit = async() => {
		await axios.get("http://localhost:5000/player",
		 {params: {
			_name: playerName,
			_position: position,
			_minOverall: minOverall,
			_maxOverall: maxOverall,
			_minPace: minPace,
			_maxPace: maxPace,
			_minShooting: minShooting,
			_maxShooting: maxShooting,
			_minPassing: minPassing,
			_maxPassing: maxPassing,
			_minDribbling: minDribbling,
			_maxDribbling: maxDribbling,
			_minDefending: minDefending,
			_maxDefending: maxDefending,
			_minPhysicality: minPhysicality,
			_maxPhysicality: maxPhysicality,
		}
		}).then((result) => {
			console.log(playerName)
			console.log(result.data)
			props.setData(result)
		})
	}

	return (
		<form className={styles.main} onSubmit={handleSubmit}>
			<div className={styles.text}>Search Players</div>
			<div className={styles.text}>player name</div>
			<input
				className={styles.input_text_box}
				type='text'
				name='playerName'
				value={playerName||""}
				onChange={handleChange}
			/>
			<div className={styles.text}>Position</div>
			<div>{positionInput()}</div>
			<div>{mainStatInput()}</div>
			<button type="submit">submit</button>

		</form>
	)
}

export default SearchContainer
