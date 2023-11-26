import InputContainer from './InputContainer'
import InputListTab from './InputListContainer'

import styles from './CreatePage.module.css'


function CreatePage() {
	return (
		<div className={styles.main}>
			<InputContainer/>
			<InputListTab/>
		</div>
	)
}

export default CreatePage
