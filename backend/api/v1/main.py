from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

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
def read_root():
    print('OK')
    return {"Hello", "World"}


@app.post("/")
def post_root(testParam: TestParam):
    print(testParam)
    return testParam
