//https://www.rabbitmq.com/tutorials/tutorial-one-javascript

const amqp = require('amqplib');
const axios = require('axios');
const fs = require('fs');

const queue = 'observer.15.q';
const broker = 'amqps://observer.15:jfJdhsyLRt041qeYgpxZlBEs@broker.iic2173.org:5671/energy';

function reintentarConexion() {
    amqp.connect(broker).then(function(conn) {
    conn.on('close', function() {
        console.error("conexión cerrada, reintentando en 5 segundos...");
        setTimeout(reintentarConexion, 5000);
    });

    return conn.createChannel().then(function(ch) {
        fs.writeFileSync('/tmp/healthy', '');
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        return ch.consume(queue, function(msg) {
            if (msg !== null) {
                console.log(" [x] Received %s", msg.content.toString());   

                const data = JSON.parse(msg.content.toString());

                axios.post("http://master:3000/events", data)
                    .then(response => {
                        console.log("data enviada a api:", response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    ch.ack(msg);
                }
            });

        });
    }).catch(function(err) {
        console.error("Error al conectar:", err.message);
        setTimeout(reintentarConexion, 5000);
    });
}

reintentarConexion();
        
