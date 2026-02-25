const request = require('supertest');
const app = require('../app');
const { calculateValue, applyTax } = require('../lib/logics');

describe('Suite de Pruebas de Calidad de Software', () => {

    describe('Pruebas Unitarias - Lógica de Inventario', () => {
        test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
            const result = calculateValue(10, 5);
            expect(result).toBe(50);
        });

        test('Debe retornar 0 si se ingresan valores negativos', () => {
            const result = calculateValue(-10, 5);
            expect(result).toBe(0);
        });

        test('Debe aplicar correctamente el impuesto (100 + 16% = 116)', () => {
            const result = applyTax(100, 16);
            expect(result).toBe(116);
        });

        test('Debe retornar 0 si el precio o impuesto son negativos', () => {
            const result = applyTax(-100, 16);
            expect(result).toBe(0);
        });
    });




    describe('Pruebas de Integración - API Endpoints', () => {

        test('GET /health - Debe responder con status 200 y JSON correcto', async () => { // Devuelve un JSON con el status OK 
            const response = await request(app).get('/health');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', 'OK');
        });

        test('GET /items - Debe validar la estructura del inventario', async () => {
            const response = await request(app).get('/items');
            expect(response.statusCode).toBe(200); // si devuelve un 200 es que la petición fue exitosa
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('stock');
        });

        test('GET /items/1 - Debe regresar un item específico', async () => {
            const response = await request(app).get('/items/1');

            expect(response.statusCode).toBe(200); // Pues si es 200 Todo bien vale
            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('stock');
        });

        test('GET /items/999 - Debe responder 404 cuando el item no existe', async () => {
            const response = await request(app).get('/items/999'); // 

            expect(response.statusCode).toBe(404); // Esto significa que el item no existe
            expect(response.body).toHaveProperty('message');
        });

        test('GET /items - Debe contener la propiedad "name" en cada elemento del inventario', async () => {
            const response = await request(app).get('/items');
            expect(response.statusCode).toBe(200);

            response.body.forEach(item => {
                expect(item).toHaveProperty('name');
                expect(typeof item.name).toBe('string');
            });
        });
    });

});