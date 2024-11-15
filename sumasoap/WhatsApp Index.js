const axios = require('axios');
const xml2js = require('xml2js');

// Definir el cuerpo de la solicitud SOAP para el servicio alternativo
const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:Add>
         <web:intA>10</web:intA>
         <web:intB>3</web:intB>
      </web:Add>
   </soapenv:Body>
</soapenv:Envelope>`;

// Configurar la solicitud
axios.post('http://www.dneonline.com/calculator.asmx', soapBody, {
    headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/Add'
    }
})
.then(response => {
    xml2js.parseString(response.data, (err, result) => {
        if (err) {
            console.error('Error al parsear XML:', err);
            return;
        }
        // Imprimir el objeto parseado para verificar la estructura
        console.log('Objeto parseado:', JSON.stringify(result, null, 2));

        // Extraer el resultado de la suma del XML parseado
        try {
            const addResult = result['soap:Envelope']['soap:Body'][0]['AddResponse'][0]['AddResult'][0];
            console.log('Resultado de la suma:', addResult);
        } catch (e) {
            console.error('Error al extraer el resultado:', e);
        }
    });
})
.catch(error => {
    console.error('Error al hacer la solicitud:', error);
});
