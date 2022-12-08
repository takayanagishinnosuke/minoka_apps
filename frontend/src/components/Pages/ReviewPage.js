import React from 'react'
import { RepoApi } from '../../api/ReportPostApi'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './TopPage.css';





function ReviewPage() {
  return (
    <div>
      <Link to="/"><HomeIcon sx={{ fontSize: 80}}/></Link>
      
      <div className='search'>
        <RepoApi />
      </div>

    </div>
  )
}

export default ReviewPage