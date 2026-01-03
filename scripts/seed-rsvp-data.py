# Seed RSVP data for Sarah & Michael's Wedding
# Host: flormontana@etsy.com

import os
from supabase import create_client
from datetime import datetime, timedelta
import random

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required")
    exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Find the event
print("Finding event for flormontana@etsy.com...")
events_response = supabase.table("events").select("*").eq("host_email", "flormontana@etsy.com").execute()

if not events_response.data:
    print("Error: No event found for flormontana@etsy.com")
    exit(1)

event = events_response.data[0]
event_id = event["id"]
print(f"Found event: {event['title']} (ID: {event_id})")

# Realistic guest names
attending_guests = [
    {"name": "Emma Thompson", "email": "emma.thompson@email.com", "phone": "+1234567890", "guests": 2, "plusone": True, "plusone_name": "James Thompson", "meal": ["Chicken", "Beef"], "message": "So excited for your big day!"},
    {"name": "Oliver Martinez", "email": "oliver.m@email.com", "phone": "+1234567891", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": "Can't wait to celebrate with you both!"},
    {"name": "Sophia Anderson", "email": "sophia.anderson@email.com", "phone": "+1234567892", "guests": 2, "plusone": True, "plusone_name": "Lucas Anderson", "meal": ["Fish", "Chicken"], "message": "Congratulations! Looking forward to it."},
    {"name": "William Chen", "email": "william.chen@email.com", "phone": "+1234567893", "guests": 1, "plusone": False, "meal": ["Beef"], "message": ""},
    {"name": "Isabella Rodriguez", "email": "isabella.r@email.com", "phone": "+1234567894", "guests": 2, "plusone": True, "plusone_name": "Diego Rodriguez", "meal": ["Chicken", "Fish"], "message": "So happy for you two!"},
    {"name": "Liam O'Connor", "email": "liam.oconnor@email.com", "phone": "+1234567895", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": "Vegan options available? Thanks!"},
    {"name": "Ava Johnson", "email": "ava.johnson@email.com", "phone": "+1234567896", "guests": 2, "plusone": True, "plusone_name": "Ethan Johnson", "meal": ["Beef", "Chicken"], "message": ""},
    {"name": "Noah Williams", "email": "noah.w@email.com", "phone": "+1234567897", "guests": 1, "plusone": False, "meal": ["Fish"], "message": "Congrats you two! See you there!"},
    {"name": "Charlotte Davis", "email": "charlotte.davis@email.com", "phone": "+1234567898", "guests": 3, "plusone": False, "meal": ["Chicken", "Chicken", "Kids Meal"], "message": "Bringing the kids! They're so excited."},
    {"name": "Benjamin Taylor", "email": "ben.taylor@email.com", "phone": "+1234567899", "guests": 2, "plusone": True, "plusone_name": "Emily Taylor", "meal": ["Beef", "Fish"], "message": ""},
    {"name": "Amelia Brown", "email": "amelia.brown@email.com", "phone": "+1234567800", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": "Gluten-free option needed please"},
    {"name": "Elijah Moore", "email": "elijah.moore@email.com", "phone": "+1234567801", "guests": 2, "plusone": True, "plusone_name": "Mia Moore", "meal": ["Chicken", "Beef"], "message": "Can't wait! Congratulations!"},
    {"name": "Harper Wilson", "email": "harper.wilson@email.com", "phone": "+1234567802", "guests": 1, "plusone": False, "meal": ["Fish"], "message": ""},
    {"name": "James Garcia", "email": "james.garcia@email.com", "phone": "+1234567803", "guests": 2, "plusone": True, "plusone_name": "Sofia Garcia", "meal": ["Beef", "Chicken"], "message": "Honored to be there!"},
    {"name": "Evelyn Martinez", "email": "evelyn.m@email.com", "phone": "+1234567804", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": "Any dairy-free options?"},
    {"name": "Alexander Lee", "email": "alex.lee@email.com", "phone": "+1234567805", "guests": 2, "plusone": True, "plusone_name": "Luna Lee", "meal": ["Fish", "Chicken"], "message": ""},
    {"name": "Abigail White", "email": "abigail.white@email.com", "phone": "+1234567806", "guests": 1, "plusone": False, "meal": ["Chicken"], "message": "So excited for you both!"},
    {"name": "Daniel Harris", "email": "daniel.harris@email.com", "phone": "+1234567807", "guests": 2, "plusone": True, "plusone_name": "Grace Harris", "meal": ["Beef", "Fish"], "message": ""},
    {"name": "Emily Clark", "email": "emily.clark@email.com", "phone": "+1234567808", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": "Nut allergy - please note"},
    {"name": "Matthew Lewis", "email": "matthew.lewis@email.com", "phone": "+1234567809", "guests": 2, "plusone": True, "plusone_name": "Chloe Lewis", "meal": ["Chicken", "Beef"], "message": "Looking forward to celebrating!"},
    {"name": "Elizabeth Walker", "email": "liz.walker@email.com", "phone": "+1234567810", "guests": 1, "plusone": False, "meal": ["Fish"], "message": ""},
    {"name": "Michael Robinson", "email": "mike.robinson@email.com", "phone": "+1234567811", "guests": 2, "plusone": True, "plusone_name": "Lily Robinson", "meal": ["Beef", "Chicken"], "message": ""},
    {"name": "Mia Hall", "email": "mia.hall@email.com", "phone": "+1234567812", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": "Pescatarian - fish ok!"},
    {"name": "David Allen", "email": "david.allen@email.com", "phone": "+1234567813", "guests": 2, "plusone": True, "plusone_name": "Zoe Allen", "meal": ["Fish", "Chicken"], "message": "Congrats! Can't wait!"},
    {"name": "Ella Young", "email": "ella.young@email.com", "phone": "+1234567814", "guests": 1, "plusone": False, "meal": ["Chicken"], "message": ""},
    {"name": "Joseph King", "email": "joseph.king@email.com", "phone": "+1234567815", "guests": 2, "plusone": True, "plusone_name": "Hannah King", "meal": ["Beef", "Fish"], "message": "See you there!"},
    {"name": "Victoria Wright", "email": "victoria.wright@email.com", "phone": "+1234567816", "guests": 1, "plusone": False, "meal": ["Vegetarian"], "message": ""},
    {"name": "Samuel Lopez", "email": "samuel.lopez@email.com", "phone": "+1234567817", "guests": 2, "plusone": True, "plusone_name": "Aria Lopez", "meal": ["Chicken", "Beef"], "message": "Congratulations to you both!"},
    {"name": "Grace Hill", "email": "grace.hill@email.com", "phone": "+1234567818", "guests": 1, "plusone": False, "meal": ["Fish"], "message": ""},
    {"name": "Christopher Scott", "email": "chris.scott@email.com", "phone": "+1234567819", "guests": 2, "plusone": True, "plusone_name": "Scarlett Scott", "meal": ["Beef", "Chicken"], "message": ""},
]

not_attending_guests = [
    {"name": "Andrew Green", "email": "andrew.green@email.com", "phone": "+1234567820", "message": "Sorry, can't make it. Have a wonderful day!"},
    {"name": "Natalie Adams", "email": "natalie.adams@email.com", "phone": "+1234567821", "message": "Wish I could be there. Congrats!"},
    {"name": "Ryan Baker", "email": "ryan.baker@email.com", "phone": "+1234567822", "message": "Unfortunately can't attend. Best wishes!"},
    {"name": "Lauren Nelson", "email": "lauren.nelson@email.com", "phone": "+1234567823", "message": ""},
    {"name": "Kevin Carter", "email": "kevin.carter@email.com", "phone": "+1234567824", "message": "Will be traveling. Sorry!"},
    {"name": "Jessica Mitchell", "email": "jessica.mitchell@email.com", "phone": "+1234567825", "message": "Can't make it but thinking of you!"},
    {"name": "Brandon Perez", "email": "brandon.perez@email.com", "phone": "+1234567826", "message": "Prior commitment. Have an amazing day!"},
    {"name": "Rachel Roberts", "email": "rachel.roberts@email.com", "phone": "+1234567827", "message": ""},
]

pending_guests = [
    {"name": "Tyler Turner", "email": "tyler.turner@email.com", "phone": "+1234567828"},
    {"name": "Hannah Phillips", "email": "hannah.phillips@email.com", "phone": "+1234567829"},
    {"name": "Austin Campbell", "email": "austin.campbell@email.com", "phone": "+1234567830"},
    {"name": "Madison Parker", "email": "madison.parker@email.com", "phone": "+1234567831"},
    {"name": "Jordan Evans", "email": "jordan.evans@email.com", "phone": "+1234567832"},
    {"name": "Ashley Edwards", "email": "ashley.edwards@email.com", "phone": "+1234567833"},
    {"name": "Justin Collins", "email": "justin.collins@email.com", "phone": "+1234567834"},
]

# Generate timestamps spread over past 2 weeks
base_date = datetime.now() - timedelta(days=14)

def random_timestamp():
    days_offset = random.randint(0, 14)
    hours_offset = random.randint(0, 23)
    return (base_date + timedelta(days=days_offset, hours=hours_offset)).isoformat()

print(f"\nInserting {len(attending_guests)} attending guests...")
for guest in attending_guests:
    rsvp_data = {
        "event_id": event_id,
        "guest_name": guest["name"],
        "guest_email": guest["email"],
        "guest_phone": guest["phone"],
        "attendance_status": "attending",
        "number_of_guests": guest["guests"],
        "has_plusone": guest["plusone"],
        "plusone_name": guest.get("plusone_name"),
        "meal_choices": guest["meal"],
        "message": guest["message"],
        "created_at": random_timestamp(),
    }
    supabase.table("rsvps").insert(rsvp_data).execute()
    print(f"  ✓ {guest['name']} (Attending, {guest['guests']} guests)")

print(f"\nInserting {len(not_attending_guests)} not attending guests...")
for guest in not_attending_guests:
    rsvp_data = {
        "event_id": event_id,
        "guest_name": guest["name"],
        "guest_email": guest["email"],
        "guest_phone": guest["phone"],
        "attendance_status": "not_attending",
        "number_of_guests": 0,
        "has_plusone": False,
        "meal_choices": [],
        "message": guest["message"],
        "created_at": random_timestamp(),
    }
    supabase.table("rsvps").insert(rsvp_data).execute()
    print(f"  ✓ {guest['name']} (Not Attending)")

print(f"\nInserting {len(pending_guests)} pending guests...")
for guest in pending_guests:
    rsvp_data = {
        "event_id": event_id,
        "guest_name": guest["name"],
        "guest_email": guest["email"],
        "guest_phone": guest["phone"],
        "attendance_status": "pending",
        "number_of_guests": 0,
        "has_plusone": False,
        "meal_choices": [],
        "message": "",
        "created_at": random_timestamp(),
    }
    supabase.table("rsvps").insert(rsvp_data).execute()
    print(f"  ✓ {guest['name']} (Pending)")

print(f"\n✅ Successfully seeded {len(attending_guests) + len(not_attending_guests) + len(pending_guests)} RSVP records!")
print(f"   - {len(attending_guests)} Attending ({sum(g['guests'] for g in attending_guests)} total guests)")
print(f"   - {len(not_attending_guests)} Not Attending")
print(f"   - {len(pending_guests)} Pending")
