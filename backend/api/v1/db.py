import os
from sqlalchemy import Boolean, Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql.db"

# sqlalchemyのengine作成する
# connect_args={"check_same_thread": False}
# ↑はSQLiteだから必要。他のデータベースには必要ない。同時接続の許可
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocalクラスの作成
# sessionmakerを使用
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base暮らすを作成
# 後でこのクラスを継承して各DB，モデル, クラスを作成する
Base = declarative_base()


# Girlsテーブルの定義
class Girls(Base):
    __tablename__ = 'girls'
    id = Column('id', Integer, primary_key=True)
    title = Column('title', String(200))
    name = Column('name', String(100))


if __name__ == "__main__":
    # テーブル作成
    Base.metadata.create_all(bind=engine)
