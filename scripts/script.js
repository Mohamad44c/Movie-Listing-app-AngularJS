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
    function ($scope, $http, $log, $location, $anchorScroll) {
      // scroll to specified section in homepage
      $scope.scrollTo = function (scrollLocation) {
        $location.hash(scrollLocation);
        $anchorScroll();
      };
      $scope.headerComponent = "header.html";
      $scope.footerComponent = "footer.html";
      $scope.homeComponent = "partials/home.html";
      $scope.movieDetailComponent = "movieDetails.html";
      // top rated movies
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (response) {
        $scope.topRatedMovies = response.data.results;
        // console.log("top rated movies");
        // $log.info(response.data.results);
      });
      // latest movies
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (popularResponse) {
        $scope.latestMovies = popularResponse.data.results;
        // console.log("latest movies");
        // $log.info(popularResponse.data.results);
      });
      //api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (upcomingResponse) {
        $scope.upcomingMovies = upcomingResponse.data.results;
        // console.log("upcoming movies");
        // $log.info(upcomingResponse.data.results);
      });
      // get movie details
      $scope.getMovieDetails = function (movie_id) {
        $http({
          method: "GET",
          url:
            "https://api.themoviedb.org/3/movie/" +
            movie_id +
            "?api_key=4f35139a7aeecfe122ffd50f642cd92b",
        }).then(function (movieDetailResponse) {
          $scope.movieDetails = movieDetailResponse.data;
          console.log("clicked movie id:" + movie_id);
          $log.info(movieDetailResponse.data);
          $log.info($scope.movieDetails);
        });
      };
    }
  )
  .controller("movieDetailsController", function ($scope, $http, $log) {
    console.log("movie details page");
  });
