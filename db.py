import sqlite3

def query(sql):
    try:
        with sqlite3.connect("cars.db") as conn:
                cur=conn.cursor()
                cur.execute(sql)
                try:
                    return cur.fetchall()
                except Exception as e:
                     print(e)
                     
    except Exception as e:
         print(e)

def setup():
      query("CREATE TABLE IF NOT EXISTS cars (Id INTEGER, CreationDate DATETIME, Name TEXT, CarNumber TEXT, KM bigint, Phone TEXT, Description TEXT, PRIMARY KEY(Id AUTOINCREMENT))")


if __name__=="__main__":
    setup()