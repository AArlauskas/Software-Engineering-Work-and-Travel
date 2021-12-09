Software Engineering Work and Travel
Information about the project can be found in presentations folder

link to the template website: https://marvelapp.com/prototype/1682ebi4/screen/83939618

docker command for database:
docker run --name database-wt -e MYSQL_ROOT_PASSWORD=erasmus -e MYSQL_DATABASE=worktravel -e MYSQL_USER=erasmus -e MYSQL_PASSWORD=erasmus -p 3306:3306 -d mysql/mysql-server:5.7