import './App.css';
import React, { useEffect } from 'react'
import axios from "axios"
import { AuthProvider } from './api/firebase';
import ReviewPage from './components/Pages/ReviewPage';
import TopPage from './components/Pages/TopPage';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';

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
    <AuthProvider>
    <Router>
      <div className="App">
      <Header/>
      <Routes>
          <Route path='/' element={ <TopPage/>} />
          <Route path='/Review' element={ <ReviewPage/>} />   
      </Routes>

      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
