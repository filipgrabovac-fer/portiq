# Frontend development stage
FROM node:20-alpine as frontend-dev
WORKDIR /app
RUN npm install -g pnpm@9.15.5
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
# Don't copy or build anything - we'll use volumes for development
EXPOSE 3000
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]

# Frontend build stage
FROM node:20-alpine as frontend
WORKDIR /app
RUN npm install -g pnpm@9.15.5
COPY . ./
RUN pnpm i
RUN pnpm run build

# Backend stage
FROM python:3.13 as backend
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
COPY --from=frontend /app/dist ./dist
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]