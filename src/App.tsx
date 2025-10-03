import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Recipe = {
  id: number;
  name: string;
  difficulty: string;
  tags: string[];
  image: string;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const recipesPerPage = 6;

  const goToPage = (p: number) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    fetch('https://dummyjson.com/recipes?limit=50')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setTotalRecipes(data.total);
      });
  }, []);

  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  const firstIndex = recipesPerPage * (currentPage - 1) + 1;
  const lastIndex = Math.min(totalRecipes, recipesPerPage * currentPage);
  const currentRecipes = recipes.slice(firstIndex - 1, lastIndex);

  return (
    <div>
      <header>
        <h1 className="title">천개의 레시피</h1>
      </header>
      <main>
        <div className="recipe-grid">
          {currentRecipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="recipe-card-link"
            >
              <div className="recipe-card">
                <div className="recipe-image-container">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                </div>
                <div className="recipe-header">
                  <h2 className="recipe-name">{recipe.name}</h2>
                  <span className="recipe-difficulty">{recipe.difficulty}</span>
                </div>
                <div className="recipe-tags">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="recipe-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer>
        <nav className="pagination">
          <button
            className="pagination-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`pagination-button ${currentPage === p ? 'is-active' : ''}`}
              aria-current={currentPage === p ? 'page' : undefined}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default App;
