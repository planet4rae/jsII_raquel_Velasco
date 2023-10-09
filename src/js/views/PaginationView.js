import View from "./View.js";
import icons from '../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');    

    addHandlerClick(handler){
        this._parentElement.addEventListener('click',(e)=>{
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }


    _generateMarkup(){
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // escenarios
        // pagina 1 y hay más páginas
        if(curPage === 1 && numPages > 1){
            return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }
        // ultima pagina
        if(curPage === numPages && numPages > 1){
            return `<button data-goto="${curPage - 1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
        }

        // cualquier pagina diferente a la 1 y a la ultima
        if(curPage < numPages){
            return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
          
          <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>`;
        }

        // pagina 1 y no hay más páginas
        return '';
    }
}

export default new PaginationView();