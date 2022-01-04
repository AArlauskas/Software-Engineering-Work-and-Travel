import json
import pika
import sys

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='companies')
channel.exchange_declare(exchange='logs', exchange_type='fanout')

def addCompanyToQueue(company):
    channel.basic_publish(exchange='logs', routing_key='', body=json.dumps(company))
    print(" [x] Sent %r" % json.dumps(company))
