from fastapi import FastAPI, Depends
from collections import Counter
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from sqlalchemy.orm import Session, sessionmaker
from .db import Girls, Reports, engine
from sqlalchemy import *
from typing import Union
from .feature_extraction import feature_extra
from .dmm_api import dmm


# DB接続用のセッションクラス インスタンスが作成されると接続する
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# DB接続のセッションを各エンドポイントの関数に渡す
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI()

# CORSの対応
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# --ここから型クラス定義-----

# レポート登録用のクラス


class ReportParam(BaseModel):
    gid: int
    charm: int
    ex: int
    repo: str
    uid: str

# uid受け取り用定義


class useridParam(BaseModel):
    uid: str

# ---------------------------


@app.get("/")
def read_root(db: Session = Depends(get_db)):
    # girls = db.query(Girls).all()
    # print(girls)

    return '正しくサーバーサイドと通信できてます'


# レコメンドAPI
@app.post("/postid")
def postid_root(uid: useridParam, db: Session = Depends(get_db)):
    userID = uid.uid

    # ユーザーIDから投稿している嬢のIDを取得して配列へ格納する
    my_report = db.query(Reports).filter(Reports.PostUserId == userID).all()
    my_GirlId_list = [i.GirlId for i in my_report]
    mod_GirlId = [k for k in Counter(my_GirlId_list)]

    # もしもmod_GirlIDが空でなければレコメンド判定へ
    result_list = []
    if mod_GirlId == []:
        return 'None'
    else:
        for target in mod_GirlId:
            result = feature_extra(str(target))
            result_list.append(result)
        print(result_list)

        # 似ている女優の名前でDMMのAPIを叩く
        maxCount = len(result_list)  # MAXカウントは最終的に調整する
        actorDatas = []
        for i in range(maxCount):
            try:
                actorData = dmm(result_list[i][1])
                actorDatas.append(actorData)
            except:
                pass

        # NULLデータを除外して最終的な配列へ
        actDatasList = [k for k in actorDatas if k is not None]
        print(actDatasList)
        return actDatasList


# ガールズテーブルのcuntryにある都道府県で重複排除して渡す
@app.get("/serchcountry")
def serchcountry_root(db: Session = Depends(get_db)):
    country = db.query(Girls.Country).distinct().limit(48).all()
    return country


# 都道府県が一致した店舗の名前を返す
@app.get("/serchshop/{country}")
def serchshop_root(country, db: Session = Depends(get_db)):
    store = db.query(Girls.Store).filter(
        Girls.Country == country).distinct().limit(100).all()
    return store


# ガール検索用のエンドポイント
@app.get("/serchgirl/{store}")
def serchgirl_root(store, db: Session = Depends(get_db)):
    girl = db.query(Girls.id, Girls.Name, Girls.imgUrl).filter(
        Girls.Store == store).distinct().limit(100).all()
    return girl


# レポートを登録用のエンドポイント
@app.post("/postreport")
def post_root(reportParam: ReportParam, db: Session = Depends(get_db)):
    # DBに受け取った内容を登録します。
    db.add(Reports(
        GirlId=reportParam.gid,
        CharmScore=reportParam.charm,
        ExpertScore=reportParam.ex,
        Report=reportParam.repo,
        PostUserId=reportParam.uid
    ))
    db.commit()

    return reportParam, '登録完了しました!'
