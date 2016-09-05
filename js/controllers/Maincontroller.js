app.controller('data_ctrl', ['$scope', 'profile', 'maindata', function ($scope, profile, maindata) {

	//	fetching profile data
	profile.success(function (data) {
		$scope.details = data;

	});

	//	fetching main data
	maindata.success(function (main_data) {
		$scope.alldata = main_data;


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

		//		calculate matches number
		$scope.matches_number = function (data) {
			return data.length
		}


		//		calculate total runs
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

		//		calculate total wickets
		$scope.total_wickets = function (data) {
			var w_sum = 0;
			for (var i = 0; i < data.length; i++) {
				if (isNaN(data[i].wickets) == false) {
					w_sum = w_sum + data[i].wickets;
				}

			}
			return w_sum;
		}

		//		calculate total wins
		$scope.total_wins = function (data) {
			var k = 0;
			for (var i = 0; i < data.length; i++) {
				if (data[i].match_result == 'won') {
					k++;
				}
			}
			return k;
		}


		//		calculate 100's
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
	})
}]);
