/// <reference path="angular.min.js" />

// creat the module
var myApp = angular
  .module("myModule", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "homepage.html",
        controller: "movieController",
      })
      .when("/movie-details", {
        templateUrl: "partials/movieDetails.html",
        controller: "movieDetailsController",
      });
  })
  .controller("movieController", function ($scope, $http, $log) {
    $scope.headerComponent = "header.html";
    $scope.footerComponent = "footer.html";
    // top rated movies
    $http({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated?api_key=4f35139a7aeecfe122ffd50f642cd92b",
    }).then(function (response) {
      $scope.topRatedMovies = response.data.results;
      console.log("top rated movies");
      $log.info(response.data.results);
    });
    // latest movies
    $http({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?api_key=4f35139a7aeecfe122ffd50f642cd92b",
    }).then(function (popularResponse) {
      $scope.latestMovies = popularResponse.data.results;
      console.log("latest movies");
      $log.info(popularResponse.data.results);
    });
    //api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
    $http({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming?api_key=4f35139a7aeecfe122ffd50f642cd92b",
    }).then(function (upcomingResponse) {
      $scope.upcomingMovies = upcomingResponse.data.results;
      console.log("upcoming movies");
      $log.info(upcomingResponse.data.results);
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
        console.log("id:" + movie_id);
        $log.info(movieDetailResponse.data);
      });
    };
  });
