PGPASSWORD=123qwe dropdb -h localhost -p 5432 -U postgres demobd
PGPASSWORD=123qwe createdb -h localhost -p 5432 -U postgres demobd
PGPASSWORD=123qwe psql -h localhost -p 5432 -U postgres -d demobd -f tablas.sql
PGPASSWORD=123qwe psql -h localhost -p 5432 -U postgres -d demobd -f datos.sql
