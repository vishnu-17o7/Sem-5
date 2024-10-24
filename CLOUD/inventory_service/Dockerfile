FROM python:3.11-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000 5001 5002 5003 5004

ENV FLASK_ENV=production

CMD ["python", "inventory_service.py"]