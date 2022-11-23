import React, { useEffect, useState } from 'react'
import axios from "axios"


export const SerchSample = () => {
  //都道府県の取得用のState
  const [Country, SetCountry] = useState([])
  const [CountryValue, SetCountryValue] = useState("")

  //初期ロード時に
  useEffect(() =>{
    //serchAPIを叩く(get)
    const SerchCountry = () =>{
      axios.get("http://localhost:8000/serch" ,{
      }).then(res=>{
        //resで返ってきたらCountryにSetしていく
        // console.log(res)
        SetCountry(res.data.map((data) => ([data.county])))
      }).catch(err=>{
        console.log(err);
      });
    };
    //SerchCountryの呼び出し
    SerchCountry()
  },[]);
  
  const contryChange = (e) =>{
    SetCountryValue(e.target.value)
  }

  console.log(CountryValue)

  return (
    <>
    <div>SerchSample</div>
    <div>
        <label>都道府県</label>
        <select onChange={(e) => contryChange(e)}>
        {Country.map((country) =>{
          return(
            <option key={country}>{country}</option>
          )
        })}
        </select>
    </div>
    </>
  )
}
