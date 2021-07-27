<h1 align="center">RentX</h1>

## Car Register
**Functional Requirements**
- It should be able to register a car.
- It should be able to list all categories.

**Business Rules**
- Shouldn't be able to register a car with an existent license plate.
- Shouldn't be able to modify a car's license plate.
- The car should be available after being registered.
- Only admin users should be able to register a car.

## Car List
**Functional Requirements**
- It should be able to list all available cars.
- It should be able to list all available cars by their category.
- It should be able to list all available cars by their name.

**Business Rules**
- The user should be able to list the cars without being logged in.

## Car Specifications Register
**Functional Requirements**
- It should be able to register a car specification.
- It should be able to list all specifications.
- It should be able to list all cars.

**Business Rules**
- Shouldn't be able to register a specification for a not existent car.
- Shouldn't be able to register a repeated specification for the same car.
- Only admin users should be able to register a specification.

## Car Images Register
**Functional Requirements**
- It should be able to register the car's image.
- It should be able to list all cars.

**Non-Functional Requirements**
- Use multer to upload the files.

**Business Rules**
- Should be able to register more than 1 image for the car.
- Only admin users should be able to register a car image.

## Car Rental
**Functional Requirements**
- It should be able to register a rental.

**Business Rules**
- The minimun duration of a rental should be 24 hours.
- Shouldn't be able to register a new rental for an user that already has an open rental.
- Shouldn't be able to register a new rental for a car that already has an open rental.