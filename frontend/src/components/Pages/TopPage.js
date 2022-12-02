import React, { useContext, useEffect, useState } from 'react';
import './TopPage.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../api/firebase';
//デザイン
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UidPost } from '../../api/api';
// import ReviewPage from './ReviewPage';



function TopPage() {
    const currentUser = useContext(AuthContext)
    
    useEffect(()=>{
        fetch()
    },[currentUser])

    const fetch = async()=>{
        if (currentUser.currentUser.uid){
            console.log('やほ-')
            const uid = currentUser.currentUser.uid
            //API.jsのサーバーサイドAPIにuidを投げる処理
            UidPost(uid)
        };
    };

  return (
      
    <div className='main'>

       

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
                    <a herf="#">検索</a>
                </div>


            </div>


            <div className='list'>
                <div className='btn-list'>
                    <a herf="#">レビュー</a>
                    <a herf="#">姫</a>
                    <a herf="#">店舗</a>
                </div>
                <div className='post-btn'>
            
                   
                    
                <AddCircleIcon sx={{ fontSize: 80}} 
                    color="secondary"
                    component={Link} to="/Review"
                    >
                    </AddCircleIcon>
                </div>
                </div>

                
            </div>
        </div>
    

  )
}

export default TopPage;