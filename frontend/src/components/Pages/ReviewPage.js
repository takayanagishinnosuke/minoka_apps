import React from 'react'
import { RepoApi } from '../../api/ReportPostApi'

import './TopPage.css';





function ReviewPage() {
  return (
    <div>
     
      
      <div className='report'>
        <RepoApi />
      </div>

    </div>
  )
}

export default ReviewPage