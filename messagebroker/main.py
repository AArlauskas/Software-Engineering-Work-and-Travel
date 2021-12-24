from dbcompanies import isEmpty, addCompany, getAllCompanies, updateCompany
from googleplaces import generateInitialPricesAndRatings, updatePricesAndRatings
import json
import time
import random

from publisher import addCompanyToQueue

def main():
    initDb()
    print("Database initialised. Waiting for 60s")
    time.sleep(60)
    print("Initial database queue started")
    companies = getAllCompanies()
    for company in companies:
        updatedCompany = generateInitialPricesAndRatings(company)
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
                    "pricing" : None
                }
                addCompany(company)

def timer():
    companies = getAllCompanies()
    while True:
        print("Company fetch in progress")
        for company in companies:
            result = updatePricesAndRatings(company)
            if (result[1]):
                print("company changed!")
                addCompanyToQueue(result[0])
                updateCompany(result[0])
        time.sleep(1800)

main()