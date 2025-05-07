const https = require("https");

const sendMessage = (from, text) => {
    try {
        const data = JSON.stringify({
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": "526181387485",
            "type": "text",
            "text": {
                "preview_url": false,
                "body": " Hola soy el asistente virtual de Joel, en que te puedo ayudar? \n porfavor ingresa de la lista \n1 hablar con joel \n2 sigueme atendiendo el bot"
            }
        });

        const options = {
            host: "graph.facebook.com",
            path: "/v22.0/683869301467202/messages",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer EAAPrKD01YIoBO2vOqQ3Dpu5VH4qZCypCx1AFiMMrs9twDweskZAICe0thCKTE0wnZCZCsC6fe1R3zJceDsZC3gZByRjvPWvVNT8y5x7WGDUlvAtnmr0AoJBtJiMrAKz7tifLc0ZCddufhGGQtDaYr44uZBozj3DdMZBGZCTdXmp5VvG3J5q7DeIp1ngYrugI2x90STeP53SAc05T1C5ZAHanvYs08GX"
            }
        };

        console.log('Enviando mensaje con los siguientes datos:');
        console.log('URL:', `https://${options.host}${options.path}`);
        console.log('Datos:', data);
        console.log('Headers:', options.headers);

        const req = https.request(options, (res) => {
            console.log('Status Code:', res.statusCode);
            console.log('Headers:', res.headers);
            
            let responseData = '';
            
            res.on("data", (d) => {
                responseData += d;
            });

            res.on("end", () => {
                try {
                    const parsedResponse = JSON.parse(responseData);
                    if (parsedResponse.error) {
                        console.error('Error de la API de Facebook:', {
                            mensaje: parsedResponse.error.message,
                            tipo: parsedResponse.error.type,
                            código: parsedResponse.error.code,
                            subcódigo: parsedResponse.error.error_subcode
                        });
                        
                        // Manejo específico de errores comunes
                        if (parsedResponse.error.code === 100) {
                            console.error('El ID del objeto no existe o no tienes los permisos necesarios.');
                            console.error('Por favor, verifica:');
                            console.error('1. Que el ID de la aplicación sea correcto');
                            console.error('2. Que el token de acceso tenga los permisos necesarios');
                            console.error('3. Que la aplicación esté correctamente configurada en el panel de desarrolladores de Facebook');
                        }
                    } else {
                        console.log('Mensaje enviado exitosamente:', parsedResponse);
                    }
                } catch (parseError) {
                    console.error('Error al procesar la respuesta:', parseError.message);
                    console.log('Respuesta raw:', responseData);
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error en la petición HTTP:', error.message);
        });

        req.write(data);
        req.end();
    } catch (error) {
        console.error('Error al enviar el mensaje:', error.message);
        throw error;
    }
};

module.exports = { sendMessage };