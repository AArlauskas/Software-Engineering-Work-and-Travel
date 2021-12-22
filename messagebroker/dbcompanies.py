import requests
from tinydb import TinyDB
db=TinyDB("/database.json")
table=db.table("Companies")

def addtoDB(company):
    table.insert(company)

def getalldb():
    return table.all()