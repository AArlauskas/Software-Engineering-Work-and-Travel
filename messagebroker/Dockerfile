FROM python:3-alpine3.15

COPY . /usr/src/app/messagebroker

WORKDIR /usr/src/app/messagebroker

RUN pip install -r requirements.txt

CMD ["python", "-u", "main.py"]