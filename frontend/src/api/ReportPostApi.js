// このコンポーネントの目的は検索と投稿のAPIサンプルです
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import { ServerUrl } from './api'
import { AuthContext } from './firebase'

import '../components/Pages/TopPage.css';
import {FaStar} from "react-icons/fa";




export const RepoApi = () => {

  

  const [FirstValue, SetFirstValue] = useState(false)
  const currentUser = useContext(AuthContext)

  //都道府県データの取得用
  const [Country, SetCountry] = useState([])
  const [CountryValue, SetCountryValue] = useState("")

  //店名データの取得用
  const [Store, SetStore] = useState([])
  const [StoreValue, SetStoreValue] = useState("")

  //ガールズデータの取得用
  const [Girls, SetGirls] = useState([])
  //ガールズバリューにはGIDと画像のURLを格納する
  const [GirlValue, SetGirlValue] = useState(null)

  //愛嬌スコアの格納
  const [CharmScore, SetCharmScore] = useState(0)

  //エキスパートスコアの格納
  const [ExpertScore, SetExpertScore] = useState(0)

  //レポートの格納
  const Report = useRef(null)

  //サーバーサイドのエンドポイント
  const EndPoint = ServerUrl

  //初期ロード時に発火
  useEffect(() =>{
    SetFirstValue(true) 
  },[])

  //ファーストバリューがTrueになったら発火
  useEffect(() =>{
    //DBに登録がある都道府県を取得
    const SerchCountry = () =>{
      axios.get(EndPoint + "serchcountry" ,{
      }).then(res=>{
        //返ってきたら取得用のステートにセットしていく
        console.log(res)
        SetCountry(res.data.map((data) => ([data.Country])))
      }).catch(err=>{
        console.log(err);
      });
    };
    //関数の呼び出し
    SerchCountry()
  },[FirstValue]);
  
  //都道府県の選択が変更されたら現在の値を取得して状態変数を更新する
  const contryChange = (e) =>{
    SetCountryValue(e.target.value)
  }

  //都道府県の選択されている値が更新時に発火
  useEffect(() =>{
    //都道府県に紐づくお店の名前を取得する
    if (CountryValue){
      const SerchShop = () =>{
        axios.get(EndPoint + "serchshop/" + CountryValue ,{
        }).then(res=>{
          // console.log(res)
          SetStore(res.data.map((data) => ([data.Store])))
        }).catch(err=>{
          console.log(err);
        });
      };
      //関数の呼び出し
      SerchShop()
    }
  },[CountryValue]);

  //店名が選択され、変更したら状態変数を更新
  const StoreChange = (e) =>{
    SetStoreValue(e.target.value)
  }

  //店名の状態変数が更新時に発火。
  useEffect(() =>{
    //その店に所属する女子の名前を取りにいく。
    if (StoreValue){
      const SerchGirl = () =>{
        axios.get(EndPoint + "serchgirl/" + StoreValue ,{
        }).then(res=>{
          console.log(res)
          SetGirls(res.data.map((data) => ({id:data.id, name:data.Name, url:data.imgUrl})))
        }).catch(err=>{
          console.log(err);
        });
      };
      //関数の呼び出し
      SerchGirl()
    }
  },[StoreValue]);

  //女子名が選択され変化があれば、女子のIDを取得して格納
  const GirlChange = (e) =>{
    //「選択してください」を選んでいるときはnullに戻す
    if(e.target.value === '0'){
      SetGirlValue(null)
    }else{
      let url = e.target[e.target.selectedIndex].getAttribute('data-address')
      SetGirlValue({id:e.target.value, url:url})
    }
  }

  //愛嬌選択の変化があったら、格納
  const CharmChange = (e) =>{
    // console.log(e.target.value)
    SetCharmScore(e.target.value)
  }

  //エキスパート選択の変化があったら、格納
  const ExpertChange = (e) =>{
    // console.log(e.target.value)
    SetExpertScore(e.target.value)
  }

  // レポートをポストしてDBに登録（UserIDは仮で入れてる）
  const PostReport =()=>{

    const uid = currentUser.currentUser.uid

    //もしガールズIDが空ならエラーを出します
    if(!GirlValue){
      alert("女の子を選択してください")
      //もしレポートが空ならエラーを出します
    }else if(Report.current.value ===""){
      alert("レポートを入力してください")
      //エラーがなければ登録処理が走ります
    }else{
      axios.post(EndPoint + "postreport" ,{
        gid: Number(GirlValue.id),
        charm: CharmScore,
        ex: ExpertScore,
        repo: Report.current.value,
        uid: uid
      }).then(res=>{
        //登録完了した場合は投稿内容+「登録完了しました」が返ります。
        // console.log(res)
        alert("レポートを登録しました")
        window.location.reload()
      }).catch(err=>{
        //サーバー側で何らかのエラーがあった場合はエラーを返します。
        console.log(err)
      });
    };
  };


  // 星評価用

  //愛嬌

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
  
    const handleClick = value => {
      setCurrentValue(value)
    }
  
    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
    };
  
    const handleMouseLeave = () => {
      setHoverValue(undefined)
    }

    //パネマジ

    const [currentValue2, setCurrentValue2] = useState(0);
    const [hoverValue2, setHoverValue2] = useState(undefined);
    const stars2 = Array(5).fill(0)
  
    const handleClick2 = value => {
      setCurrentValue2(value)
    }
  
    const handleMouseOver2 = newHoverValue => {
      setHoverValue2(newHoverValue)
    };
  
    const handleMouseLeave2 = () => {
      setHoverValue2(undefined)
    }
  
  
  return (
    <>
    <div>
      <div  className='serchtitle'>
      <label>都道府県</label>
      </div>
      <div className="cp_ipselect cp_sl04">
        <select onChange={(e) => contryChange(e)}>
          <option value={0} data-address={null}>選択してください</option>
          {Country.map((country) =>{
            return(
              <option key={country}>{country}</option>
          )
        })}
        </select>
      </div>
    </div>

    <div>
    <div  className='serchtitle'>
      <label>店名</label>
      </div>
      <div className="cp_ipselect cp_sl04">
        <select onChange={(e) => StoreChange(e)}>
        <option value={0} data-address={null}>選択してください</option>
          {Store.map((store) =>{
            return(
              <option key={store}>{store}</option>
            )
          })}
        </select>
      </div>
    </div>
    
    <div>
    <div  className='serchtitle'>
      <label>女の子名</label>
       </div>
      <div className="cp_ipselect cp_sl04">
        <select onChange={(e) => GirlChange(e)}>
          <option value={0} data-address={null}>選択してください</option>
          {Girls.map((girl) =>{
            return(
              <option key={girl.id} value={girl.id} data-address={girl.url}>
                {girl.name}
              </option>
            )
          })}
        </select>
      </div>
    </div>
    
    <div className='girls-img'>
    {GirlValue 
      ? <img src={GirlValue.url} width={150} height={150}></img>
      : <></> 
    }
    </div>

    <br></br>
    <div>
    <div  className='serchtitle'>
    <label>愛嬌</label>
      </div>

      
      <div style={styles.container}>
                <div style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10,
                          cursor: "pointer"
                        }}
                      />
                    )
                  })}
                </div>
            </div>


       {/* セレクトボックス評価↓ */}

      {/* <select onChange={(e) => CharmChange(e)}>
        <option value={0}>選択してください</option>
        <option value={1}>1点</option>
        <option value={2}>2点</option>
        <option value={3}>3点</option>
        <option value={4}>4点</option>
        <option value={5}>5点</option>
      </select> */}
    </div>

    <div>
    <div  className='serchtitle'>
      <label>パネマジ度</label>
      </div>

      <div style={styles.container}>
                <div style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick2(index + 1)}
                        onMouseOver={() => handleMouseOver2(index + 1)}
                        onMouseLeave={handleMouseLeave2}
                        color={(hoverValue2 || currentValue2) > index ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10,
                          cursor: "pointer"
                        }}
                      />
                    )
                  })}
                </div>
            </div>

          {/* セレクトボックス評価↓ */}

      {/* <select onChange={(e)=> ExpertChange(e)}>
        <option value={0}>選択してください</option>
        <option value={1}>1点</option>
        <option value={2}>2点</option>
        <option value={3}>3点</option>
        <option value={4}>4点</option>
        <option value={5}>5点</option>
      </select> */}
    </div>

    <div>
    <div  className='serchtitle'>
      <label>レポート内容</label>
      </div>
      <div className='report-text'>
      <textarea cols="80" rows="10" ref={Report} placeholder='どんな体験だった？'>
      </textarea>
      </div>
    </div>

    <div className='btn-list'>
      <li onClick={PostReport}>投稿</li>
    </div>

    </>
  )
}

// 星のデザイン設定

const styles = {
  container:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};
