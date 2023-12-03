//imports
import { useNavigate } from 'react-router-dom';

//css
import styles from './TopHeaderBar.module.css';

function TopHeaderBar() {

	const navigate = useNavigate()

	const navigateToSearch = () =>{
		navigate("/")
	}

	const navigateToCreate = () => {
		navigate("/create")
	}
	const navigateToTeam = () => {
		navigate("/team")
	}
	return (
		<div className={styles.main}>
			<div className={styles.title}>FC DB</div>
			<div onClick={navigateToSearch} className={styles.search}>SEARCH PLAYER</div>
			<div onClick={navigateToCreate} className={styles.create}>CREATE CUSTOM PLAYER</div>
			<div onClick={navigateToTeam} className={styles.create}>Team INFO</div>
		</div>
	)
}

export default TopHeaderBar
