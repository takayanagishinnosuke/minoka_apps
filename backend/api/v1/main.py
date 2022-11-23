from fastapi import FastAPI, Depends
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from sqlalchemy.orm import Session, sessionmaker
from .db import Girls, engine
from sqlalchemy import *

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class TestParam(BaseModel):
    param1: str
    param2: str


@app.get("/")
def read_root(db: Session = Depends(get_db)):
    # girls = db.query(Girls).all()
    # print(girls)

    return 'top', 'hellow'


# ガールズテーブルのcuntryにある都道府県で重複排除して渡す
@app.get("/serch")
def read_root(db: Session = Depends(get_db)):
    country = db.query(Girls.county).distinct().limit(48).all()
    return country


@app.post("/")
def post_root(testParam: TestParam):
    print(testParam)
    return testParam
