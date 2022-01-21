from dbcompanies import isEmpty, addCompany, getAllCompanies, updateCompany
from googleplaces import generateInitialInformation, updateInformation
import json
import time

from publisher import addCompanyToQueue

def main():
    initDb()
    print("Database initialised. Waiting for 60s")
    time.sleep(60)
    print("Initial database queue started")
    companies = getAllCompanies()
    for company in companies:
        updatedCompany = generateInitialInformation(company)
        updateCompany(updatedCompany)
        addCompanyToQueue(updatedCompany)
    timer()
    

def initDb():
    if isEmpty():
        with open("companies.json") as f:
            data = json.load(f)
            for item in data:
                companyEntry = data[item]
                company = {
                    "id": item,
                    "name": companyEntry["name"],
                    "state" : companyEntry["state"],
                    "location" : companyEntry["location"],
                    "website" : companyEntry["website"],
                    "address" : companyEntry["adress"],
                    "zip" : companyEntry["zip"],
                    "mail" : companyEntry["mail"],
                    "phone" : companyEntry["phone"],
                    "rating" : None,
                    "pricing" : None,
                    "workType" : None,
                    "mapsId": None
                }
                addCompany(company)

def timer():
    companies = getAllCompanies()
    while True:
        print("Company fetch in progress")
        for company in companies:
            try:
                result = updateInformation(company)
            except:
                result = company
            if (result[1]):
                print("company changed!")
                addCompanyToQueue(result[0])
                updateCompany(result[0])
        time.sleep(5400)

main()