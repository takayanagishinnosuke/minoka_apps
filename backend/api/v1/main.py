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


class SerchParam(BaseModel):
    country: str
    size: str
    style: str


# uid受け取り用定義
class useridParam(BaseModel):
    uid: str

# ---------------------------


@app.get("/")
def read_root(db: Session = Depends(get_db)):
    # girls = db.query(Girls).all()
    # print(girls)

    return '正しくサーバーサイドと通信できてます'


# 検索API
@app.post("/serch")
def serch_root(serchParam: SerchParam, db: Session = Depends(get_db)):
    if serchParam.country == 'None' and serchParam.size == 'None':
        print('都道府県とサイズが空のとき')
        # スタイルだけで一致させるクエリ
        # 一致するガールズデータを取得
        returnGarlsData = db.query(Girls).filter(
            Girls.Style == serchParam.style).order_by(desc(Girls.Store)).all()
        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Style == serchParam.style).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}

    elif serchParam.country == 'None' and serchParam.style == 'None':
        print('都道府県とスタイルが空のとき')
        # サイズだけで一致させるクエリ
        # 一致するガールズデータ
        returnGarlsData = db.query(Girls).filter(
            Girls.Size == serchParam.size).order_by(desc(Girls.Store)).all()

        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Size == serchParam.size).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}

    elif serchParam.size == 'None' and serchParam.style == 'None':
        print('サイズとスタイルが空のとき')
        # 都道府県だけで一致させるクエリ
        # 一致するガールズデータ
        returnGarlsData = db.query(Girls).filter(
            Girls.Country == serchParam.country).order_by(desc(Girls.Store)).all()

        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Country == serchParam.country).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}

    elif serchParam.country == 'None':
        print('都道府県が空のとき')
        # サイズとスタイルで一致させるクエリ
        # 一致するガールズデータを取得
        returnGarlsData = db.query(Girls).filter(
            Girls.Size == serchParam.size, Girls.Style == serchParam.style).order_by(desc(Girls.Store)).all()

        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Size == serchParam.size, Girls.Style == serchParam.style).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}

    elif serchParam.size == 'None':
        print('サイズ空のとき')
        # 都道府県とスタイルで一致させるクエリ
        # 一致するガールズデータを取得
        returnGarlsData = db.query(Girls).filter(
            Girls.Country == serchParam.country, Girls.Style == serchParam.style).order_by(desc(Girls.Store)).all()

        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Country == serchParam.country, Girls.Style == serchParam.style).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}

    elif serchParam.style == 'None':
        print('スタイル空のとき')
        # 都道府県とサイズで一致させるクエリ
        # 一致するガールズデータを取得
        returnGarlsData = db.query(Girls).filter(
            Girls.Country == serchParam.country, Girls.Size == serchParam.size).order_by(desc(Girls.Store)).all()

        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Country == serchParam.country, Girls.Size == serchParam.size).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}

    else:
        print('全ての値がちゃんとはいっているとき')
        # 全てのパラメーターで一致させるクエリ
        # 一致するガールズデータを取得
        returnGarlsData = db.query(Girls).filter(
            Girls.Country == serchParam.country,
            Girls.Size == serchParam.size,
            Girls.Style == serchParam.style).order_by(desc(Girls.Store)).all()

        # 一致するレポートデータを取得
        returnReportData = db.query(
            Girls.id, Girls.Name, Girls.Store, Reports.CharmScore, Reports.ExpertScore, Reports.Report).join(
            Reports, Girls.id == Reports.GirlId).filter(
            Girls.Country == serchParam.country,
            Girls.Size == serchParam.size,
            Girls.Style == serchParam.style).order_by(desc(Girls.id)).all()

        return {"GarlsData": returnGarlsData, "ReportData": returnReportData}


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
        # もしも4件以上のデータが入っているようなら先頭の4つまでに絞る
        if len(actDatasList) > 4:
            actDatasList_max = [actDatasList[i] for i in range(4)]
            return actDatasList_max

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
