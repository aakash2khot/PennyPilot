const mongoose = require('mongoose')
const User = require('../models/userModel')

const initialUsers = [
	{
		'name': 'Balaji',
		'email': 'balajisankapal@gmail.com',
		'password': '12345'
	},
	{
		'name': 'Akash',
		'email': 'aksh@gmail.com',
		'password': '09876'
	}
]

const loginUser = {
	'email': 'aksh@gmail.com',
	'password': '09876'
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialUsers, usersInDb, loginUser
}