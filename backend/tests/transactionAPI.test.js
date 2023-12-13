const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const User = require('../models/userModel')
// const api = supertest(app)
const helper = require('./helperTest')

const request = supertest(app);