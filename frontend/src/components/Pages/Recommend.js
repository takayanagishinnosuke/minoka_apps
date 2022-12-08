import React, { useContext, useEffect, useState } from 'react'
import { ServerUrl } from '../../api/api';
import { AuthContext } from '../../api/firebase';
import axios from "axios"
import {v4 as uuidv4} from 'uuid'



const Recommend = () => {
  const currentUser = useContext(AuthContext)
  const [recommendData,setrecommendData] = useState()
  
  const UidPost = (uid) =>{
    axios.post(ServerUrl + "postid" ,{
      uid: uid
    }).then(res=>{
      // console.log(res.data)
      //戻ってきたデータでnull配列がないかダブルチェック
      setrecommendData(res.data.filter((item)=>item!=null))
    }).catch(err=>{
      console.log(err)
    });
  }

  //ユーザーIDからおすすめの女優データを返すAPI
  const fetch = async()=>{
      if (currentUser.currentUser.uid){
          const uid = currentUser.currentUser.uid
          //API.jsのサーバーサイドAPIにuidを投げる処理
          await UidPost(uid)
      };
  };

  //画面の初期リロード時に発火
  useEffect(()=>{
    fetch();
  },[])
  
  //確認用
  if(recommendData){
    console.log(recommendData)
  }

return (
  <div>
    <div className='recommend'>
    {recommendData ? (
      <>
      <p>あなたにオススメの女優さん</p>
      <div className="recommend_datas">
        {recommendData.map((data)=>(
            <div key={uuidv4()}>
              <p>{data.name}</p>
              <a href={data.shop} target="_blank" rel='noopener noreferrer'>
                <img src={data.image} />
              </a>
              {data.bust ? (
                <>
                <p>バスト : {data.bust}♡</p>
                </>
              ):(
                <>
                <p>バスト : 秘密♡</p>
                </>
              )}
              {data.waist ? (
                <>
                <p>ウェスト : {data.waist}♡</p>
                </>
              ):(
                <>
                <p>ウェスト : 秘密♡</p>
                </>
              )}
              {data.hip ? (
                <>
                <p>ヒップ : {data.hip}♡</p>
                </>
              ):(
                <>
                <p>ヒップ : 秘密♡</p>
                </>
              )}
            </div>
            ))}
      </div>
      </>
    ) : (
      <>
        <p>...ローディング中</p>
      </>
    )}
    </div>
  </div>
  )
}

export default Recommend