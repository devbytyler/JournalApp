angular.module('mood', ['chart.js'])
	.service("ChartService", ["$http", function ($http) {
		return {
			getMyData: async function () {
				var data = {
					moods: [],
					labels: []
				}
				await $http.get('/moods').success(function (moods) {
					moods.forEach(mood => {
						data.moods.push(mood.mood)
						data.labels.push(mood.datetime)
					});
				});
				console.log("DATA", data)
				return data
			}
		};
	}])
	.controller('MainCtrl', [
		'$scope', '$http', 'ChartService',
		function ($scope, $http, ChartService) {
			$scope.moods = [];
			$scope.addMood = function () {
				var newmood = { mood: $scope.mood, datetime: new Date(), notes: $scope.notes };
				$scope.mood = '';
				$scope.date = '';
				$scope.notes = '';

				$http.post('/moods', newmood).success(function (data) {
					$scope.moods.push(data);
				});
				$scope.getAll();
			};

			$scope.getAll = function () {
				ChartService.getMyData().then(function (response) {
					console.log("RESPONSE", response)
					$scope.data = [response.moods]
					$scope.labels = response.labels
					console.log("SCOPE", $scope.data, $scope.labels )
				}, function (response) {
					console.log("Error: " + response);
				});
				return $http.get('/moods').success(function (data) {
					angular.copy(data, $scope.moods);
				});
			};
			$scope.getAll();

			Chart.defaults.global.defaultFontColor = 'white';
			Chart.defaults.global.defaultFontSize = 14;

			$scope.labels = [];
			// $scope.series = ['Series A'];
			// $scope.data = [
			// 	[10, 20, 34, 78, 40, 90, 120, 256, 320, 340, 310, 355]
			// ];
			$scope.datasetOverride = [{
				label: "Mood",
				fill: true,

				backgroundColor: "rgba(200,150,255,0.1)",
				pointBorderColor: "rgba(255,255,255,1)"
			}];
			$scope.onClick = function (points, evt) {
				console.log(points, evt);
			};
			$scope.options = {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							min: 0,
							max: 10
						}
					}],
					// xAxes: [{
					// 	type: 'time',
					// 	time: {
					// 		unit: 'month'
					// 	}
					// }]
				},
			};

			// $scope.upvote = function(mood) {
			//   return $http.put('/moods/' + mood._id + '/upvote')
			//     .success(function(data){
			//       console.log("upvote worked");
			//       mood.upvotes = data.upvotes;
			//     });
			// };
			// $scope.incrementUpvotes = function (mood) {
			// 	$scope.upvote(mood);
			// };

		}
	]);