# workouts-tracker
A simple app to track your workouts

## Installation
This repo contains two separate projects, the backend and the frontend.
To install the backend, run 
```
  cd backend
  npm install
```
Add .env file to the root of the backend folder with the following content:
```
  SESSION_KEY="your session key"
  DATABASE_URL="file:path/to/database.db"
```
Then run
```
  npx prisma migrate dev
  npm start
```
You can manually test the backend in the vscode via REST client extenstion, go to the file `backend/main.http` and run the requests.

To install the frontend from the root of the project run
```
  cd frontend
  npm install
  npm run dev
```
## Roadmap
### Build an authentication system that user can:
- [x] Register
- [x] Login
- [x] Logout
- [x] Reset password

### Build Workout system that users can:
- [x] create Workout
- [x] edit Workout
- [x] delete Workout
- [x] view Workout Details
- [x] view Workout List
- [ ] view Workout List pagination

### Build Profile functionalities that users can:
- [ ] view Profile
- [ ] change Profile picture
- [ ] change email
- [ ] change password
- [ ] change username

### Build a Dashboard that users can:

### Build statistics system:
On the home page show:
- [ ] Total number of workouts
- [x] Total number of workouts in the last 7 days
- [ ] Last time that the user worked out

## Dev Wishlist
- [ ] Add tests
- [ ] Dockerize the app
- [ ] Add API Documentation
