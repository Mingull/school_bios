/**
 * @typedef {{name:string,thumbnail:string,release:number}} Movie
 */
/**
 * @returns {Promise<Movie[]>}
 */
async function loadMovies() {
	/**
	 *  @type {Movie[]}
	 */
	const movies = await fetch("./movies.json").then((res) => res.json());
	return movies;
}

async function renderMovies() {
	const gridElement = document.getElementById("grid");
	const movies = await loadMovies();
	for (const movie of movies) {
		const col = `
		<div class="col card">
			<img class="thumbnail" src="${movie.thumbnail}" alt="${movie.name}">
			<div class="content">
				<p class="title">${movie.name}</p>
				<p class="release">Release year: ${movie.release}</p>
			</div>
		</div>`;
		gridElement.insertAdjacentHTML("beforeend", col);
	}
}

renderMovies();
