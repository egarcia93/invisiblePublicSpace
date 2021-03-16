(function () {

    //credit: https://www.youtube.com/watch?v=lPr60pexvEM

    var width = 500;
    var height = 500;

    var genres = [];
    var cultures = [];

    var svg = d3.select("#dataviz")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)")
    //.attr("transform", "translate(" + width / 4 + "," + height / 4 + ")")

    var radiusScale = d3.scaleSqrt().domain([1, 24]).range([10, 100])
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function (d) {
            return radiusScale(d.frequency) + 1;
        }))

    d3.queue()
        .defer(d3.csv, "radios2.csv")
        //.defer(d3.json, "json/radios.json")
        .await(ready)


    function ready(error, datapoints) {
        var entries = datapoints;

        for (var i = 0; i < entries.length; i++) {
            genres.push(entries[i].genre);
            cultures.push(entries[i].culture);
        }

        var circles = svg.selectAll(".genre")
            .data(datapoints)
            .enter().append("circle")
            .attr("class", "genre")
            .attr("r", function (d) {
                return radiusScale(d.frequency)
            })
            .attr("fill", "darkred")
            .attr("cx", 100)
            .attr("cy", 300)
            .on('click', function (d) {
                var genreIndex = entries.indexOf(d);
                var cultureIndex = entries.indexOf(d);
                console.log(genreIndex);
                document.getElementById("Cultures").innerHTML = cultures[cultureIndex];
                document.getElementById("Genre").innerHTML = genres[genreIndex];
            })
        // .append('Genre')
        // .text((item) => {
        //     return item;
        // })


        simulation.nodes(datapoints)
            .on('tick', ticked)
        console.log(datapoints)

        function ticked() {
            circles
                .attr("cx", function (d) {
                    return d.x
                })
                .attr("cy", function (d) {
                    return d.y
                })
        }

    }


})();