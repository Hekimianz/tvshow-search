const form = document.querySelector("#searchForm");
const searchBox = document.querySelector("#searchInput")
let userInput = searchBox.value;
const results = document.querySelector("#results-list");



form.addEventListener("submit", async (e) => {
    e.preventDefault();
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    userInput = searchBox.value;
    searchBox.value = "";
    const config = { params: { q: userInput } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows?`, config);
    console.log(res.data);
    addImages(res.data);
})

const addImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const name = document.createElement("span");
            name.classList.add("showName");
            name.textContent = result.show.name;
            const showCard = document.createElement("div");
            showCard.classList.add("showCard");
            const showImg = document.createElement("img");
            const link = document.createElement("a");
            link.href = result.show.url;
            link.target = "_blank";
            showImg.src = result.show.image.medium;
            link.appendChild(showImg);
            showCard.appendChild(name);
            showCard.appendChild(link);
            results.appendChild(showCard);
        }
    }
}