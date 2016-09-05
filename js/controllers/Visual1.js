app.controller('Visual1', ['$scope', '$timeout', 'profile', 'maindata', function ($scope, $timeout, profile, maindata) {
	profile.success(function (data) {
		$scope.details = data;

	});

	maindata.success(function (main_data) {
		$scope.data_1 = main_data;

		//	making filter funtion to filter out notout runs as they contains * in it and convert to int

		var filter_runs = function (data) {

			for (var i = 0; i < data.length; i++) {

				var a = "";
				if (isNaN(data[i].batting_score)) {

					for (var j = 0; j < data[i].batting_score.length; j++) {

						if (isNaN(data[i].batting_score[j]) == false) {
							a = a + data[i].batting_score[j];
						} else if (isNaN(data[i].batting_score[0])) {
							a = '0'
						}
					}
					data[i].batting_score = parseInt(a);

				}
			}

		}

		//		count number of matches
		$scope.count_matches = function (data, country) {
			var c = 0;
			for (i in data) {
				if (data[i].opposition == country)
					c++;

			}
			return c;
		}

		//	making run made against a particular team
		var versus = function (data, country) {
			var sum = 0;
			filter_runs(data);
			for (var i = 0; i < data.length; i++) {
				filter_runs(data);
				if (isNaN(data[i].batting_score) == false && data[i].opposition == country) {
					sum = sum + data[i].batting_score;

				}
			}
			return sum;
		}




		//				function to find a run against a corresponding team and to store it tonew data
		$scope.data_c = [];
		var a = [];

		var prev_team = '0';
		for (var i in $scope.data_1) {
			var flag = 0;
			for (var j = 0; j <= a.length; j++) {
				if (a[j] == $scope.data_1[i].opposition) {
					flag = 1;
					break;
				}
			}

			if (flag == 0) {
				a[j] = $scope.data_1[i].opposition;
				$scope.data_c.push({
					"batting_score": versus($scope.data_1, $scope.data_1[i].opposition),
					"opposition": $scope.data_1[i].opposition.slice(2)

				});
			}
		}

		//			data-genearted as data_c here

		$scope.$watch("data_c", function (newvalue, oldvalue) {

			$timeout(function () {
				$scope.margin = {
						top: 20,
						right: 30,
						bottom: 30,
						left: 60
					},
					$scope.width = 960 - $scope.margin.left - $scope.margin.right,
					$scope.height = 500 - $scope.margin.top - $scope.margin.bottom;

				// scale to ordinal because x axis is not numerical
				$scope.x = d3.scale.ordinal().rangeRoundBands([0, $scope.width], .2);

				//scale to numerical value by height
				$scope.y = d3.scale.linear().range([$scope.height, 10]);

				$scope.chart = d3.select("#chart")
					.append("svg") //append svg element inside #chart
					.attr("width", $scope.width + (2 * $scope.margin.left) + $scope.margin.right) //set width
					.attr("height", $scope.height + $scope.margin.top + $scope.margin.bottom); //set height
				$scope.xAxis = d3.svg.axis()
					.scale($scope.x)
					.orient("bottom"); //orient bottom because x-axis will appear below the bars

				$scope.yAxis = d3.svg.axis()
					.scale($scope.y)
					.orient("left");


				$scope.x.domain($scope.data_c.map(function (d) {
					return d.opposition
				}));
				$scope.y.domain([0, d3.max($scope.data_c, function (d) {
					return d.batting_score
				})]);

				$scope.bar = $scope.chart.selectAll("g")
					.data($scope.data_c)
					.enter()
					.append("g")
					.attr("transform", function (d, i) {
						return "translate(" + $scope.x(d.opposition) + ", 0)";
					});

				$scope.bar.append("rect")
					.attr("y", function (d) {

						return $scope.y(d.batting_score);
					})
					.attr("x", function (d, i) {
						return $scope.x.rangeBand() + ($scope.margin.left / 4);
					})
					.attr("height", function (d) {
						return $scope.height - $scope.y(d.batting_score);
					})
					.attr("width", $scope.x.rangeBand()); //set width base on range on ordinal data

				$scope.bar.append("text")
					.attr("x", $scope.x.rangeBand() + $scope.margin.left - 12)
					.attr("y", function (d) {
						return $scope.y(d.batting_score) - 10;
					})
					.attr("dy", ".75em")
					.text(function (d) {
						return d.batting_score;
					});

				$scope.chart.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(" + $scope.margin.left + "," + $scope.height + ")")
					.call($scope.xAxis);

				$scope.chart.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + $scope.margin.left + ",0)")
					.call($scope.yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", -55)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Runs Scored");
			}, 0);
		});
	});


}])
