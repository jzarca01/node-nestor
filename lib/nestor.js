const axios = require('axios');
const moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

class Nestor {
    constructor(config) {
        this.request = axios.create({
            baseURL: 'https://api-nestor.com',
            headers: {
                'User-Agent': 'Nestor/1.1 (iPhone; iOS 11.4.1; Scale/2.00)'
            }
        });
    }

    setAccessToken(accessToken) {
        this.request.defaults.headers.common['Authorization'] = '';
        delete this.request.defaults.headers.common['Authorization'];

        this.request.defaults.headers.common[
            'Authorization'
        ] = `Basic ${accessToken}`;
    }

    async signUp(email, password) {
        try {
            const signup = await this.request({
                method: 'POST',
                url: '/auth/basic/register',
                data: {
                    email,
                    password
                },
                responseType: 'json'
            })
            this.setAccessToken(new Buffer(`${email}:${password}`).toString('base64'))
            return signup.data
        } catch (err) {
            console.log('error with signUp', err)
        }
    }

    async login(email, password) {
        try {
            const login = await this.request({
                method: 'POST',
                url: '/auth/basic/login',
                data: {
                    email,
                    password
                },
                responseType: 'json'
            })
            this.setAccessToken(new Buffer(`${email}:${password}`).toString('base64'))
            return login.data
        } catch (err) {
            console.log('error with login', err)
        }
    }

    async getProfile() {
        try {
            const profile = await this.request({
                method: 'GET',
                url: `/customer`,
                responseType: 'json'
            })
            return profile.data
        } catch (err) {
            console.log('error with getProfile', err)
        }
    }

    async updateProfile({lastName, firstName, email, phone}) {
        try {
            const profile = await this.request({
                method: 'PUT',
                url: `/customer`,
                data: {
                    lastName,
                    firstName,
                    email,
                    phone
                },
                responseType: 'json'
            })
            return profile.data
        } catch (err) {
            console.log('error with getProfile', err)
        }
    }

    async getStripeProfile() {
        try {
            const stripe = await this.request({
                method: 'GET',
                url: `/stripe/customer`,
                responseType: 'json'
            })
            return stripe.data
        } catch (err) {
            console.log('error with getStripeProfile', err)
        }
    }

    async getMenu(postalCode) {
        try {
            const menu = await this.request({
                method: 'GET',
                url: `/menu/${postalCode}`,
                responseType: 'json'
            })
            return menu.data
        } catch (err) {
            console.log('error with getMenu', err)
        }
    }

    async getOrders() {
        try {
            const orders = await this.request({
                method: 'GET',
                url: '/order/page/0',
                responseType: 'json'
            })
            return orders.data
        } catch (err) {
            console.log('error with getOrders', err)
        }
    }

    async getOrderById(orderId) {
        try {
            const order = await this.request({
                method: 'GET',
                url: `/order/${orderId}`,
                responseType: 'json'
            })
            return order.data
        } catch (err) {
            console.log('error with getOrderById', err)
        }
    }
}

module.exports = Nestor;