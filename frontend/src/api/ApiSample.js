// このコンポーネントの目的は検索と投稿のAPIサンプルです
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"


export const ApiSample = () => {

  //都道府県データの取得用
  const [Country, SetCountry] = useState([])
  const [CountryValue, SetCountryValue] = useState("千葉")

  //店名データの取得用
  const [Store, SetStore] = useState([])
  const [StoreValue, SetStoreValue] = useState("ラブライブ")

  //ガールズデータの取得用
  const [Girls, SetGirls] = useState([])
  //ガールズバリューにはGIDを格納する
  const [GirlValue, SetGirlValue] = useState(null)

  //愛嬌スコアの格納
  const [CharmScore, SetCharmScore] = useState(0)

  //エキスパートスコアの格納
  const [ExpertScore, SetExpertScore] = useState(0)

  //レポートの格納
  const Report = useRef(null)

  //サーバーサイドのエンドポイント
  const EndPoint = "http://localhost:8000/"

  //初期ロード時に発火
  useEffect(() =>{
    //DBに登録がある都道府県を取得
    const SerchCountry = () =>{
      axios.get(EndPoint + "serchcountry" ,{
      }).then(res=>{
        //返ってきたら取得用のステートにセットしていく
        // console.log(res)
        SetCountry(res.data.map((data) => ([data.county])))
      }).catch(err=>{
        console.log(err);
      });
    };
    //関数の呼び出し
    SerchCountry()
  },[]);
  
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
          SetStore(res.data.map((data) => ([data.store])))
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
          // console.log(res)
          SetGirls(res.data.map((data) => ({id:data.id,name:data.name})))
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
    // console.log(e.target.value)
    SetGirlValue(e.target.value)
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

    //もしガールズIDが空ならエラーを出します
    if(!GirlValue){
      alert("女の子を選択してください")
      //もしレポートが空ならエラーを出します
    }else if(Report.current.value ===""){
      alert("レポートを入力してください")
      //エラーがなければ登録処理が走ります
    }else{
      axios.post(EndPoint + "postreport" ,{
        gid: GirlValue,
        charm: CharmScore,
        ex: ExpertScore,
        repo: Report.current.value,
        uid: "1dbaea"
      }).then(res=>{
        //登録完了した場合は投稿内容+「登録完了しました」が返ります。
        console.log(res)
      }).catch(err=>{
        //サーバー側で何らかのエラーがあった場合はエラーを返します。
        console.log(err)
      });
    };
  };
  


  return (
    <>
    <h1>検索と投稿の非同期処理APIテスト</h1>
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

    <div>
      <label>店名</label>
      <select onChange={(e) => StoreChange(e)}>
        {Store.map((store) =>{
          return(
            <option key={store}>{store}</option>
          )
        })}
      </select>
    </div>
    
    <div>
      <label>女の子名</label>
      <select onChange={(e) => GirlChange(e)}>
        <option>選択してください</option>
        {Girls.map((girl) =>{
          return(
            <option key={girl.id} value={girl.id}>
              {girl.name}
            </option>
          )
        })}
      </select>
    </div>
    
    <br></br>
    <div>
      <label>愛嬌</label>
      <select onChange={(e) => CharmChange(e)}>
        <option value={0}>選択してください</option>
        <option value={1}>1点</option>
        <option value={2}>2点</option>
        <option value={3}>3点</option>
        <option value={4}>4点</option>
        <option value={5}>5点</option>
      </select>
    </div>

    <div>
      <label>本物度</label>
      <select onChange={(e)=> ExpertChange(e)}>
        <option value={0}>選択してください</option>
        <option value={1}>1点</option>
        <option value={2}>2点</option>
        <option value={3}>3点</option>
        <option value={4}>4点</option>
        <option value={5}>5点</option>
      </select>
    </div>

    <div>
      <p>レポート内容</p>
      <textarea cols="80" rows="10" ref={Report}></textarea>
    </div>

    <div>
      <button onClick={PostReport}>投稿</button>
    </div>

    </>
  )
}
