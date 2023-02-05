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
        controller: "movieDetailsController",
      })
      .when("/movie-details/:id", {
        templateUrl: "partials/movieDetails.html",
        controller: "movieDetailsController",
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
      });
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (popularResponse) {
        $scope.latestMovies = popularResponse.data.results;
      });
      $http({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      }).then(function (upcomingResponse) {
        $scope.upcomingMovies = upcomingResponse.data.results;
      });
      $scope.getMovieDetails = function (movie_id) {
        $scope.movieInfo = detailService.getDetails(movie_id);
        $log.info(movieInfo);
      };
    }
  )
  .controller(
    "movieDetailsController",
    function ($scope, $http, $log, $routeParams) {
      $http({
        params: { id: $routeParams.id },
        url:
          "https://api.themoviedb.org/3/movie/" +
          $routeParams.id +
          "?api_key=4f35139a7aeecfe122ffd50f642cd92b",
        method: "GET",
      }).then(function (response) {
        $scope.movieDetail = response.data;
        $log.info($scope.movieDetail);
      });
      $http({
        params: { id: $routeParams.id },
        url:
          "https://api.themoviedb.org/3/movie/" +
          $routeParams.id +
          "/keywords?api_key=4f35139a7aeecfe122ffd50f642cd92b",
        method: "GET",
      }).then(function (response) {
        $scope.movieTags = response.data.keywords;
        $log.info($scope.movieTags);
      });
      // https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=<<api_key>>
      $http({
        params: { id: $routeParams.id },
        method: "GET",
        url:
          "https://api.themoviedb.org/3/movie/" +
          $routeParams.id +
          "/similar?api_key=4f35139a7aeecfe122ffd50f642cd92b&language=en-US&page=1",
      }).then(function (similarMovieResponse) {
        $scope.similarMovies = similarMovieResponse.data.results;
      });
      // https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
    }
  );
