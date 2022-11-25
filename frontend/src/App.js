import './App.css';
import { ApiSample } from './api/ApiSample';
import React, { useEffect } from 'react'
import axios from "axios"

function App() {
  //サーバーサイドのエンドポイント
  const EndPoint = "http://localhost:8000/"

  //初期ロード時にAPIを叩いて、サーバーサイドからの返答をチェック
  useEffect(() =>{
    const GetApi = () =>{
      axios.get(EndPoint,{
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      });
    };
    GetApi()
  },[])


  return (
    <div className="App">
        <ApiSample />
    </div>
  );
}

export default App;
