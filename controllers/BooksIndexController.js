angular.module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject=['$http'];
function BooksIndexController( $http ) {
  var vm = this;
  vm.newBook = {};
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books'
  }).then(function onBooksIndexSuccess(response){
    vm.books = response.data.books;
  }, function onError(error){
    console.log('there was an error: ', error);
  });

  vm.createBook = function(){
    $http({
      method: 'POST',
      url: 'https://super-crud.herokuapp.com/books',
      data: vm.newBook,
    }).then(function successNewBook(response){
      vm.newBook.push(response.data.books);
    }, function errorNewBook(response){
      console.log('Error posting new book', response);
    });
  };
}
