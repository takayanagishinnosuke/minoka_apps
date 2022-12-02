import sqlite3
import csv

con = sqlite3.connect("/src/sql.db")
open_csv = open("api/v1/gals_db.csv")
read_csv = csv.reader(open_csv)
cur = con.cursor()

next_row = next(read_csv)

rows = []
for row in read_csv:
    rows.append(row)


cur.executemany(
    "INSERT INTO girls (Name, Age, Height, Bust, Size, West, IdealWest, StyleBetween, Style, Hip, PanelMagic, Comment, Country, Store, StoreType, imgUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", rows)

con.commit()
open_csv.close()
