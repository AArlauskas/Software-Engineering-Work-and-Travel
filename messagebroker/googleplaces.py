import random

def generateRating():
    return round(random.uniform(1.0,5.0),1)
    
def updateRating():
    goal = 50
    if random.randint(1,1000) == goal:
        return generateRating()
    return None

def generatePricing():
    return random.randint(1,3)

def updatePricing():
    goal = 23
    if random.randint(1,1000) == goal:
        return generatePricing()
    return None

def updateInformation(company):
    changed = False
    new_rating = updateRating()
    new_pricing = updatePricing()
    #print("name: {} rating: {} pricing: {} newRating: {}".format(company["name"], company["rating"], company["pricing"], new_rating,new_pricing))
    if new_rating != None:
        company["rating"] = new_rating
        changed = True
        print("changed rating")
    if new_pricing != None:
        company["pricing"] = new_pricing
        print("changed pricing")
        changed = True
    return (company, changed)                                   
    
def generateInitialInformation(company):
    company["rating"]=generateRating()
    company["pricing"]=generatePricing()
    return company




    
