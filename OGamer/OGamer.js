const idGamer = new URLSearchParams(window.location.search).get('id');
const GamerHtml = $('#gams');

function getHomePage(homepage) {
    if(!homepage) return '';
    return `<a href="${homepage}" class="card-link">Ir para página de jogos</a>`;
}

function mapGenres(genres) {
    if ( !(genres && genres.length) ) return '';
    const genresBadges = genres.map(g => 
            `<span class="badge badge-light mr-1">${g.name}</span>`
        ).reduce((s1, s2) => s1 + s2);
    return `<p>
                ${genresBadges}
            </p>`;
}

function mapMovie(gamer) {

    
    console.log(mapGenres(gamer.genres));
    const imgurl = gamer.background_image
                    ? `${gamer.background_image}" class="card-img-top" style="height: 1000px;`
                    : '' ;
    return `<div class="card bg-dark text-white">
                <img src="${gamer.background_image}" class="card-img-top" style="height: 1000px;">
                <div class="card-img-overlay">
                    <h1 class="card-title">${gamer.name}</h1>
                    ${mapGenres(gamer.genres)}
                    
                    <p class="card-text">
                        ${ new Date(gamer.released).toLocaleDateString()}
                    </p>
                    <p class="card-text">Avaliação: ${gamer.rating} / 5</p>
                    ${getHomePage(gamer.homepage)}
                </div>
            </div>`;
}

$(document).ready(
    async () => {
        const gams = await getGamerId(idGamer);
        console.log(gams);
        GamerHtml.html((mapMovie(gams)));
    }
);