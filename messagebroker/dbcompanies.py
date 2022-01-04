from tinydb import TinyDB, Query

db=TinyDB("database.json")
table=db.table("Companies")

def addCompany(company):
    table.insert(company)

def getAllCompanies():
    return table.all()

def isEmpty():
    return len(getAllCompanies()) == 0

def updateCompany(company):
    table.update(company,Query().id == company["id"])