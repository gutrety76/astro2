import pika
import time


def process_data(data):
    # Here you can add your data processing logic
    processed_data = f"Processed: {data}"
    return processed_data


def callback(ch, method, properties, body):
    print(f"Received {body}")

    # Process the data
    processed_data = process_data(body)

    # Send the processed data to the new queue
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue='zodiac_future_prediction')
    channel.basic_publish(exchange='', routing_key='zodiac_future_prediction', body=processed_data)
    connection.close()

    # Acknowledge the message
    ch.basic_ack(delivery_tag=method.delivery_tag)


# Function to connect to RabbitMQ
def connect_to_rabbitmq():
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            return connection
        except pika.exceptions.AMQPConnectionError:
            print("Waiting for RabbitMQ to be ready...")
            time.sleep(5)


# Connect to RabbitMQ
connection = connect_to_rabbitmq()
channel = connection.channel()
channel.queue_declare(queue='zodiac_and_dates_to_predict')
channel.basic_consume(queue='zodiac_and_dates_to_predict', on_message_callback=callback, auto_ack=False)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
