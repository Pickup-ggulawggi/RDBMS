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
	return (
		<div className={styles.main}>
			<div className={styles.title}>FC DB</div>
			<div onClick={navigateToSearch} className={styles.search}>Search Player</div>
			<div onClick={navigateToCreate} className={styles.create}>Create Custom Player</div>
		</div>
	)
}

export default TopHeaderBar
