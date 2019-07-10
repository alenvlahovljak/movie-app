var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", function(req, res){
    var movie = req.query.movie;
    if(movie==undefined)
        res.render("home");
    else{
        var url = "http://www.omdbapi.com/?s=" + movie +"&apikey=thewdb";
        request(url, function(error, response, body){
            if(!error && response.statusCode == 200){
                var movies = JSON.parse(body);
                if(movies.Response==="False")
                    res.render("error", {movies: movies});
                else
                    res.render("movies", {movies: movies});
            }
        });
    }
});;

app.listen(3000, function(){
    console.log("Server has started");
});

