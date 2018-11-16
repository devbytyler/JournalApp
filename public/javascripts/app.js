angular.module('mood', ['chart.js'])
	.service("ChartService", ["$http", function ($http) {
		return {
			getMyData: async function () {
				var data = []
				await $http.get('/moods').success(function (moods) {
					moods.forEach(mood => {
						data.push(mood.mood)
					});
				});
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
			};

			$scope.getAll = function () {
				return $http.get('/moods').success(function (data) {
					angular.copy(data, $scope.moods);
				});
			};
			$scope.getAll();

			$scope.data = [
				[98, 65, 59, 80, 81, 56, 55, 40, 42]
			];

			$scope.options = {
				title: {
				  display: true,
				  text: 'Amount of Blue Stuff in the Warehouse',
				  fontColor: 'lightblue',
				  fontSize: 16
				},
				scales: {
				  yAxes: [{
					ticks: {
					  beginAtZero: true,
					  min: 0,
					  max: 400
					}
				  }]
				},
			  };

			ChartService.getMyData().then(function(response) {
				console.log(response)
				$scope.data = response
			  }, function(response) {
				console.log("Error: " + response);
			  });


			$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
			
			$scope.onClick = function (points, evt) {
				$scope.data = [9, 6, 5, 8, 8, 5, 5, 4, 4]
			};
			// $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
			// $scope.options = {
			// 	scales: {
			// 		yAxes: [
			// 			{
			// 				id: 'y-axis-1',
			// 				type: 'linear',
			// 				display: true,
			// 				position: 'left'
			// 			},
			// 			{
			// 				id: 'y-axis-2',
			// 				type: 'linear',
			// 				display: true,
			// 				position: 'right'
			// 			}
			// 		]
			// 	}
			// };




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







