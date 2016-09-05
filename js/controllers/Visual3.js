app.controller('Visual3', ['$scope', '$timeout', 'profile', 'maindata', function ($scope, $timeout, profile, maindata) {
	profile.success(function (data) {
		$scope.details = data;

	});
	//fetching main data
	maindata.success(function (main_data) {
		$scope.data_1 = main_data;

		//filter out non numerical runs
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

		//		function for matches number
		$scope.matches_number = function (data) {
			return data.length
		}

		//		total runs
		$scope.total_runs = function (data) {
			var sum = 0;
			for (var i = 0; i < data.length; i++) {

				filter_runs(data);
				if (isNaN(data[i].batting_score) == false) {
					sum = sum + (data[i].batting_score);

				}

			}

			return sum;

		}

		//		total wickets 
		$scope.total_wickets = function (data) {
			var w_sum = 0;
			for (var i = 0; i < data.length; i++) {
				if (isNaN(data[i].wickets) == false) {
					w_sum = w_sum + data[i].wickets;
				}

			}
			return w_sum;
		}

		//		total wins
		$scope.total_wins = function (data) {
			var k = 0;
			for (var i = 0; i < data.length; i++) {
				if (data[i].match_result == 'won') {
					k++;
				}
			}
			return k;
		}

		//		total 100's
		$scope.centuries = function (data) {
				var c = 0;
				filter_runs(data);
				for (var i = 0; i < data.length; i++) {
					if (data[i].batting_score >= 100) {
						c++;
					}
				}
				return c;
			}
			//		total fifties
		$scope.fifty = function (data) {
			var c = 0;
			filter_runs(data);
			for (var i = 0; i < data.length; i++) {
				if (data[i].batting_score >= 50 && data[i].batting_score < 100) {
					c++;
				}
			}
			return c;
		}

		//		Best Score
		$scope.top_score = function (data) {
			var t = 0,
				k = 0
			filter_runs(data);
			for (var i in data) {
				if (data[i].batting_score > k) {
					k = data[i].batting_score
				}
			}
			return k;
		}


		//		creating data
		$scope.data_comp = [];



		$scope.data_comp.push({
			"name": "Sachin Tendulkar",
			"team": "India",
			"runs": $scope.total_runs($scope.data_1),
			"matches": $scope.matches_number($scope.data_1),
			"top_score": $scope.top_score($scope.data_1),
			"hundreds": $scope.centuries($scope.data_1),
			"fifty": $scope.fifty($scope.data_1)
		}, {
			"name": "Kumar Sangakkara",
			"team": "Sri Lanka",
			"runs": 14234,
			"matches": 404,
			"top_score": 169,
			"hundreds": 25,
			"fifty": 93
		}, {
			"name": "Ricky Ponting",
			"team": "Australia",
			"runs": 13704,
			"matches": 375,
			"top_score": 164,
			"hundreds": 30,
			"fifty": 82
		}, {
			"name": "Mahela Jayawardene",
			"team": "Sri Lanka",
			"runs": 12650,
			"matches": 448,
			"top_score": 144,
			"hundreds": 19,
			"fifty": 77
		}, {
			"name": "Brian Lara",
			"team": "West Indies",
			"runs": 10405,
			"matches": "299",
			"top_score": "169",
			"hundreds": 19,
			"fifty": 63
		}, {
			"name": "Steve Waugh",
			"team": "Australia",
			"runs": 7569,
			"matches": 325,
			"top_score": 120,
			"hundreds": 3,
			"fifty": 45
		}, {
			"name": "Inzamam-ul-Haq",
			"team": "Pakistan",
			"runs": 11739,
			"matches": 448,
			"top_score": 137,
			"hundreds": 10,
			"fifty": 83
		})

	});


}])
