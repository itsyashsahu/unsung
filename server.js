const express = require('express')
const app = express()
var cors = require('cors');
const path = require('path')
const PORT = process.env.PORT || 4000
require('dotenv').config();
// var express = require('express');
// var router = express.Router();
// console.log(process.env.RAZORPAY_KEY)
const Razorpay = require('razorpay')
const shortid = require('shortid')
const bodyParser = require('body-parser');

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_FbGfHh97AaWWxS',
	key_secret: 'nmt313sQXuQRfTeYYkHyQ43D'
})
app.get("/api", (req, res) => {
  res.json({ message: `The API is Runing Man Go Ahead Do Your Shit  ` });
});

app.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/api/razorpay', async (req, res) => {
    // console.log("hello body ",req.body,req.body.amount)
	const payment_capture = 1
	// const amount = 499
	const amount = req.body.amount;
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		// console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
