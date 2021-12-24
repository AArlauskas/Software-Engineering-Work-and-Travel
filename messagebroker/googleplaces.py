import random

def generateRating():
   return round(random.uniform(1.0,5.0),1)

def updateRating():
    goal = 43
    if random.randint(0,100)==goal:
        return generateRating()
    return None

def generatePricing():
    return random.randint(1,3)

def updatePricing():
    goal=20
    if random.randint(0,100)==goal:
        return generatePricing()
    return None

def updatePricesAndRatings(company):
    changed = False
    new_rating = updateRating()
    new_pricing = updatePricing()
    if new_rating != None:
        company["rating"] = new_rating
        changed = True
    if new_pricing != None:
        company["pricing"] = new_pricing
        changed = True
    return (company, changed)                                   
    

def generateInitialPricesAndRatings(company):
    company["rating"]=generateRating()
    company["pricing"]=generatePricing()
    return company


    
