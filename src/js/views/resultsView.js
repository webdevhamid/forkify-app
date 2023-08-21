import View from './View.js';
import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipe found with your query. Please try with another one!';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
}
export default new ResultsView();
