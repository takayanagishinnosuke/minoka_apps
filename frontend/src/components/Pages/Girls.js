import React from 'react'
import './TopPage.css';

function Girls({GarlsData}) {
  console.log(GarlsData)

  return (
    <>
    <table className='posts'>
      <thead>
        <tr>
          <th>女の子のリスト</th>
        </tr>
      </thead>
      <tbody>
        { GarlsData.map((data)=>(
          <tr key={data.id}>
          <td>{data.Name}</td>
          <td>{data.Store}</td>
          <td><img src={data.imgUrl} width={50} height={50}/></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default Girls