import googlemaps
import random

gmaps = googlemaps.Client(key='AIzaSyB7be1Qig9Ai4E5fILUFsD6Ua5M4-o77F8')

def place_id(company):
    place_name = company["name"]
    places_result = gmaps.places(place_name)
    try:
        id = places_result['results'][0]['place_id']
        return id
    except:
        return None

def generateRating():
    return round(random.uniform(1.0,5.0),1)
    
def updateRating():
    goal = 50
    if random.randint(1,100) == goal:
        return generateRating()
    return None

def generatePricing():
    return random.randint(1,3)

def updatePricing():
    goal = 23
    if random.randint(1,100) == goal:
        return generatePricing()
    return None

def generateWorkType(place):
    workTypeArray = place['types']
    workType = ""
    i = 0
    for type in workTypeArray:
        if i == 3: break
        workType += type + ", "
        i += 1
    return workType[:-2]

def updateWorkType(place):
    return generateWorkType(place)

def updateInformation(company):
    changed = False
    place_name = company["name"]
    place_maps_id = company["mapsId"]
    if place_maps_id == None:
        id = place_id(company)
        if id == None:
            return company
        place_maps_id = id
        company["mapsId"] = place_maps_id
    place = gmaps.place(place_id = place_maps_id)
    new_rating = updateRating()
    new_pricing = updatePricing()
    new_workType = place.get("types")
    print("name: {} rating: {} pricing: {} workType: {} newRating: {} newPricing: {} newWorkType {}".format(place_name, company["rating"], company["pricing"], company["workType"], new_rating,new_pricing, new_workType))
    if new_rating != None:
        company["rating"] = new_rating
        changed = True
        print("changed rating")
    if new_pricing != None:
        company["pricing"] = new_pricing
        print("changed pricing")
        changed = True
    if new_workType != None:
        company["workType"] = new_workType
        print("changed work type")
        changed = True
    return (company, changed)                                   
    

def generateInitialInformation(company):
    place_maps_id = company["mapsId"]
    if place_maps_id == None:
        id = place_id(company)
        if id == None:
            return company
        place_maps_id = id
        company["mapsId"] = place_maps_id
    place = gmaps.place(place_id = place_maps_id, fields=["rating", "price_level", "type"])["result"]
    print(place)
    if place.get("rating") != None:
        company["rating"] = generateRating()
    if place.get("price_level") != None:
        company["pricing"] = generatePricing()
    if place.get("types") != None:
        company["workType"] = generateWorkType(place)
    return company




    
