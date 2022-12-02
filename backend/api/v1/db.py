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
    Name = Column('Name', String(100))
    Age = Column('Age', String(10))
    Height = Column('Height', String(10))
    Bust = Column('Bust', String(10))
    Size = Column('Size', String(10))
    West = Column('West', String(10))
    IdealWest = Column('IdealWest', String(10))
    StyleBetween = Column('StyleBetween', String(10))
    Style = Column('Style', String(10))
    Hip = Column('Hip', String(10))
    PanelMagic = Column('PanelMagic', String(5))
    Comment = Column('Comment', String(200))
    Country = Column('Country', String(50))
    Store = Column('Store', String(100))
    StoreType = Column('StoreType', String(100))
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
