const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})


app.post('/', (req,res)=>{
    const email = req.body.email
    const data = {
        members: [
            {
            email_address: email,
            status : "subscribed",

        }
    ]
    }
    var jsonData = JSON.stringify(data)

    const url= "https://us11.api.mailchimp.com/3.0/lists/5f077fb7ab"
    const options= {
        method: "POST",
        auth:"will:d3957096789813439fa21858b9d6be3b-us11"
    }



   const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
    
})


app.listen(5005, function(){
    console.log("server is running on port 5005")
})