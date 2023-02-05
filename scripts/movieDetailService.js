/// <reference path="script.js" />
movieApp.factory("detailService", function ($http, $log) {
  return {
    getDetails: function (movie_id) {
      $http({
        method: "GET",
        url:
          "https://api.themoviedb.org/3/movie/" +
          movie_id +
          "?api_key=4f35139a7aeecfe122ffd50f642cd92b",
      })
        .then(function (movieDetailResponse) { 
          $log.info(movieDetailResponse.data);
          return movieDetailResponse.data;
        })
        .catch(console.error);
    },
  };
});
