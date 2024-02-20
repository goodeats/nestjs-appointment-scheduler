# NestJS Appointment Scheduler

Practicing NestJS with building an appointment scheduler for doctors and patients

- `User` auth has signup endpoints for types: `Doctor` and `Patient`
- `User` auth has shared signin endpoint
- `Profile` has authenticated endpoints for Get, Post, Patch; is one-to-one with `User`
- `User` handles auth, `Profile` connects with other entities since type-dependent
- `Insurance` auth query filters by user `Profile` `State` with search by name substring
- `Insurance` to `Profile` is treated as many-to-many; many can be added to `Doctor` profile, but business logic prevents more than one for a `Patient` profile
- `Appointment` has many-to-many with `Profile` and has `doctorId` and `patientId`

I felt like this was a good exercise to help me understand how to a build Nest JS REST API better.

Here is what else I would do:

- `UserType` `Admin` for creating `Insurance` with auth
- a lot of usage in the `ProfilesRepository` that could be cleaned up and spread to `InsurancesRepository` and `AppointmentsRepository`
- add more details to the `Appointment`: date, time, duration, reason, etc
- change `Patient` `Insurance` (can only create and read)
- remove `Doctor` `Insurance` (can only create and read)
- `Patient` find `Doctor` in same and with `Insurance` query
- let `Doctor` create and modify `Appointment`
- look more into if repositories should call from each other or if that is the service's job -- who bears the bigger business logic burdern
- hide password hash with a transform interceptor
- create separate decorators for `@GetDoctor` and `@GetPatient` instead of just `@GetUser` and filter from service
- add tests!
- and probably much more

## How to create an appointment

Please note the final appointment setup step comments before going through all this to make sure you can complete the appointment if actually following the steps

- Set up postgres database from `AppModule` setup
- See setup instructions below to run the app
- Create Insurances
  - POST `/insurances` with `{ name: 'Insurance Name', state: 'NY' }`
  - create multiple if desired, including in different states
  - this endpoint is unauthenticated, the rest are except for signup
- Set up doctor
  - POST `/auth/doctors/signup` with `{ email: pat@doctor.com, password: 'Password123' }`
  - POST `/auth/signin` with `{ email: pat@doctor.com, password: 'Password123' }`
  - `accessToken` in response will be the Bearer Token for subsequent authenticated requests
  - POST `/profile` with `{ firstName: 'Pat', lastName: 'Doctor', state: 'NY' }` (state is enum of US states)
  - GET `/profile` to confirm
  - PATCH `/profile` to change
  - POST `/doctors/insurances` with `{ insuranceId: 'existing-insurance-uuid' }`
    - can add many insurances to a doctor's profile
  - GET `/doctors/insurances` to confirm
- Set up patient
  - POST `/auth/patients/signup` with `{ email: pat@patient.com, password: 'Password123' }`
  - POST `/auth/signin` with `{ email: pat@patient.com, password: 'Password123' }`
  - `accessToken` in response will be the Bearer Token for subsequent authenticated requests
  - POST `/profile` with `{ firstName: 'Pat', lastName: 'Patient', state: 'NY' }` (state is enum of US states)
  - GET `/profile` to confirm
  - PATCH `/profile` to change
  - POST `/patients/insurance` with `{ insuranceId: 'existing-insurance-uuid' }`
  - GET `/patients/insurance` to confirm
- Set up appointment (Patient only)
  - POST `/appointments` with `{ doctorId: 'existing-doctor-uuid' }`
    - doctor and patient must be in same state
    - doctor insurances must also include patient insurance

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
