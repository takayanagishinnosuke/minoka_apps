import React, { useState } from 'react';
import './TopPage.css';
import { Link } from 'react-router-dom';
import { auth } from '../../api/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import axios from "axios"
import { ServerUrl } from '../../api/api'
//デザイン
import AddCircleIcon from '@mui/icons-material/AddCircle';
//コンポーネント
import Recommend from './Recommend';
import Report from './Report'
import Girls from './Girls'


function TopPage() {
    const [user] = useAuthState(auth);
    const [tab, setTab ] = useState();
    //都道府県格納用
    const [CountryValue, SetCountryValue] = useState("None")
    //カップ数格納用
    const [SizeValue, SetSizeValue] = useState("None")
    //スタイル数格納用
    const [StyleValue, SetStyleValue] = useState("None")

    //DBからのガールズデータ格納用
    const [GirlsData,setGirlsData] = useState([])

    //DBからのレポートデータ格納用
    const [ReportsData,setReportsData] = useState([])

    //都道府県に選択があれば変化した値を取得
    const CountryChange = (e) =>{
        SetCountryValue(e.target.value)
    }
    //カップ数の選択に変化があれば変化した値を取得
    const SizeChange = (e) =>{
        SetSizeValue(e.target.value)
    }
    //スタイルの選択に変化があれば変化した値を取得
    const StyleChange = (e) =>{
        SetStyleValue(e.target.value)
    }

    //絞り込みしてAPI叩き、データを受け取る関数
    const SerchPost = () =>{
        if(CountryValue==="None" && SizeValue==="None" && StyleValue==="None"){
            alert("検索条件を1つ以上選択してください")
        }else{
            axios.post(ServerUrl + "serch",{
                country:CountryValue,
                size:SizeValue,
                style:StyleValue
            }).then(res =>{
                // console.log(res)
                // console.log(res.data.GarlsData)
                setGirlsData(res.data.GarlsData)
                // console.log(res.data.ReportData)
                setReportsData(res.data.ReportData)
            }).catch(err=>{
                console.log(err)
            })
        };
    }

    
  return (
      
    <div className='main'>

       {user ? (
        <>
            <Recommend />
        </>
       ) : (
        <></>
       )}

        <div className='body'>
            <div className='search'>
                    <p id='serchtitle'>条件で絞り込む</p>
   
            <div className="cp_ipselect cp_sl04">
                <select onChange={(e)=> CountryChange(e)} required>
                    <option value="None" hidden>都道府県</option>
                    {/* 都道府県DBから選べるようにしたい */}
                    <option value="東京">東京</option>
                    <option value="大阪">大阪</option>
                    <option value="福岡">福岡</option>
                    <option value="愛知">愛知</option>
                </select>
            </div>

            <div className="cp_ipselect cp_sl04">
                <select onChange={(e)=> SizeChange(e)} required>
                    <option value="None" hidden>カップ数</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                </select>
            </div>
            <div className="cp_ipselect cp_sl04">
                <select onChange={(e)=> StyleChange(e)} required>
                    <option value="None" hidden>体型</option>
                    <option value="スリム">スリム</option>
                    <option value="普通">普通</option>
                    <option value="グラマー">グラマー</option>
                    <option value="ぽっちゃり">ぽっちゃり</option>                
                </select>
            </div>
            <div className='btn-list'>
                <li onClick={SerchPost}>検索</li>
            </div>

            </div>


            <div className='list'>
            <ul className='btn-list'>
                <li  onClick={() => setTab('review')}>レビュー</li>
                <li  onClick={() => setTab('girls')}>女の子</li>
            </ul>

            {/* 画面切り替え */}
                {
                    tab === 'review' ? <Report ReportsData={ReportsData}/> : 
                    <Girls GarlsData={GirlsData}/>
                }    

            {user ? (
                <>
                <div className='post-btn'>
                    <Link to="/Review">                       
                    <AddCircleIcon sx={{ fontSize: 80}} color="secondary"/>
                    </Link>
                </div>
                </>
                ) : (
                <></>
                )}
            </div>
                
        </div>
    </div>
    
  )
}

export default TopPage;