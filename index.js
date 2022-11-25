const currentPage = new URLSearchParams(window.location.search).get('page');
const gamesHtml = $('#games');
const paginateHtml = $('#paginate');
const searchInput = $('#searchInput');
const searchResult = $('#searchResult');
var currentGame = 2;

function cardGames(games) {
    return `<div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card card-gams mb-3">
                    <img src="${games.background_image}" class="card-img-top" style="height: 142.3px;">
                    <div class="card-body" style="height: 180px;">
                        <h5 class="card-title">${games.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            ${new Date(games.released).toLocaleDateString()}
                        </h6>
                        <p 
                            class="card-text"
                            style="text-overflow: ellipsis;  overflow: hidden;">
                            ${games.rating}
                           
                            </p>
                            
                            <a href="OGamer/?gameId=${games.id}"style="color:#00abae" onclick="currentGame = ${games.id}" class="verMais">Ver mais...</a>
                    </div>
                </div>
            </div>`;
}

function getPaginate(currentPage, total_pages) {
    const firstPage = 1;
    const nextPage = total_pages > currentPage ? currentPage + 1 : null;
    const previousPage = currentPage > firstPage ? currentPage - 1 : null;
    const diff_endPage_nextPage = nextPage ? total_pages - nextPage : 0;
    const diff_previousPage_firstPage = previousPage ? previousPage - firstPage : 0;
    let innerUl = '';

    if (previousPage) {
        innerUl += `<li class="page-item">
                    <a href="?page=${previousPage}" class="page-link">
                        <span aria-hidden="true">&laquo</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>`;
    }

    if (currentPage > firstPage) {
        innerUl += `<li class="page-item">
                        <a href="?page=${firstPage}" class="page-link">${firstPage}</a>
                    </li>`;
    }

    if (diff_previousPage_firstPage >= 1) {
        innerUl += `<li class="page-item page-link">
                        ...
                    </li>`;
    }

    innerUl += `<li class="page-item active">
                    <a href="?page=${currentPage}" class="page-link">${currentPage}</a>
                </li>`;

    if (diff_endPage_nextPage >= 1) {
        innerUl += `<li class="page-item page-link">
                        ...
                    </li>`;
    }

    if (currentPage < total_pages) {
        innerUl += `<li class="page-item">
                        <a href="?page=${total_pages}" class="page-link">${total_pages}</a>
                    </li>`;
    }

    if (nextPage) {
        innerUl += `<li class="page-item">
                    <a href="?page=${nextPage}" class="page-link">
                        <span aria-hidden="true">&raquo</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>`;
    }


    return `<ul class="pagination">
                ${innerUl}
            </ul>`;
}

function toggleToSearch() {
    searchResult.show();
    $('#destaque').hide();
}

function toggleToGamers() {
    $('#destaque').show();
    searchResult.hide();
}

function showGamers(response) {
    $('#destaque').show();
    let url = response.next;
    console.log(url)
    let index = url.search('page');
    let page = url.substring(index + 5) - 1 
    const { count, results } = response;
    gamesHtml.html(results.map(r => cardGames(r)));
    paginateHtml.html(getPaginate(page, count));
}

function showSearchResults(response) {
    const { results } = response;
    searchResult.html(results.map(r => cardGames(r)));
    toggleToSearch();
}

let input;
searchInput.on('input', (e) => {
    clearTimeout(input);
    if (e.target.value) {
        input = setTimeout(
            async () => {
                showSearchResults(await searchGamers(e.target.value));
            },
            700);
    } else {
        toggleToGamers();
    }
});

$(document).ready(
    async () => showGamers((await getGamers(currentPage)))
);