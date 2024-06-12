const express = require('express');
const amqp = require('amqplib/callback_api');
const app = express();
const port = 3001;

let channel = null;

// Connect to RabbitMQ and set up channels
amqp.connect('amqp://rabbitmq', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, ch) => {
    if (error1) {
      throw error1;
    }
    channel = ch;
    const pythonQueue = 'python_queue';
    const nodeQueue = 'node_queue';
    const zodiacQueue = 'zodiac_and_dates_to_predict';

    ch.assertQueue(pythonQueue, { durable: false });
    ch.assertQueue(nodeQueue, { durable: false });
    ch.assertQueue(zodiacQueue, { durable: false });

    // Receive messages from the Python service
    ch.consume(nodeQueue, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
      // Here you can add code to handle the message received from Python service
    }, { noAck: true });
  });
});

app.get('/', (req, res) => {
  res.json({ john: 1 });
});

app.get('/starttask', (req, res) => {
  if (channel) {
    // Calculate dates for the next two weeks and send to zodiac_and_dates queue
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const dateStr = futureDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      channel.sendToQueue('zodiac_and_dates_to_predict', Buffer.from(dateStr));
      console.log(" [x] Sent date %s to zodiac_and_dates_to_predict queue", dateStr);
    }

    res.json({ status: 'Task sent to Python service and dates sent to zodiac_and_dates queue' });
  } else {
    res.status(500).json({ error: 'RabbitMQ channel is not available' });
  }
});

app.listen(port, () => {
  console.log(`Node.js server is running on http://localhost:${port}`);
});
