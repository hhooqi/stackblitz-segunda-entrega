import { neon } from '@neondatabase/serverless';
import { engine } from 'express-handlebars';
import express from 'express';

const sql = neon('postgresql://neondb_owner:xhe52nKqwzMp@ep-fragrant-boat-a5d03ns4.us-east-2.aws.neon.tech/neondb?sslmode=require');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
  const lista = await sql('SELECT * FROM products;');
  res.render('home', {lista});
});

app.get('/add/product', (req,res)=> {
  res.render('addproduct');
});

app.post('/products',async (req,res)=> {
  const name = req.body.name;
  const price = req.body.price;

  const query = 'INSERT INTO products (name,price) VALUES ($1,$2)';
  await sql(query, [name,price]);

  res.redirect('/');
})

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
