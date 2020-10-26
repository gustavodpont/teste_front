'use strict';

const Joi = require('joi');
const fs = require('fs');

module.exports = [
    {
        method: 'POST',
        path: '/api/product',
        handler: async (request, h) => {
            const rawDatabase = fs.readFileSync('./database.json');
            const database = JSON.parse(rawDatabase);

            const product = request.payload;
            product.id = database.products.currentId++;

            database.products.data.push(product);
            fs.writeFileSync('./database.json', JSON.stringify(database));

            return product;
        },
        options: {
            validate: {
                payload: {
                    name: Joi.string().min(2).max(255).required(),
                    brand: Joi.string().min(2).max(255).required(),
                    quantity: Joi.number().integer().required(),
                    category: Joi.number().integer().min(1).max(3).required(),
                },
            },
        },
    },
    {
        method: 'GET',
        path: '/api/product',
        handler: async (request, h) => {
            const rawDatabase = fs.readFileSync('./database.json');
            const database = JSON.parse(rawDatabase);

            let products = database.products.data;

            if (request.query.q) {
                const regex = new RegExp(`.*${request.query.q}.*`, 'i');
                products = database.products.data.filter(element => regex.test(element.name));
            }

            for (const key in products) {
                if (products.hasOwnProperty(key)) {
                    const product = products[key];

                    product.category = database.categories.data.find(element => element.id === product.category);
                }
            }

            return products;
        },
        options: {
            validate: {
                query: {
                    q: Joi.string(),
                },
            },
        },
    },
    {
        method: 'GET',
        path: '/api/product/{productId}',
        handler: async (request, h) => {
            const rawDatabase = fs.readFileSync('./database.json');
            const database = JSON.parse(rawDatabase);

            const product = database.products.data.find(element => element.id === request.params.productId);

            product.category = database.categories.data.find(element => element.id === product.category);

            return product;
        },
        options: {
            validate: {
                params: {
                    productId: Joi.number().integer(),
                },
            },
        },
    },
    {
        method: 'PATCH',
        path: '/api/product/{productId}',
        handler: async (request, h) => {
            const rawDatabase = fs.readFileSync('./database.json');
            const database = JSON.parse(rawDatabase);

            let product = database.products.data.find(element => element.id === request.params.productId);
            product = Object.assign(product, request.payload);

            fs.writeFileSync('./database.json', JSON.stringify(database));

            return product;
        },
        options: {
            validate: {
                params: {
                    productId: Joi.number().integer(),
                },
                payload: {
                    name: Joi.string().min(2).max(255),
                    brand: Joi.string().min(2).max(255),
                    quantity: Joi.number().integer(),
                    category: Joi.number().integer().min(1).max(3)
                },
            },
        },
    },
    {
        method: 'DELETE',
        path: '/api/product/{productId}',
        handler: async (request, h) => {
            const rawDatabase = fs.readFileSync('./database.json');
            const database = JSON.parse(rawDatabase);

            const index = database.products.data.findIndex(element => element.id === request.params.productId);
            database.products.data.splice(index, 1);

            fs.writeFileSync('./database.json', JSON.stringify(database));

            return h.response(null).code(204);
        },
        options: {
            validate: {
                params: {
                    productId: Joi.number().integer(),
                },
            },
        },
    },

    {
        method: 'GET',
        path: '/api/category',
        handler: async (request, h) => {
            const rawDatabase = fs.readFileSync('./database.json');
            const database = JSON.parse(rawDatabase);

            if (request.query.q) {
                const regex = new RegExp(`.*${request.query.q}.*`, 'i');
                return database.categories.data.filter(element => regex.test(element.name))
            }

            return database.categories.data;
        },
        options: {
            validate: {
                query: {
                    q: Joi.string(),
                },
            },
        },
    },
];
