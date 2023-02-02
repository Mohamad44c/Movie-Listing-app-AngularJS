/// <reference path="angular.min.js" />
/// <reference path="angular-route.min.js" />

var movieApp = angular
  .module("movieModule", ["ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "partials/home.html",
        controller: "movieController",
      })
      .when("/movie-details", {
        templateUrl: "partials/movieDetails.html",
        controller: "movieController",
      })
      .otherwise({
        redirectTo: "/home",
      });
    $locationProvider.html5Mode(true);
  })
  .controller(
    "movieController",
    function ($scope, $http, $log, $location, $anchorScroll, detailService) {
      $scope.scrollTo = function (scrollLocation) {
        $location.hash(scrollLocation);
        $anchorScroll();
      };
      $scope.headerComponent = "header.html";
      $scope.footerComponent = "footer.html";
      $scope.homeComponent = "partials/home.html";
      $scope.movieDetailComponent = "movieDetails.html";
      
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (response) {
        $scope.topRatedMovies = response.data.results;
        // console.log("top rated movies");
        // $log.info(response.data.results);
      });
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (popularResponse) {
        $scope.latestMovies = popularResponse.data.results;
        // console.log("latest movies");
        // $log.info(popularResponse.data.results);
      });
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (upcomingResponse) {
        $scope.upcomingMovies = upcomingResponse.data.results;
        // console.log("upcoming movies");
        // $log.info(upcomingResponse.data.results);
      });
      $scope.getMovieDetails = function (movie_id) {
        $scope.movieInfo = detailService.getDetails(movie_id);
        $log.info(movieInfo);
      };
    }
  )
  .controller("movieDetailsController", function ($scope, $http, $log) {
    console.log("movie details page");
  });
// $http({
//   method: "GET",
//   url:
//     "https://api.themoviedb.org/3/movie/" +
//     movie_id +
//     "?api_key=4f35139a7aeecfe122ffd50f642cd92b",
// })
//   .then(function (movieDetailResponse) {
//     $scope.movieDetails = movieDetailResponse.data;
//     console.log("clicked movie id:" + movie_id);
//     console.log(movieDetails);
//     $log.info(movieDetailResponse.data);
//   })
//   .catch(console.error);
