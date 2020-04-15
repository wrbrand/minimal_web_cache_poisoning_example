const express = require('express')
const util = require('util')
const app = express()
const port = 3000

let cache = {};

app.get('/', (req, res) => 
	res.send('We have discovered that Math.random is determininstic. Enter your search query to see how many times you need to run Math.random to get that number (<100000): <form method="get" action="/random" ><input name="num"/></form>')
)

app.get('/random/', (req, res) => {
	let q = parseInt(req.query.num)
	
	if(typeof q == "undefined" || q >= 100000) {
		res.redirect('/')
	} else {
		if(typeof cache[q] !== "undefined") {
			res.send(cache[q])
		} else {
			let i, j = 0
			while(q !== Math.floor(Math.random() * 100000)) {
				j++
			}
			let response = util.format("To get %d we had to run Math.random %d times! <input type='hidden' name='tracking_id' value='%s'/>", q, j, req.query.tracking_id)
			cache[q] = response
			res.send(response)
		}
	}

})

app.listen(port, () => 
	console.log(`Example app listening at http://localhost:${port}`)
)
