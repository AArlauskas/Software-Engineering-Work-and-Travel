import googlemaps

gmaps = googlemaps.Client(key='AIzaSyB7be1Qig9Ai4E5fILUFsD6Ua5M4-o77F8')

def place_id(company):
    place_name = company["name"]
    places_result = gmaps.places(place_name)
    return places_result['results'][0]['place_id']

def generateRating(place):
    return place['rating']
    
  #  return rd(random.uniform(1.0,5.0),1)

def updateRating(place):
    # goal = 43
    # if random.randint(0,100)==goal:
    return generateRating(place)
    # return None

def generatePricing(place):
    return place['price_level']

def updatePricing(place):
    #goal=20
    #if random.randint(0,100)==goal:
    return generatePricing(place)
    #return None

def updatePricesAndRatings(company):
    changed = False
    place_name = company["name"]
    place_maps_id = company["mapsId"]
    if place_maps_id == None:
        place_maps_id = place_id(company)
        company["mapsId"] = place_maps_id
    place = gmaps.place(place_id = place_maps_id)
    # new_rating = updateRating(place)
    # new_pricing = updatePricing(place)
    new_rating = place.get("rating")
    new_pricing = place.get("price_level")
    
    print("name: {} rating: {} pricing: {} newRating: {} newPricing: {}".format(place_name, company["rating"], company["pricing"],new_rating,new_pricing))
    if new_rating != None:
        company["rating"] = new_rating
        changed = True
        print("changed rating")
    if new_pricing != None:
        company["pricing"] = new_pricing
        print("changed pricing")
        changed = True
    return (company, changed)                                   
    

def generateInitialPricesAndRatings(company):
    place_maps_id = company["mapsId"]
    if place_maps_id == None:
        place_maps_id = place_id(company)
        company["mapsId"] = place_maps_id
    place = gmaps.place(place_id = place_maps_id, fields=["rating", "price_level"])["result"]
    print(place)
    if place.get("rating") != None:
        company["rating"]=generateRating(place)
    if place.get("price_level") != None:
        company["pricing"]=generatePricing(place)
    return company


    
