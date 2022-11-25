const BASE_URL_API = 'https://api.rawg.io/api';
const API_KEY = 'fbd8f396d59a418cae32138f9ff036cc';
const MESSAGE_ERROR = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
const StoreHtml = $('#store');

async function getStores() {
    try {
        return await $.ajax({
            url: `${BASE_URL_API}/stores?key=${API_KEY}`,
        });
    } catch (e) {
        alert(MESSAGE_ERROR);
    }       
}

function mapStore(store) {
    const imgurl = store.image_background
                    ? `${store.image_background}" class="card-img-top" style="height: 1000px;`
                    : '' ;
    console.log(store)
    return `<nav id="paginate" class="row justify-content-center">
                <div class="col-lg-6 col-md-12 col-sm-12">
                   <div class="card card-gams mb-3">  
                   
                   
                    <img src="${store.image_background}" 
                    class="card-img-top" style="height: 600px;">
                    <div class="card-body" style="height: 100px">
                        <h4 class="card-title">${store.name}</h4>
                     </nav>
                    </div>
                </div>
            </div>`;
}

$(document).ready(
    async () => {
        const stores = await getStores();
        const { results } = stores;
        StoreHtml.html(results.map(s => mapStore(s)));
    }
);