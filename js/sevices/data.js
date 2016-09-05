app.factory('maindata', ['$http', function ($http) {
	return $http.get('/Socialcops-sachin/js/data/data.json').success(function (main_data) {
			return main_data;
		})
		.error(function (err) {
			return err;
		});
}]);