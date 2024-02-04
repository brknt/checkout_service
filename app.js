const express = require('express');

const app = express();



app.get('/',(req,res)=>{
    console.log('get request');
    
})

app.listen(3001,()=>{
    console.log(`App started on port 3001`);
})