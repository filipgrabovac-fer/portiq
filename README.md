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
Za inicijaliziranje baze podataka je potrebno izvršiti naredbu

   docker compose exec portiq-backend-1 python manage.py migrate

U slučaju da vam se ispiše greška kako portiq-backend-1 kontenjer ne postoji, u terminalu upišite naredbu
  
  docker ps

što će ispisati sve pokrenute kontenjere. Kopirajte CONTAINER ID poslužiteljskog kontenjera i ponovo pokrenite naredbu za migraciju, ali sa promijenjenim ID parametrom

  docker compose exec <container_id> python manage.py migrate 


Ukoliko imate problema s dopuštenjima pri rukovanju bazom podataka izvršite sljedeću naredbu:

   docker compose exec portiq-backend-1 python manage.py createsuperuser


Dodavanje podataka u bazu podataka:

  docker exec -i portiq-db-1 psql -U portiq_user -d portiq_db < backup.sql

4. **Aplikacija je dostupna na:**  
  http://localhost:8000

