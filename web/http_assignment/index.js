const  express = require('express')

const app = express();

app.use(express.json());

app.post("/subtract/:a/:b",(req,res)=>{
    const a = req.params.a;
    const b = req.params.b;

    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    return res.json({
        result: num1-num2
    })
})

app.listen(3009,()=>{
    console.log("listening")
})