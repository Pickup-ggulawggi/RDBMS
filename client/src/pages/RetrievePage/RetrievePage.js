import SearchContainer from './SearchContainer'
import ResultContainer from './ResultContainer'
import { useState } from 'react'

import styles from './RetrievePage.module.css'


function RetrievePage() {

	const [data, setData] = useState(0);


	console.log(data)

	return (
		<div className={styles.main}>
			<SearchContainer setData={setData}/>
			<ResultContainer playerData={data}/>
		</div>
	)
}

export default RetrievePage
