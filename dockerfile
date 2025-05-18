FROM node:20-alpine AS frontend
WORKDIR /app
RUN npm install -g pnpm@9.15.5
COPY . ./
RUN pnpm i
RUN pnpm run build

FROM python:3.13 AS backend
WORKDIR /app
COPY . ./
COPY --from=frontend /app/dist ./dist
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]