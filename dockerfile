FROM node:20-alpine as frontend
WORKDIR /app
COPY . .
RUN npm install -g pnpm@latest
RUN pnpm i -f
RUN pnpm run build 

FROM python:3.11-alpine as backend
WORKDIR /app
COPY . .
COPY --from=frontend /app/dist ./dist
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

