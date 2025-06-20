# Upute za pokretanje projekta

1. **Instaliraj Docker:**  
   https://docs.docker.com/get-docker/
   https://www.docker.com/products/docker-desktop/

Alternativa Dockeru:
https://orbstack.dev/dashboard

2. **Pokreni projekt:**

Nakon što ste postavili Docker i raspakirali preuzetu zip datoteku pozicionirajte se u glavni direktorij (root) i izvršite naredbu:
  
  docker compose up --build

Svako sljedeće pokretanje može se postići izvršavanjem naredbe:
  
  docker compose up

3. **Inicijaliziranje baze podataka**  
Za inicijaliziranje baze podataka je potrebno izvršiti naredbe

   docker exec -i portiq-db-1 psql -U portiq_user -d postgres

Nakon toga u psql shellu:

    CREATE DATABASE portiq_db;

Ako želite napuniti bazu podataka inicijalnim podacima, izvršite sljedeću naredbu:

   docker exec -i portiq-db-1 psql -U portiq_user -d portiq_db < backup.sql


a ako želite praznu bazu podataka, izvršite sljedeću naredbu:
   docker exec -it portiq-backend-1 python manage.py migrate

U slučaju da vam se ispiše greška kako portiq-backend-1 kontenjer ne postoji, u terminalu upišite naredbu
  
  docker ps

što će ispisati sve pokrenute kontenjere. Kopirajte CONTAINER ID poslužiteljskog kontenjera i ponovo pokrenite naredbu za migraciju, ali sa promijenjenim ID parametrom

  docker exec -i <container_id> python manage.py migrate 


Ukoliko imate problema s dopuštenjima pri rukovanju bazom podataka izvršite sljedeću naredbu:

   docker exec -i portiq-backend-1 python manage.py createsuperuser

4. **Aplikacija je dostupna na:**  
  http://localhost:8000

