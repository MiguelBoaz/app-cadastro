// MODULE
const myApp = angular.module('myApp', ['ngRoute']);

//ROUTE
myApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/cadastroscreen.html',
        controller: 'mainController'
    })
    
    .when('/teste/:num', {
        templateUrl: 'pages/teste.html',
        controller: 'mainController'
    })

})

//OBJECT
class Person {
    constructor(name, occupation, age, id, description) {
        this.name = name;
        this.occupation = occupation;
        this.age = age;
        this.id = id;
        this.description = description;
    }
}

// CONTROLLERS
myApp.factory('personService', function() {
    return Person;
});

myApp.value('card', [
    { name: 'Kelita Q. V. S.', occupation: 'Professora', age: 51, id: 72, description: ''},
    { name: 'Pâmela Q. V. S.', occupation: 'Designer', age: 25, id: 99, description: ''},
    { name: 'Toni Carlo Schroeder', occupation: 'Pintor', age: 54, id: 69, description: ''},
    { name: 'Miguel Boaz Q. V. S.', occupation: 'Auxiliar de programação', age: 22, id: 1, description: ''}
]);

myApp.value('feedbackItens', {
    noRegister: null,
    dropIcon: null,
    dropBox: null,
    boxGeral: null,
    scrollEffect: null
});

myApp.directive('initFeedbackItens', function(feedbackItens) {
    return {
        restrict: "A",
        link: function(scope, element) {
            feedbackItens.noRegister = document.getElementById('noRegister');
            feedbackItens.dropIcon = document.getElementById('dropIcon');
            feedbackItens.dropBox = document.getElementById('dropBox');
            feedbackItens.boxGeral = document.getElementById('box');
            feedbackItens.scroll = document.getElementById('scrollEffect');
        }
    };
});

myApp.controller('mainController', function($scope, $timeout, personService, card, feedbackItens) { 
    
    $scope.card = card;
    $scope.feedbackItens = feedbackItens;
    $scope.allIds = [72, 99, 69, 1];

    let idComplement = 1;

    $scope.obj = function() {
        if (!$scope.name || !$scope.occupation || !$scope.age) {
            document.querySelector('.alert').style.opacity = '1';
            document.querySelector('.alert').style.bottom = '10px';
        } else {
            
            document.querySelector('.alert').style.opacity = '0';
            let id;
    
            do {
    
                id = Math.floor(Math.random() * 100) + idComplement++;
    
            } while ($scope.allIds.includes(id));
    
            $scope.person = new personService($scope.name, $scope.occupation, parseInt($scope.age), parseInt(id));
            $scope.card.push($scope.person);
            $scope.name = '';
            $scope.occupation = '';
            $scope.age = '';
        }
    }

    let verify = setInterval (() => {
        try {
            if ($scope.card.length > 0 &&  $scope.feedbackItens.noRegister != null || $scope.feedbackItens.dropIcon.classList[0] == 'off') {
                $scope.feedbackItens.noRegister.style.display = 'none';
            } else if  ($scope.feedbackItens.noRegister != null) {
                $scope.feedbackItens.noRegister.style.display = 'flex';
                $scope.feedbackItens.noRegister.style.opacity = '0';

                $timeout (() => {
                    $scope.feedbackItens.noRegister.style.opacity = '1';
                }, 50);
                clearInterval(verify);
            }
        } catch (e) {
            console.log('Brabo');
        }
        });

    $scope.clear = function() {
        do {
            card.pop();
        } while (card.length > 0);
    }

    $scope.deleteItem = function ($event) {
        console.log($event)
        $scope.card.forEach(card => {
            if (card.id == parseInt($event.target.classList[0])) {
                let index = $scope.card.indexOf(card);
                if (index > -1) {
                    $scope.card.splice(index, 1);
                }
            }
        });

        console.log($scope.feedbackItens.noRegister);

        if ($scope.card.length == 0) {
            console.log("oi");
            
    }
    }
       
    $scope.dropdown = function () {
        console.log('aloha');
        
        if ( $scope.feedbackItens.dropIcon.classList[0] == 'off') {
            $scope.feedbackItens.dropIcon.setAttribute('src', 'assets/images/up.png');
            $scope.feedbackItens.dropIcon.classList.remove('off');
            $scope.feedbackItens.dropIcon.classList.add('on');

            $scope.feedbackItens.boxGeral.style.transition = '1s';
            $scope.feedbackItens.dropBox.style.display = 'block';
            $scope.feedbackItens.dropBox.style.opacity = '0';
            $scope.feedbackItens.boxGeral.style.height = '700px';
            $timeout (() => {
                $scope.feedbackItens.dropBox.style.opacity = '1';
            }, 20)

            if ($scope.card.length == 0) {
                $scope.feedbackItens.noRegister.style.opacity = '0';
                $scope.feedbackItens.noRegister.style.display = 'flex';
                $timeout(() => {
                $scope.feedbackItens.noRegister.style.opacity = '1';
                }, 200);
            }
        } else {
            $scope.feedbackItens.dropIcon.setAttribute('src', 'assets/images/down.png');
            $scope.feedbackItens.dropIcon.classList.remove('on');
            $scope.feedbackItens.dropIcon.classList.add('off');

            $scope.feedbackItens.boxGeral.style.transition = '1s';
            $scope.feedbackItens.boxGeral.style.height = '65px';

            
            $timeout(() => {
                $scope.feedbackItens.dropBox.style.display = 'none';
            }, 1000);
            $scope.feedbackItens.dropBox.style.opacity = '0';

            if ($scope.card.length == 0) {
                $timeout(() => {
                    $scope.feedbackItens.noRegister.style.display = 'none';
                }, 1000);
                $scope.feedbackItens.noRegister.style.opacity = '0';
            }
        }
    }

    $scope.openWidget = function () {
        console.log('ahola');
        angular.element(document.getElementById('box')).ready(function () {
            if (window.innerWidth < 991) {  
                $scope.feedbackItens.dropIcon.setAttribute('src', 'assets/images/up.png');
                $scope.feedbackItens.boxGeral.style.height = '700px';
                $scope.feedbackItens.dropBox.style.display = 'block';
                $scope.feedbackItens.dropIcon.classList.remove('off');
                $scope.feedbackItens.dropIcon.classList.add('on');
            }
        });
    }

    $scope.search = function () {
        document.querySelectorAll('.box').forEach((card) => {
            let tempText = card.querySelector('.name').innerText;
            
            if (!tempText.includes($scope.searchText.toUpperCase())) {
                card.style.display = 'none';
            } else if (tempText.includes($scope.searchText.toUpperCase())) {
                card.style.display = 'block';
            } 
        });
    }

});

myApp.controller('childController', function($scope, card, $routeParams){
    $scope.card = card;
    $scope.editImg = document.getElementById('edit');
    console.log($scope.editImg.classList[0]);
    
    $scope.edit = function () {
        if ($scope.editImg.classList[0] == 'off') {
            $scope.editImg.setAttribute('src', 'assets/images/unedit.png');
            $scope.editImg.classList.add('on');
            $scope.editImg.classList.remove('off');
        } else {
            $scope.editImg.setAttribute('src', 'assets/images/edit.png');
            $scope.editImg.classList.add('off');
            $scope.editImg.classList.remove('on');
        }
    };
    let indexPosition;

    $scope.card.forEach (card => {

        if($routeParams.num == card.id) {
            console.log($routeParams.num == card.id);
            console.log(card.name);
            $scope.name = card.name;  
            $scope.age = card.age;
            $scope.occupation =  card.occupation;
            $scope.description = card.description;
            indexPosition = $scope.card.indexOf(card);
            return;
        }
    });

    $scope.changeNotification = function () {
        document.querySelector('.changesCard').style.opacity = '1';

        setTimeout(() => {
            document.querySelector('.changesCard').style.opacity = '0';
        }, 3000);
    }

    $scope.sendChange = function () {
        console.log(indexPosition);
        $scope.card[parseInt(indexPosition)].name = $scope.name;
        $scope.card[parseInt(indexPosition)].age = parseInt($scope.age);
        $scope.card[parseInt(indexPosition)].occupation = $scope.occupation;
        $scope.card[parseInt(indexPosition)].description = $scope.description;

        $scope.editImg.setAttribute('src', 'assets/images/edit.png');
        $scope.editImg.classList.add('off');
        $scope.editImg.classList.remove('on');

        $scope.changeNotification();
    }
});