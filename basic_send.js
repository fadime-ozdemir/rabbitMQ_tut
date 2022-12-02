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
    var msg = "why are you cutting the first letter ?";

    channel.assertQueue(queue, {
      durable: true, // the queue will survive a broker restart
    });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

    var worker_queue = "task_queue";
    var worker_msg = process.argv.slice(2).join(" ") || "Hello World!";
    channel.assertQueue(worker_queue, {
      durable: true,
    });
    channel.prefetch(1); // this dispatches messages equally between consumers
    channel.sendToQueue(worker_queue, Buffer.from(worker_msg), {
      persistent: true, // the message will survive if rabbitmq crashes
    });
    console.log(" [x] Sent '%s'", worker_msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
