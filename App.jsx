import React, { useState, useEffect } from "react";

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [userProfile, setUserProfile] = useState({
    healthCondition: "normal",
    calorieLimit: 2000,
  });

  useEffect(() => {
    fetch("/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const searchRecipes = () => {
    const ingList = ingredients
      .split(",")
      .map((i) => i.trim().toLowerCase());
    const results = recipes.filter((recipe) =>
      ingList.every((ing) =>
        recipe.ingredients.some((ri) =>
          ri.toLowerCase().includes(ing)
        )
      )
    );
    setFilteredRecipes(results);
  };

  const generateWeeklyMenu = () => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    setWeeklyMenu(shuffled.slice(0, 7));
  };

  const checkHealth = (recipe) => {
    if (userProfile.healthCondition === "diabetes" && recipe.type === "شیرین") {
      return "❌ مناسب نیست (دیابت)";
    }
    if (recipe.calories > userProfile.calorieLimit) {
      return "⚠ کالری بالاتر از حد روزانه";
    }
    return "✅ مناسب";
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: "url('/src/assets/pattern.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-amber-900">
        🍲 آشپزی من
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-amber-800">
          جستجو بر اساس مواد اولیه
        </h2>
        <input
          type="text"
          placeholder="مواد را با کاما جدا کن (مثل: گوشت، سبزی)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={searchRecipes}
          className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded"
        >
          جستجو
        </button>
      </div>

      {filteredRecipes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-amber-700 mb-2">
            نتایج:
          </h3>
          {filteredRecipes.map((r) => (
            <div
              key={r.id}
              className="bg-amber-50 border rounded-lg p-3 mb-2"
            >
              <h4 className="font-bold">{r.name}</h4>
              <p>کالری: {r.calories}</p>
              <p>وضعیت سلامت: {checkHealth(r)}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-amber-800">
          منوی هفتگی
        </h2>
        <button
          onClick={generateWeeklyMenu}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-3"
        >
          تولید منوی هفتگی
        </button>
        {weeklyMenu.length > 0 && (
          <ul>
            {weeklyMenu.map((r, i) => (
              <li key={i} className="mb-1">
                {i + 1}. {r.name} ({r.calories} کالری)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
