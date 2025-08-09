import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const recipes = [
  { id: 1, name: "قرمه سبزی", ingredients: ["گوشت", "سبزی", "لوبیا"], calories: 450, type: "خورشتی" },
  { id: 2, name: "زرشک پلو با مرغ", ingredients: ["مرغ", "زرشک", "برنج"], calories: 520, type: "پلو" },
  { id: 3, name: "کتلت", ingredients: ["سیب زمینی", "گوشت"], calories: 380, type: "سرخ‌کردنی" }
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
