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

myApp.controller('mainController', function($scope, $timeout, personService, card) { 
    
    $scope.card = card;        
    
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

    $scope.openVerify = function () {
        $scope.noRegister = document.getElementById('noRegister');

        if ($scope.hgBox.classList.contains('open') && $scope.hgBox.clientHeight != 90 ) {
            console.log($scope.noRegister)
            $scope.noRegister.style.display = 'flex';
            $scope.noRegister.style.opacity = '0';

            $timeout (() => {
                $scope.noRegister.style.opacity = '1';
            }, 50);
        }
    }

    $scope.clear = function() {
        do {
            card.pop();
        } while (card.length > 0);
        $scope.hgBox = document.getElementById('box');

        console.log($scope.hgBox);

        $scope.hgBox.classList.add('open');
        $timeout (() => {
            $scope.openVerify($scope.noRegister);
        }, 200);
    }

    $scope.deleteItem = function ($event) {
        console.log($event)
        $scope.card.forEach(card => {
            if (card.id == parseInt($event.target.id)) {
                let index = $scope.card.indexOf(card);
                if (index > -1) {
                    $scope.card.splice(index, 1);
                }
            }
        });
    }
       
    $scope.dropdown = function () {
        $scope.dropIcon = document.getElementById('dropIcon');
        $scope.box = document.getElementById('dropBox');
        $scope.noRegister = document.getElementById('noRegister');
        $scope.hgBox = document.getElementById('box');  
        
        if ($scope.dropIcon.classList[0] == 'off') {
            $scope.dropIcon.setAttribute('src', 'assets/images/up.png');
            $scope.dropIcon.classList.remove('off');
            $scope.dropIcon.classList.add('on');
            $scope.hgBox.classList.add('open');

           
            $scope.box.style.display = 'block';
            $scope.box.style.opacity = '0';
            $scope.hgBox.style.height = '700px';
            $timeout (() => {
                $scope.box.style.opacity = '1';
            }, 20)

            if ($scope.card.length == 0) {
                $scope.noRegister.style.opacity = '0';
                $scope.noRegister.style.display = 'flex';
                $timeout(() => {
                $scope.noRegister.style.opacity = '1';
                }, 200);
            }
        } else {
            $scope.dropIcon.setAttribute('src', 'assets/images/down.png');
            $scope.dropIcon.classList.remove('on');
            $scope.dropIcon.classList.add('off');
            $scope.hgBox.classList.remove('open');

            $scope.hgBox.style.height = '90px';

            
            $timeout(() => {
                $scope.box.style.display = 'none';
            }, 1000);
            $scope.box.style.opacity = '0';

            if ($scope.card.length == 0) {
                $timeout(() => {
                    $scope.noRegister.style.display = 'none';
                }, 1000);
                $scope.noRegister.style.opacity = '0';
            }
        }
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

    $scope.clearVar = function () {
        indexPosition = '';
    }

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