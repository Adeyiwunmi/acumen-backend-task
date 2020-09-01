# Ade's Acumen Backend Test Submission

### Description
This is an express app that is used to manage student enrollments for courses,
it can 
- list enrollments.
- add a new enrollment. 
- delete an existing student enrollment.

The application uses [express](https://expressjs.com/ "expressjs's Website") ,
 [firestore](https://firebase.google.com/docs/firestore "firestore's Website") 
 and [docker](https://www.docker.com/ "Dockers's Website")  .

The image can be found on [dockerhub](https://hub.docker.com/repository/docker/adeboludeyi/acumen-student-manager) , the postman collection can be found on https://documenter.getpostman.com/view/1418222/TVCe2p6c

#### Running the App
Once the contents of this repository is pulled , one should set the environment variables in the `env.sample` file ,then run the app using `npm run dev`.
If you will be running with docker, you can build the image  and run the container making sure an environment file is supplied to the docker daemon,
you can also attach your own service config file and specify the name in the env  variable.

#### Testing

The application has some light unit tests that can be run 
using `npm run test` or by running `mocha` if you have [Mocha](https://mochajs.org/ "Mocha's Website")  installed on your computer.

#### Improvements 
The app can be improved by 
- adding more tests
- making the list enrollment API accept parameters like limit and offset for pagination.

Thank you for looking through.

