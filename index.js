const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = 3000;

app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("layout extractScripts", true);
app.set("views", "./pages");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/:route/", async (req, res, next) => {
	const movies = await loadMovies();
	if (req.params.route === "grid" || req.params.route === "tailwind")
		res.render(`(${req.params.route})/index`, { movies, title: "Spider-scoop", route: req.params.route });
	else res.send("Cannot GET " + req.url);
});

app.get("/:route/movie/:slug", async (req, res, next) => {
	const movies = await loadMovies();
	const actors = await loadActors();

	const movie = movies.find((movie) => movie.slug === req.params.slug);
	const movieActors = actors.filter((actor) => actor.movies.includes(movie.id));

	if (req.params.route === "grid" || req.params.route === "tailwind")
		res.render(`(${req.params.route})/movie`, {
			movie,
			actors: movieActors,
			title: movie.name + " | Spider-scoop",
			route: req.params.route,
		});
	else res.send("Cannot GET " + req.url);
});

app.get("/:route/actor/:slug", async (req, res) => {
	const actors = await loadActors();

	const actor = actors.find((actor) => actor.slug === req.params.slug);

	if (req.params.route === "grid" || req.params.route === "tailwind")
		res.render(`(${req.params.route})/actor`, {
			actor: actor,
			title: actor.name + " | Spider-scoop",
			route: req.params.route,
		});
	else res.send("Cannot GET " + req.url);
});

app.get("/:route/about", (req, res, next) => {
	if (req.params.route === "grid" || req.params.route === "tailwind")
		res.render(`(${req.params.route})/about`, { title: "About | Spider-scoop", route: req.params.route });
	else res.send("Cannot GET " + req.url);
});

app.get("/:route/form", (req, res, next) => {
	if (req.params.route === "grid" || req.params.route === "tailwind")
		res.render(`(${req.params.route})/form`, { title: "Form | Spider-scoop", route: req.params.route });
	else res.send("Cannot GET " + req.url);
});

app.listen(PORT, () => {
	console.log(`App running on http://localhost:${PORT}`);
});

/**
 * @typedef {{
 *  id: int
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
	const movies = await fetch(`http://localhost:${PORT}/db/movies.json`).then((res) => res.json());
	return movies;
}

/**
 * @typedef {{
 *  id: int
 * 	name: String
 * 	slug: String
 * 	thumbnail: String
 * 	description: String
 * 	birthday: String
 * 	movies: int[]
 * 	}} Actor
 */
/**
 * @returns {Promise<Actor[]>}
 */
async function loadActors() {
	/**
	 *  @type {Actor[]}
	 */
	const actors = await fetch(`http://localhost:${PORT}/db/actors.json`).then((res) => res.json());
	return actors;
}
