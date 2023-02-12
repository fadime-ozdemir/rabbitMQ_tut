Rabbit mq
to receive send messages.
create a channel, then create a NAMED queue if it does not exist, then send or receive message.
A task is a technical data that is sent to be exchanged.
A producer is a user application that sends messages.
A queue is a buffer that stores messages. first-in-first-out (FIFO)
A consumer is a user application that receives messages.

Work queues
They will send time-consuming tasks to multiple consumers. Main reason: create concurrent consumers.
prefetch, durable, persistent and noAck

Publish/Subscribe
Pattern: deliver to multiple consumers through exchanges.
Producer sends message to exchange which decided how and where to send message, then message goes to a queue, eventally the cunsumers listens the queue and consumes the message.

Exchange types.
direct => queues are tied to a direct exchange. Binding key === routing key
topic => Topic RabbitMQ exchange type sends messages to queues depending on wildcard matches between the routing key and the queue binding’s routing pattern. It uses something like regex
headers => is a message routing system that uses arguments with headers and optional values to route messages.
fanout => broadcast the same message to every queue it knows
default => unnamed pre-declared direct exchange
Dead Letter => exchange for messages which are published but they don't have consumers. For not delivered messages

`channel.publish('logs', '', Buffer.from('Hello World!'));`

the `''` does not specify a named queue, binding key parameter

```
channel.assertQueue('', {
  exclusive: true
});
```

create a random named queue which is deleted when the connection is closed (exclusive)

Binding is the relation between exchange and queues

Routing
through binding and routing key

Topic
List of words delimited by dots.

- (star) can substitute for exactly one word.
- (hash) can substitute for zero or more words.

Remote procedure call (RPC)
A client sends a request message and a server replies with a response message.
Message properties
The AMQP 0-9-1 protocol predefines a set of 14 properties that go with a message. Most of the properties are rarely used, with the exception of the following:

- persistent: Marks a message as persistent (with a value of true) or transient (false). You may remember this property from the second tutorial.
- content_type: Used to describe the mime-type of the encoding. For example for the often used JSON encoding it is a good practice to set this property to: application/json.
- reply_to: Commonly used to name a callback queue.
- correlation_id: Useful to correlate RPC responses with requests.
