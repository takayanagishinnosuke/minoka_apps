import os
from sqlalchemy import Boolean, Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql.db"

# sqlalchemyのエンジンを作成する
# connect_args={"check_same_thread": False}
# ↑はSQLiteだから必要。他のデータベースには必要ない。同時接続の許可
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocalクラスの作成
# sessionmakerを使用
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Baseクラスを作成
# ↓でこのクラスを継承して各DB，モデル, クラスを作成する
Base = declarative_base()


# Girlsテーブルの定義
class Girls(Base):
    __tablename__ = 'girls'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(100))
    age = Column('age', String(10))
    height = Column('height', String(10))
    bust = Column('bust', String(10))
    size = Column('size', String(10))
    west = Column('west', String(10))
    hip = Column('hip', String(10))
    comment = Column('comment', String(200))
    county = Column('county', String(50))
    store = Column('store', String(100))
    storeType = Column('storeType', String(100))
    imgUrl = Column('imgUrl', String(300))


class Reports(Base):
    __tablename__ = 'reports'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    GirlId = Column('GirlId', Integer)
    CharmScore = Column('CharmScore', Integer)
    ExpertScore = Column('ExpertScore', Integer)
    Report = Column('Report', String(500))
    PostUserId = Column('PostUserId', String(100))


if __name__ == "__main__":
    # テーブル作成
    Base.metadata.create_all(bind=engine)
