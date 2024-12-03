# from sqlalchemy import create_engine
# from sqlalchemy.orm import Session
# from models import User  # モデルをインポート

# # 接続先DBの設定
# DATABASE = 'postgresql+psycopg://user:postgres@localhost:5432/postgres'

# # Engine の作成
# Engine = create_engine(
#   DATABASE,
#   echo=True
# )

# # Sessionの作成
# session = Session(
#   autocommit=False,
#   autoflush=True,
#   bind=Engine
# )

# # ユーザー情報を読み取る関数
# def read_users():
#     """すべてのユーザーをデータベースから取得する"""
#     return session.query(User).all()

# def add_user(id,name,price):
#     db_user=User(id=id,name=name,price=price)
#     session.add(db_user)
#     session.commit()
#     session.refresh(db_user)
#     return db_user
  
  
# def delete_user_by_id(user_id: int):
#     """指定されたIDのユーザーをデータベースから削除する"""
#     user_to_delete = session.query(User).filter(User.id == user_id).first()
#     if user_to_delete:
#         session.delete(user_to_delete)
#         session.commit()
#         return user_to_delete
#     return None










# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, Session
# from models import Idea
# from datetime import datetime


# # 接続先DBの設定
# DATABASE = 'postgresql+psycopg://user:postgres@localhost:5432/postgres'

# # Engine の作成
# Engine = create_engine(
#   DATABASE,
#   echo=True
# )

# # Sessionの作成
# session = Session(
#   autocommit=False,
#   autoflush=True,
#   bind=Engine
# )

# # # データベース接続設定
# # DATABASE_URL = "postgresql+psycopg://user:postgres@localhost:5432/postgres"  # SQLiteを使用しています。必要に応じてPostgreSQLなどに変更してください。

# # engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# # SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # メモの全件取得
# def read_ideas(session: Session):
#     """すべてのメモを取得し、新しい順に並べる"""
#     return session.query(Idea).order_by(Idea.created_at.desc()).all()

# # メモの追加
# def add_idea(session: Session, title: str, content: str, tags: str = None):
#     """新しいメモを追加する"""
#     new_idea = Idea(title=title, content=content, tags=tags)
#     session.add(new_idea)
#     session.commit()
#     return new_idea

# # メモの削除
# def delete_idea_by_id(session: Session, idea_id: int):
#     """指定されたIDのメモを削除する"""
#     idea_to_delete = session.query(Idea).filter(Idea.id == idea_id).first()
#     if idea_to_delete:
#         session.delete(idea_to_delete)
#         session.commit()
#         return idea_to_delete
#     return None

# # メモの検索
# def search_ideas(session: Session, keyword: str):
#     """タイトルまたは内容にキーワードが含まれるメモを検索する"""
#     return session.query(Idea).filter(
#         (Idea.title.like(f"%{keyword}%")) | (Idea.content.like(f"%{keyword}%"))
#     ).all()

# # メモのフィルタリング（指定日時以降のものを取得）
# def filter_ideas(session: Session, date: datetime):
#     """指定した日付以降のメモを取得"""
#     return session.query(Idea).filter(Idea.created_at >= date).all()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Idea
from datetime import datetime
from fastapi import HTTPException

#from database import SessionLocal


# 接続先DBの設定
DATABASE = 'postgresql+psycopg://user:postgres@localhost:5432/postgres'


# # 接続先DBの設定
# DATABASE = 'postgresql+psycopg://user:postgres@localhost:5432/ideas'

# SQLAlchemy エンジンの作成
engine = create_engine(
    DATABASE,
    echo=True  # デバッグ用にSQLログを表示
)

# セッションファクトリの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # ユーザー定義関数（メモ操作関連）
# def read_ideas(session):
#     return session.query(Idea).order_by(Idea.created_at.desc()).all()

# def read_ideas(session):
#     # 作成日時でデータを降順に並べて全て取得するように修正
#     return session.query(Idea).order_by(Idea.created_at.desc()).all()

def read_ideas(session):
    try:
        print("データベースからデータを取得します...")
        ideas = session.query(Idea).order_by(Idea.created_at.desc()).all()  # 日付順でソート
        print("デバッグ: データベースから取得したデータ:", ideas)  # 追加
        return ideas
    except Exception as e:
        print("データ取得エラー:", e)
        raise





# def read_ideas(session):
#     ideas = session.query(Idea).order_by(Idea.created_at.desc()).all()
#     print(f"取得したアイデア数: {len(ideas)}")  # デバッグ用
#     for idea in ideas:
#         print(f"デバッグ: {idea.title}, {idea.content}, {idea.tags}, {idea.created_at}")  # デバッグ用
#     return ideas





def add_idea(db, title, content, tags=None):
    new_idea = Idea(title=title, content=content, tags=tags)
    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)  # 追加: 新しいアイデアをリフレッシュ
    return new_idea


def delete_idea_by_created_at(session, created_at):
    idea = session.query(Idea).filter(Idea.created_at == created_at).first()
    if idea:
        session.delete(idea)
        session.commit()
        return idea
    return None

def delete_idea_by_id(db, idea_id):
    idea = db.query(Idea).filter(Idea.id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    db.delete(idea)
    db.commit()
    return {"message": "Idea deleted successfully"}




def search_ideas(session, keyword):
    keyword_pattern = f"%{keyword}%"
    return session.query(Idea).filter(
        (Idea.title.ilike(keyword_pattern)) |
        (Idea.content.ilike(keyword_pattern)) |
        ((Idea.tags != None) & (Idea.tags.ilike(keyword_pattern)))  # タグを文字列として検索
    ).all()



def filter_ideas(session, date):
    return session.query(Idea).filter(Idea.created_at >= date).all()




