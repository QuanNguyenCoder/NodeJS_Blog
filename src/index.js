const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const route = require("./routes");
const db = require("./config/db");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middlewares/SortMiddleware");

const app = express();
const port = 3000;

app.use(methodOverride("_method"));

//Connect db
db.connect();

//Morgan loggers
// app.use(morgan('combined'))

//middleware
app.use(
  express.urlencoded({
    extended: true,
  })
); //Post method
app.use(express.json()); //XMLHttpRequest, fetch, axios, etc

//Static files
app.use(express.static(path.join(__dirname, "public")));

//custom middleware
app.use(sortMiddleware);

//Template engines
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
    	sum: (a, b) => a + b,
    	sortable: (field, sort) => {
			const sortType = field === sort.column ? sort.type: 'default';
			const iconClasses = {
				default: 'oi oi-elevator', 
				asc: 'oi oi-sort-ascending',
				desc: 'oi oi-sort-descending',
			};
			const types = {
				default: 'desc',
				asc: 'desc',
				desc: 'asc',
			}
			const iconClass = iconClasses[sortType];
			const type = types[sortType];

			return `<a href="?_sort&column=${field}&type=${type}">
						<span class="${iconClass}"></span>
					</a>`
		},
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
