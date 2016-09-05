app.factory('profile', ['$http', function ($http) {
	return $http.get('/Socialcops-sachin/js/data/Sachin-details.json').success(function (data) {
			return data;
		})
		.error(function (err) {
			return err;
		});
}]);