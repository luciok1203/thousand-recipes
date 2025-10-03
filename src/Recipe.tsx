// src/Recipe.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type RecipeDetail = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  mealType: string;
};

export default function Recipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data: RecipeDetail) => setRecipe(data));
  }, [id]);

  // 데이터가 오기 전엔 아무것도 표시하지 않음
  if (!recipe) return null;

  const totalMinutes =
    (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0);

  return (
    <main className="recipe-detail">
      <header className="detail-header">
        <Link to="/" className="back-link">
          <button className="back-button">돌아가기</button>
        </Link>
        <h1 className="detail-title">{recipe.name}</h1>
        <p className="detail-sub">
          {recipe.cuisine} · {recipe.mealType} · {recipe.difficulty}
        </p>
      </header>

      <section aria-label="대표 이미지" className="detail-hero">
        <img className="detail-image" src={recipe.image} alt={recipe.name} />
      </section>

      <section aria-label="메타 정보" className="detail-meta">
        <div className="meta-grid">
          <div className="meta-card">
            <span className="meta-label">준비</span>
            <strong className="meta-value">{recipe.prepTimeMinutes}분</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">조리</span>
            <strong className="meta-value">{recipe.cookTimeMinutes}분</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">총 소요</span>
            <strong className="meta-value">{totalMinutes}분</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">1인 칼로리</span>
            <strong className="meta-value">
              {recipe.caloriesPerServing} kcal
            </strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">평점</span>
            <strong className="meta-value">{recipe.rating.toFixed(1)}</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">인분</span>
            <strong className="meta-value">{recipe.servings}인분</strong>
          </div>
        </div>

        <div className="detail-tags">
          {recipe.tags.map((t) => (
            <span key={t} className="recipe-tag">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="detail-sections">
        <article className="panel">
          <h2 className="panel-title">재료</h2>
          <ul className="ingredients">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2 className="panel-title">만드는 법</h2>
          <ol className="instructions">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
