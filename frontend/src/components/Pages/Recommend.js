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
      //戻ってきたデータでnull配列が入っていたら除外
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
              <img src={data.image} />
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