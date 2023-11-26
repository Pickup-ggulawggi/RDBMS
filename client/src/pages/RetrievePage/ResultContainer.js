import styles from "./ResultContainer.module.css"

function ResultContainer(props) {

	const pData = props.playerData.data

	const fetchResult = () => {
		const newArr = []
		console.log(pData)
		if (!pData) {
			return
		} else if (!pData.length) {
			return alert("No player corresponding")
		} else {
			console.log(1)
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
					</div>)
			}
			return newArr;}
	}

	return (
		<div>
			{fetchResult()}
		</div>
	)
}

export default ResultContainer
