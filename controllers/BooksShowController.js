angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;
  var bookId = $routeParams.id;
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books/'+bookId
  }).then(function onBookShowSuccess(response){
    vm.book = response.data;
  }, function onError(error){
    console.log('there was an error: ', error);
  });

  vm.updateBook = function(bookToUpdate) {
    console.log('updating book: ', bookToUpdate);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/' + bookToUpdate._id,
      data: {
        title : bookToUpdate.title,
        author : bookToUpdate.author,
        image : bookToUpdate.image,
        releaseDate : bookToUpdate.releaseDate
      }
    }).then(function onBookUpdateSuccess(response){
      vm.book = response.data;
      $location.path('/');
    }, function onBookUpdateFail(response){
      console.log('There was an error updating');
    });
  };

  vm.deleteBook = function(book) {
    console.log('deleting book: ', book);
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(onBookDeleteSuccess, onError);

    function onBookDeleteSuccess(response){
      console.log('book delete response data:', response.data);
      $location.path('/');
    }
  };
}
