import React from 'react'
import { RepoApi } from '../../api/ReportPostApi'





function ReviewPage() {
  return (
    <div>
      <button>戻る</button>
      <div className='search'>
        <RepoApi />
      </div>

    </div>
  )
}

export default ReviewPage