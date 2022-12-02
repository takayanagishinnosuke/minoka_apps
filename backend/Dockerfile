FROM python:3.9

WORKDIR /src

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libgl1-mesa-dev
RUN apt-get install -y sqlite3
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# COPY . /src
COPY pyproject.toml* ./ 
COPY poetry.lock* ./
RUN poetry config virtualenvs.in-project true
RUN poetry install
RUN poetry update

ENTRYPOINT ["poetry","run","uvicorn","api.v1.main:app","--host","0.0.0.0","--reload"]