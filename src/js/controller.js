import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_WINDOW_SEC } from './config.js';

// Polyfilling everything else
import 'core-js/stable';
// Polyfilling asyn await
import 'regenerator-runtime/runtime';

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Guard clause
    if (!id) return;

    // Rendering Spinner
    recipeView.renderSpinner();

    // 0) Update results view to mark selected result
    resultsView.update(model.getSearchResultsPage());

    // 1) Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading Recipe
    await model.loadRecipe(id);

    // 3) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Render Spinner
    resultsView.renderSpinner();

    // Load search results
    await model.loadSerachResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in the state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  // Add or delete bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  // Render stored bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (addRecipe) {
  try {
    // Render loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(addRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Show success message
    addRecipeView.renderSuccess();

    // Render bookmark
    bookmarksView.render(model.state.bookmarks);

    // Change ID in browser URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close the window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_WINDOW_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
  // Reload the ADD RECIPE FIELD again
  // location.reload();
};

const init = function () {
  bookmarksView.addHandlerBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  paginationView.addHandlerClick(controlPagination);
  searchView.addHandlerSearch(controlSearchResults);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
