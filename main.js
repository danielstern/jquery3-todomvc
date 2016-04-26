"use strict"
let port = 80;
let express = require('express');
let app = new express();
var argv = require('optimist').argv;
var itemCount = 0;
var customItems;

if (argv.i)
{
	customItems = [];
	for (var i = 0; i < argv.i; i++) {
		customItems.push({
			"id":i,
			"complete":true,
			"title":`To Do Item #${i}`,
		})
	}
} else {
	console.log("Run with command line argument --i=n to start with a list of arbitrary size");
}

app.use(express.static('app'))
	.get('/items',(req,res)=>{
		res.status(200).json(customItems ? customItems : require('./data/items.json'));
	})
	.listen(port,()=>console.log(`App listening on Port ${port}`));
