import SearchContainer from './SearchContainer'
import ResultContainer from './ResultContainer'
import { useState } from 'react'

import styles from './RetrievePage.module.css'


function RetrievePage() {

	//selected data
	const [data, setData] = useState(0);

	return (
		<div className={styles.main}>
			<SearchContainer setData={setData}/>
			<ResultContainer playerData={data}/>
		</div>
	)
}

export default RetrievePage
