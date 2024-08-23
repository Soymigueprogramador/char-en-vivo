// Importaciones
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

// Constantes básicas para el nombre del proyecto, puerto y definición de la app
const app = express(); 
const PUERTO = 8080;
const projectName = 'Chat en vivo';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

// Configuración de Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

// Endpoint
app.get("/", (req, res) => {
    res.render("index");
});

// Listen
const httpServer = app.listen(PUERTO, () => {
    console.log(`${projectName} levantado en: http://localhost:${PUERTO}`); 
}); 

// Array para guardar los mensajes 
let messages = [];

// Instancia de socket.io
const io = new Server(httpServer);

// Respuesta de socket.io cuando el usuario se conecta
io.on("connection", (socket) => {
    console.log('Usuario conectado');
    
    socket.on("message", (data) => {
        messages.push(data); 
        io.emit("messagesLogs", messages); 
    });
});