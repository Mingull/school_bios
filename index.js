const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

app.use(expressLayouts);
app.set("layout", "./(grid)/layouts/layout");
app.set("views", "./pages");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/grid/", async (req, res) => {
	const movies = await loadMovies();
	res.render("(grid)/index", { movies });
});

app.get("/grid/movie/:slug", async (req, res) => {
	const movies = await loadMovies();

	const movie = movies.find((movie) => movie.slug === req.params.slug);

	res.render("(grid)/movie", { movie });
});

app.listen(port, () => {
	console.log(`App running on http://localhost:${port}`);
});

/**
 * @typedef {{
 *  name:string,
 * 	slug: string,
 * 	summary:string,
 * 	description: string,
 *  thumbnail:string,
 * 	release:number
 * 	}} Movie
 */
/**
 * @returns {Promise<Movie[]>}
 */
async function loadMovies() {
	/**
	 *  @type {Movie[]}
	 */
	const movies = await fetch(`http://localhost:${port}/db/movies.json`).then((res) => res.json());
	return movies;
}
