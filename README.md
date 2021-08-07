<h1 align="center">RentX</h1>

## Car Register
**Functional Requirements**
- It should be able to register a car.

**Business Rules**
- Shouldn't be able to register a car with an existent license plate.
- The car should be available by default after being registered.
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

**Business Rules**
- Shouldn't be able to register a specification for a not existent car.
- Shouldn't be able to register a repeated specification for the same car.
- Only admin users should be able to register a specification.

## Car Images Register
**Functional Requirements**
- It should be able to register the car's image.

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
- The car should not be available after being rented.

## Car Return
**Functional Requirements**
- It should be able to return a car

**Business Rules**
- If the car is returned within 24 hours, there should be a fee.
- After the car return, the car should be available to rent.
- After the car return, the user should be able to rent another car.
- After the car return, the total price should be calculated.
- If the car is returned after the expected return date, there should be a fee.
- If there is a fee, it should be added to the total price of the rent.

## User's Rentals List
**Functional Requirements**
- It should be able to show the list of the user's rentals.

**Business Rules**
- Should only list the rentals if the user is logged in.

## Reset Password
**Functional Requirements**
- It should be able to reset the user's password.
- It should be able to send an e-mail to the user explaning the steps to be followed to reset the password.
- It should be able to set a new password

**Business Rules**
- The user needs to inform the new password.
- The link to reset the password should expire in 3 hours.