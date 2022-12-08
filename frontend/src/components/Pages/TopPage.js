import React, { useState } from 'react';
import './TopPage.css';
import { Link } from 'react-router-dom';
import { auth } from '../../api/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
//デザイン
import AddCircleIcon from '@mui/icons-material/AddCircle';
//コンポーネント
import Recommend from './Recommend';
import Report from './Report'
import Girls from './Girls'


function TopPage() {
    const [user] = useAuthState(auth);
    const [tab, setTab ] = useState();
    
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
            <div className="cp_ipselect cp_sl04">
                <select required>
                    <option value="" hidden>都道府県</option>
                    {/* 都道府県DBから選べるようにしたい */}
                    <option value="1">東京</option>
                    <option value="2">大阪</option>
                    <option value="3">福岡</option>
                    <option value="4">北海道</option>
                </select>
            </div>
            <div className="cp_ipselect cp_sl04">
                <select required>
                    <option value="" hidden>ジャンル</option>
                    <option value="1">可愛い</option>
                    <option value="2">綺麗</option>
                    <option value="3">人妻</option>
                    <option value="4">素人</option>
                </select>
            </div>
            <div className="cp_ipselect cp_sl04">
                <select required>
                    <option value="" hidden>カップ数</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                    <option value="1">E</option>
                    <option value="2">F</option>
                    <option value="3">G</option>
                    <option value="4">H</option>
                    <option value="4">I</option>
                </select>
            </div>
            <div className="cp_ipselect cp_sl04">
                <select required>
                    <option value="" hidden>体型</option>
                    <option value="1">スレンダー</option>
                    <option value="2">普通</option>
                    <option value="3">グラマー</option>
                    <option value="4">ぽっちゃり</option>                
                </select>
            </div>
            <div className='btn-list'>
                <li herf="#">検索</li>
            </div>

            </div>


            <div className='list'>
            <ul className='btn-list'>
                <li  onClick={() => setTab('review')}>レビュー</li>
                <li  onClick={() => setTab('girls')}>女の子</li>
            </ul>

            {/* 画面切り替え */}
                {
                    tab === 'review' ? <Report /> : <Girls/>
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