Entrega 0 - ARQUISIS

Credenciales AWS para corrector:
URL de inicio de sesión de la consola
https://131470772874.signin.aws.amazon.com/console
Nombre de usuario
corrector
Contraseña de la consola
$nR70d(d

En caso que no funcione:
sign in con root mail
ccdiaz6@uc.cl
clave: jYeczhinf164

Dominio: connandiaz.me
api pública: http://connandiaz.me

El acceso remoto se realiza mediante SSH utilizando la llave keys.pem

Las rutas existentes son:
const Router = require('koa-router');
const router = new Router();

POST '/events',

GET '/history' 

GET '/history/:id' 

GET '/health (este no sé si funciona, lo programé cuando aún no entendía bien el enunciado)

module.exports = router;
        

RF1: Logrado
RF2: Logrado
RF3: Logrado
RF4: Logrado de forma mínima. Acá no entendí muy bien cómo aplicar el filtrado de tiempo dentro del json de packageBody. Se cumple la paginación.

RNF1: Logrado
RNF2: Logrado
RNF3: Logrado
RNF4: Logrado
RNF5: Logrado
RNF6: Logrado
RNF7: Logrado. Postgres a través de docker-compose.yml, master y connector a través de dockerfile. Connector usa un file-checking de un archivo temporal.

Docker-Compose: todos los rnf cumplidos.

Parte Variable: No realizada

P.D: en mi chat con la ia no se ve todo mi prompt principal así que también lo dejo acá:
"Este es el enunciado de la entrega que debo realizar, sin embargo, aunque el roadmap es bastante útil, creo que existe una forma más ordenada y que me ayude a entender mejor la implementación. Dame el orden en el que debo implementar cada funcionalidad tratando de respetar el roadmap (y el enunciado entero). Por ejemplo, estaba haciendo la api como siempre las hago, pero quería probarla para saber cómo funcionan las demandas que llegan y al parecer para eso necesito tener el connector. 
Además, que sepas que he decidido usar koa para el servicio web, por lo que me gustaría mantener javascript para el broker y postgres para la db. Ya creé mi cuenta de aws."