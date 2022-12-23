import React from 'react'
import './TopPage.css';
import {v4 as uuidv4} from 'uuid'

function Report({ReportsData}) {
  console.log(ReportsData)

  return (
    <>
    <table className='posts'>
      <thead>
        <tr>
          <th>レポート一覧</th>
        </tr>
      </thead>
      <tbody>
      { ReportsData.map((data)=>(
          <tr key={uuidv4()}>
            <td>名前:{data.Name}</td>
            <td>愛嬌:{data.CharmScore}</td>
            <td>パネマジ度:{data.ExpertScore}</td>
            <td>口コミ:{data.Report}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default Report