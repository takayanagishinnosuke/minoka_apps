// サーバーサイドとデータのやり取りをするコンポーネントです。
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"

export const ServerUrl = "http://localhost:8000/"

export const UidPost = (uid) =>{
  axios.post(ServerUrl + "postid" ,{
    uid: uid
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  });
}