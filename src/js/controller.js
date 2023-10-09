import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import resultsView from './views/ResultView.js';
import searchView from './views/SearchView.js';
import paginationView from './views/PaginationView.js';

// fetch("https://forkify-api.herokuapp.com/api/v2/recipes/");

const controlRecipes = async function() {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);

    recipeView.renderSpinner();
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}
const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError();
    throw error;
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();