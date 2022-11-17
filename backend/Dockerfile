FROM python:3.9

WORKDIR /src

RUN pip install poetry 
COPY . /src
COPY pyproject.toml* ./ 
COPY poetry.lock* ./
RUN poetry config virtualenvs.in-project true
RUN poetry install

ENTRYPOINT ["poetry","run","uvicorn","api.v1.main:app","--host","0.0.0.0","--reload"]