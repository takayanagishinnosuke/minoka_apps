import React from 'react'
import './TopPage.css';

//firebase認証
import {signInWithPopup} from "firebase/auth";
import { auth, provider } from '../../api/firebase';
import {useAuthState} from "react-firebase-hooks/auth";




function Login() {

    //Login時の状態管理
    const [user] = useAuthState(auth);

  return (
    <div>
        {user ? (
            //userがtrueなら？以降のhtml出力 Login状態
            <>
                <UserInfo/>
                <SignOutButton/>
            </>
        ) : (
            <SignInButton/>
            )
        }
    </div>
  )
}

export default Login


// グーグルボタンでサインイン
function SignInButton(){
    const signInWithGoogle = () =>{
        //firebaseを使ってグーグルログイン
        signInWithPopup(auth,provider)
    };

    return(
        <div className='headerbtn'>
        <button id="headerbtn" onClick={signInWithGoogle}>
           <p> サインイン</p>
        </button>
        </div>
    )
        
}

// サインアウト
function SignOutButton(){

    return(
        <div className='headerbtn'>
        <button id="headerbtn" onClick={() => auth.signOut()}>
           <p> サインアウト</p>
        </button>
        </div>
    );
        
}

function UserInfo(){

    return(
       <div className='prof-img'>
           <img src={auth.currentUser.photoURL} alt="" ></img>
           <p id='name'>{auth.currentUser.displayName}</p>
       </div>
    );
        
}