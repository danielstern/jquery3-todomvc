"use strict"
let port = 80;
let express = require('express');
let app = new express();
app.use(express.static('app'))
	.get('/items',(req,res)=>{
		res.status(200).json(require('./data/items.json'));
	})
	.listen(port,()=>console.log(`App listening on Port ${port}`));
