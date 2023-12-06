import { useState, useEffect} from 'react'
import axios from 'axios'

import styles from './InputContainer.module.css'

function InputContainer() {

	//initial values when create
	const initialValue = {
		Acceleration: 99,
		Age: 20,
		Aggression: 99,
		Agility: 99,
		Attworkrate: "High",
		Balance: 99,
		Ball: 99,
		Composure: 99,
		Crossing: 99,
		Curve: 99,
		Def: 99,
		Defending: 99,
		Defworkrate: "High",
		Dribbling: 99,
		Finishing: 99,
		Free: 99,
		GK: 99,
		Gender: "M",
		Heading: 99,
		Interceptions: 99,
		Jumping: 99,
		Long: 99,
		Overall: 99,
		Pace: 99,
		Passing: 99,
		Penalties: 99,
		Physicality: 99,
		position: "GK",
		Positioning: 99,
		Preferredfoot: "Right",
		Reactions: 99,
		Shooting: 99,
		Shot: 99,
		Skillmoves: 1,
		Sliding: 99,
		Sprint: 99,
		Stamina: 99,
		Standing: 99,
		Strength: 99,
		Vision: 99,
		Volleys: 99,
		Weakfoot: 1,
		countryId: 0,
		playerId: -1,
		teamId: 0,
		playerName: "",
		leagueId: -1
	}
	//set value states
	const [inputValues, setInputValues] = useState(initialValue);
	const {
		Acceleration,
		Age,
		Aggression,
		Agility,
		Attworkrate,
		Balance,
		Ball,
		Composure,
		Crossing,
		Curve,
		Def,
		Defending,
		Defworkrate,
		Dribbling,
		Finishing,
		Free,
		GK,
		Gender,
		Heading,
		Interceptions,
		Jumping,
		Long,
		Overall,
		Pace,
		Passing,
		Penalties,
		Physicality,
		position,
		Positioning,
		Preferredfoot,
		Reactions,
		Shooting,
		Shot,
		Skillmoves,
		Sliding,
		Sprint,
		Stamina,
		Standing,
		Strength,
		Vision,
		Volleys,
		Weakfoot,
		countryId,
		playerId,
		teamId,
		playerName,
		leagueId} = inputValues

	//get country, league from mysql on first render
	useEffect(() => {
		fetchCountry()
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

	//change main stats by detail stat's average when detail stat changes
	useEffect(() => {
		setInputValues({...inputValues, 'Pace': parseInt((Number(Acceleration)+Number(Sprint))/2) })
	}, [Acceleration, Sprint])

	useEffect(() =>{
		setInputValues({...inputValues, 'Passing': parseInt((Number(Vision)+Number(Crossing)+Number(Free)+Number(Curve))/4) })
	},[Vision, Crossing, Free, Curve])

	useEffect(() => {
		setInputValues({...inputValues, 'Shooting': parseInt((Number(Positioning)+Number(Finishing)+Number(Shot)+Number(Long)+Number(Volleys)+Number(Penalties))/6) })
	}, [Positioning, Finishing, Shot, Long, Volleys, Penalties])

	useEffect(() => {
		setInputValues({...inputValues, 'Dribbling': parseInt((Number(Agility)+Number(Balance)+Number(Reactions)+Number(Ball)+Number(Composure))/5) })
	}, [Agility, Balance, Reactions, Ball, Composure])

	useEffect(() => {
		setInputValues({...inputValues, 'Defending': parseInt((Number(Interceptions)+Number(Heading)+Number(Def)+Number(Standing)+Number(Sliding))/5) })
	}, [Interceptions, Heading, Def, Standing, Sliding])

	useEffect(() => {
		setInputValues({...inputValues, 'Physicality': parseInt((Number(Jumping)+Number(Stamina)+Number(Strength)+Number( Aggression))/4) })
	}, [Jumping, Stamina, Strength, Aggression])

	//connect to server to retrieve data
	const fetchSubmit = async() => {
		await axios.get("http://localhost:5000/create",
		 {params: {
			_Acceleration: Acceleration,
			_Age: Age,
			_Aggression: Aggression,
			_Agility: Agility,
			_Attworkrate: Attworkrate,
			_Balance: Balance,
			_Ball: Ball,
			_Composure: Composure,
			_Crossing:Crossing,
			_Curve :Curve,
			_Def: Def,
			_Defending: Defending,
			_Defworkrate :Defworkrate,
			_Dribbling: Dribbling,
			_Finishing :Finishing,
			_Free: Free,
			_GK: GK,
			_Gender: Gender,
			_Heading: Heading,
			_Interceptions: Interceptions,
			_Jumping: Jumping,
			_Long :Long,
			_Overall: Overall,
			_Pace: Pace,
			_Passing :Passing,
			_Penalties: Penalties,
			_Physicality:Physicality,
			_position: position,
			_Positioning :Positioning,
			_Preferredfoot: Preferredfoot,
			_Reactions: Reactions,
			_Shooting: Shooting,
			_Shot: Shot,
			_Skillmoves: Skillmoves,
			_Sliding: Sliding,
			_Sprint: Sprint,
			_Stamina: Stamina ,
			_Standing: Standing,
			_Strength: Strength,
			_Vision: Vision,
			_Volleys: Volleys,
			_Weakfoot: Weakfoot,
			_countryId: countryId,
			_teamId: teamId,
			_playerName: playerName,
		}
		}).then((result) => {
			fetchTeamUpdate(teamId)
			console.log(result)
			alert("Player added")
		})
	}

	//update team stats
	const fetchTeamUpdate = async() => {
		await axios.get("http://localhost:5000/updateTeam",
		{params: {
		 _teamId: teamId
	 }
	 }).then((result) => {
		 console.log(result)
	 })
	}

	const [countrys, setCountrys] = useState([]);
	//get country info from server to show combobox
	const fetchCountry = async() => {
		await axios.get("http://localhost:5000/country").then((result) => {
			const arr = result.data
			setCountrys(arr)
		})
	}

	const [leagues, setLeagues] = useState([]);
	const fetchLeague = async() => {
		await axios.get("http://localhost:5000/league").then((result) => {
			const arr = result.data
			setLeagues(arr)
		})
	}

	const [teams, setTeams] = useState([]);

	//alert for input range 
	const inputAlert = (e) => {
		if (e.target.value >= 0) {
			if (e.target.value.length > 2) {
				if (e.target.value >= 100) {
					alert("Maximum stat is 99");
				}
				e.target.value = 99;
			}
		} else {
			e.target.value = 0;
			alert("Minimum stat is 0");}
	}

	//handle form values
	const handleChange = (e) => {
		console.log(e.target.value)
		const {value, name: inputName} = e.target
		setInputValues({...inputValues, [inputName]: value})
	}

	//when click submit button
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (playerName === "") {
			return alert("Please input Player Name")
		}
		else if (Overall === "" || GK ==="" || Acceleration === "" || Sprint === "" 
		|| Positioning === "" || Finishing === "" || Shot=== "" || Long === "" || Volleys === ""
		|| Vision === "" || Crossing === "" || Free === "" || Curve === ""
		|| Agility === "" || Balance === "" || Reactions === "" || Ball  === "" || Composure === ""
		|| Interceptions === "" || Heading === "" || Def === "" || Standing === "" || Sliding === ""
		|| Jumping === "" || Stamina === "" || Strength === "" || Aggression === "" ) {
			return alert("Please input all stats")
		}
		if (window.confirm(`Are you sure create Player ${playerName}?`)) fetchSubmit();
	}

	//country input container
	const countryInput = () => {
		return (
			<select className={styles.input_position_box} name='countryId' onChange={handleChange}>
				{countrys.map((option) => (
					<option
						key={option.countryId}
						value={option.countryId}
						name='Country'
					>
						{option.countryName}
					</option>
				))}
		</select>
		)
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
			</select>
		)
	}
	//position input container
	const positionInput = () => {
		const positions = [
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

	const statInput = () => {
		const newArr = []
		const stats = [
			[["Pace", Pace], [["Acceleration", Acceleration, 'Acceleration'], ["Sprint Speed", Sprint, 'Sprint']]], 
			[["Shooting", Shooting], [["Positioning",Positioning, 'Positioning'], ["Finishing", Finishing, 'Finishing'], ["Shot Power", Shot, 'Shot'], ["Long Shots", Long, 'Long'], ["Volleys", Volleys, 'Volleys'], ["Penalties", Penalties, 'Penalties']]],
			[["Passing", Passing], [["Vision", Vision, 'Vision'], ["Crossing", Crossing, 'Crossing'], ["FK. Accuracy", Free, 'Free'], ["Curve", Curve, 'Curve']]],
			[["Dribbling", Dribbling], [["Agility", Agility, 'Agility'], ["Balance", Balance, 'Balance'], ["Reactions", Reactions, 'Reactions'], ["Ball Control", Ball, 'Ball'], ["Composure", Composure, 'Composure']]],
			[["Defending", Defending], [["Interceptions", Interceptions, 'Interceptions'], ["Heading Accuracy", Heading, 'Heading'], ["Def. Awareness" , Def, 'Def'], ["Standing Tackle", Standing, 'Standing'], ["Sliding Tackle", Sliding, 'Sliding']]],
			[["Physicality", Physicality], [["Jumping", Jumping, 'Jumping'], ["Stamina", Stamina, 'Stamina'], ["Strength", Strength, 'Strength'], ["Aggression", Aggression, 'Aggression']]]
		]
		for (var i = 0; i<6; i++){
				newArr.push(
					<div className={styles.input_stat}>
						<div>{stats[i][0][0]} {stats[i][0][1]}</div>
						{stats[i][1].map((e) => {
							return (
								<div>
									{e[0]}
									<input
									className={styles.input_int_box}
									type='number'
									name= {e[2]}
									value= {e[1]}
									onInput={inputAlert}
									onChange={handleChange}/>
								</div>)
						})}
					</div>
					)}
		return (
			newArr
		)
	}

	const ageInput = () => {
		return (
			<input
				className={styles.input_int_box}
				type='number'
				name= 'Age'
				value={Age}
				onInput={inputAlert}
				onChange={handleChange}/>
		)
	}

	const workrate = [
		{value: "High"},
		{value: "Medium"},
		{value: "Low"},
	]

	const attworkrateInput = () => {
		return (
			<select className={styles.input_position_box} name='Attworkrate' onChange={handleChange}>
				{workrate.map((option) => (
					<option
						key={option.value}
						value={option.value}
						name='Attworkrate'>
						{option.value}
					</option>	
				))}
			</select>
			)
	}

	const defworkrateInput = () => {
		return (
			<select className={styles.input_position_box} name='Defworkrate' onChange={handleChange}>
				{workrate.map((option) => (
					<option
						key={option.value}
						value={option.value}
						name='Defworkrate'>
						{option.value}
					</option>	
				))}
			</select>
			)
	}

	const genderInput = () => {
		const gender = [
			{value: "M"},
			{value: "F"},
		]
		return (
			<select className={styles.input_position_box} name='Gender' onChange={handleChange}>
				{gender.map((option) => (
					<option
						key={option.value}
						value={option.value}
						name='Gender'>
						{option.value}
					</option>	
				))}
			</select>
			)
	}

	const skill = [
		{value: 1},
		{value: 2},
		{value: 3},
		{value: 4},
		{value: 5},
	]
	const skillmovesInput = () => {
		return (
			<select className={styles.input_position_box} name='Skillmoves' onChange={handleChange}>
				{skill.map((option) => (
					<option
						key={option.value}
						value={option.value}
						name='Skillmoves'>
						{option.value}
					</option>	
				))}
			</select>
			)
	}

	const weakfootInput = () => {
		return (
			<select className={styles.input_position_box} name='Weakfoot' onChange={handleChange}>
				{skill.map((option) => (
					<option
						key={option.value}
						value={option.value}
						name='Weakfoot'>
						{option.value}
					</option>	
				))}
			</select>
			)
	}

	const preferredfootInput = () => {
		const pref = [{value: "Right"}, {value: "Left"} ]
		return (
			<select className={styles.input_position_box} name='Preferredfoot' onChange={handleChange}>
				{pref.map((option) => (
					<option
						key={option.value}
						value={option.value}
						name='Preferredfoot'>
						{option.value}
					</option>	
				))}
			</select>
			)
	}

	const gkInput = () => {
		return (
			<input
				className={styles.input_int_box}
				type='number'
				name= 'GK'
				value={GK}
				onInput={inputAlert}
				onChange={handleChange}/>
		)
	}

	const overallInput = () => {
		return (
			<input
				className={styles.input_int_box}
				type='number'
				name= 'Overall'
				value={Overall}
				onInput={inputAlert}
				onChange={handleChange}/>
		)
	}

	const playerNameInput = () => {
		return (
			<div>
				<div className={styles.text}>Player Name</div>
					<input
						className={styles.input_text_box}
						type='text'
						name='playerName'
						value={playerName||""}
						onChange={handleChange}
					/>
			</div>
		)
	}

	return (
		<form className={styles.main} onSubmit={handleSubmit}>
			<div>
				<div className={styles.title}>CREATE YOUR OWN PLAYER</div>
				<div>{playerNameInput()}</div>
				<div className={styles.text}>Country</div>
				<div>{countryInput()}</div>
				<div className={styles.text}>League</div>
				<div>{leagueInput()}</div>
				<div className={styles.text}>Team</div>
				<div>{teamInput()}</div>
				<div className={styles.text}>Position</div>
				<div>{positionInput()}</div>
				<div className={styles.text}>Age</div>
				<div>{ageInput()}</div>
				<div className={styles.text}>Gender</div>
				<div>{genderInput()}</div>
			</div>
			<div>
				<div className={styles.text}>ATT Work Rate</div>
				<div>{attworkrateInput()}</div>
				<div className={styles.text}>DEF Work Rate</div>
				<div>{defworkrateInput()}</div>
				<div className={styles.text}>Skill moves</div>
				<div>{skillmovesInput()}</div>
				<div className={styles.text}>Weak foot</div>
				<div>{weakfootInput()}</div>
				<div className={styles.text}>Preferred foot</div>
				<div>{preferredfootInput()}</div>
				<div className={styles.text}>Gk</div>
				<div>{gkInput()}</div>
				<div className={styles.text}>Overall</div>
				<div>{overallInput()}</div>
			</div>
			<div>
				<div className={styles.input_stat_container}>{statInput()}</div>
				<button type="submit" className={styles.submit_button}>submit</button>
			</div>
		</form>
	)
}

export default InputContainer
