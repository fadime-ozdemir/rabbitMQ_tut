var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "hello";

    channel.assertQueue(queue, {
      durable: true, // the queue will survive a broker restart
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );

    var worker_queue = "task_queue";

    // This makes sure the queue is declared before attempting to consume from it
    channel.assertQueue(worker_queue, {
      durable: true,
    });

    channel.consume(
      worker_queue,
      function (msg) {
        var secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
        }, secs * 1000);
      },
      {
        /*  Automatic acknowledgment mode
         *  Acknowledgement is basically a notification for RabbitMQ broker that a particular message has been processed and the broker doesn't need to worry about it anymore.
         *  In particular it shouldn't redeliver to message to this or some other consumer.
         */
        noAck: false,
      }
    );
  });
});
