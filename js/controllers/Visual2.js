app.controller('Visual2', ['$scope', '$timeout', 'profile', 'maindata', function ($scope, $timeout, profile, maindata) {
	profile.success(function (data) {
		$scope.details = data;

	});

	maindata.success(function (main_data) {
		$scope.data_1 = main_data;

		//making data for the result
		$scope.data = [];
		var l = 0,
			w = 0,
			t = 0;
		for (var i in $scope.data_1) {

			if ($scope.data_1[i].match_result == "lost") {
				l++;
			} else if ($scope.data_1[i].match_result == "won") {
				w++;
			} else {
				t++;
			}

		}

		$scope.data.push({
			"Result": "Lost",
			"Numbers": l
		}, {
			"Result": "Won",
			"Numbers": w
		}, {
			"Result": "Tied",
			"Numbers": t
		})

		//creating pie chart
		$scope.$watch("$scope.data", function (newvalue, oldvalue) {

			$timeout(function () {


				var w = 300;
				var h = 300;
				var r = h / 2;
				// defining colors for sections by d3 category
				var color = d3.scale.ordinal()
					.range(["#9C781D", "#FFDE27", "#EEB216"]);




				var vis = d3.select('#chart2').append("svg:svg").data([$scope.data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
				var pie = d3.layout.pie().value(function (d) {
					return d.Numbers;
				});

				// declare an arc generator function
				var arc = d3.svg.arc().outerRadius(r);

				// select paths, use arc generator to draw
				var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
				arcs.append("svg:path")
					.attr("fill", function (d, i) {
						return color(i + 1);
					})
					.attr("d", function (d) {

						return arc(d);
					});

				// adding text
				arcs.append("svg:text").attr("transform", function (d) {
					d.innerRadius = 0;
					d.outerRadius = r;
					return "translate(" + arc.centroid(d) + ")";
				}).attr("text-anchor", "middle").text(function (d, i) {
					return $scope.data[i].Result;
				});

			}, 0.08);
		});
	});
}]);
