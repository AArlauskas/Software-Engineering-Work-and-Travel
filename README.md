Software Engineering Work and Travel
Information about the project can be found in presentations folder

link to the template website: https://marvelapp.com/prototype/1682ebi4/screen/83939618

docker command for database:
docker run --name database-wt -e MYSQL_ROOT_PASSWORD=erasmus -e MYSQL_DATABASE=worktravel -e MYSQL_USER=erasmus -e MYSQL_PASSWORD=erasmus -p 3306:3306 -d mysql/mysql-server:5.7
docker command for rabbitMq:
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

How to launch:
1. Start frontend with npm install, npm start
2. Initialise database and start with docker start database-wt
3. Start rabbitMq
4. Start messageBroker by installing dependencies and starting it with python main.python
5. Start backend


For Stripe:
Provide private key in the backend StripeClientService.
Run stripe CLI with the command: stripe listen --forward-to localhost:8080/api/payments/webhook