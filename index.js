const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let agencies = [];

app.get('/health', (req,res)=>{
  res.json({ ok:true, service:'caty-agencies' });
});

app.post('/agencies', (req,res)=>{
  const agency = {
    id: Date.now().toString(),
    code: Math.random().toString(36).substring(2,8).toUpperCase(),
    ...req.body,
  };
  agencies.push(agency);
  res.json(agency);
});

app.get('/agencies/search', (req,res)=>{
  const agency = agencies.find(a=>a.code===req.query.code);
  if(!agency) return res.status(404).json({message:"Not found"});
  res.json(agency);
});

app.listen(3000, ()=>console.log('Server running'));
