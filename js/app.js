var Subj = angular.module('Subj', ["ngRoute"]);

Subj.config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when("/", {
                templateUrl : "template/main.html"
            })
            .when("/course/:courseId", {
                templateUrl : "template/course.html"
            })
            .otherwise('/');
    }
]);

Subj.controller('SubjCtrl', ['$scope', '$http', '$window', '$routeParams', function ($scope, $http, $window, $routeParams) {

    var vm = this;

    $scope.params = $routeParams;
    //console.log($scope.params);

    $http.post('http://api.qa.imumk.ru/api/mobilev1/update', {'data':''})
        .then(function (data, status,header, config) {
            vm.SpisokPredmetov = data.data.items;
            //console.log(data.data.items);
        })
        .catch(function (data, status,header, config) {
            vm.ResponseDetails = "Data: " + data+
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });

    vm.subj = [
        {"id":1, option: 'Алгебра'},
        {"id":2, option: 'Английский язык'},
        {"id":3, option: 'Биология'},
        {"id":4, option: 'География'},
        {"id":5, option: 'Геометрия'},
        {"id":6, option: 'Демо-версия'},
        {"id":7, option: 'Естествознание'},
        {"id":8, option: 'Информатика'},
        {"id":9, option: 'История'},
        {"id":10, option: 'Математика'},
        {"id":11, option: 'Обществознание'},
        {"id":12, option: 'Окружающий мир'},
        {"id":13, option: 'Русский язык'},
        {"id":14, option: 'Физика'},
        {"id":15, option: 'Химия'}
    ];

    vm.genre = [
        {"id":1, option: 'Задачник'},
        {"id":2, option: 'Медиа-коллекция'},
        {"id":3, option: 'Рабочая тетрадь'},
        {"id":4, option: 'Тренажер ВПР-2017'},
        {"id":5, option: 'Тренажер ЕГЭ-2016'},
        {"id":6, option: 'Тренажер ЕГЭ-2017'}
    ];

    vm.grade = [
        {"id":1, option: '1'},
        {"id":2, option: '2'},
        {"id":3, option: '3'},
        {"id":4, option: '4'},
        {"id":5, option: '5'},
        {"id":6, option: '6'},
        {"id":7, option: '7'},
        {"id":8, option: '8'},
        {"id":9, option: '9'},
        {"id":10, option: '10'},
        {"id":11, option: '11'}
    ];

    /* Первый вариант вывода изображений, к блочку, в случайном порядке. */
    vm.imgLink = ['https://www.imumk.ru/covers/80.png', 'https://www.imumk.ru/covers/124.png', 'https://www.imumk.ru/covers/61.png', 'https://www.imumk.ru/covers/53.png',
        'https://www.imumk.ru/covers/77.png',  'https://www.imumk.ru/covers/55.png', 'https://www.imumk.ru/covers/68.png', 'https://www.imumk.ru/covers/1617.png',
        'https://www.imumk.ru/covers/74.png', 'https://www.imumk.ru/covers/1614.png', 'https://www.imumk.ru/covers/110.png', 'https://www.imumk.ru/covers/121.png',
        'https://www.imumk.ru/covers/3903.png', 'https://www.imumk.ru/covers/3968.png'];
    vm.rankedList = [];
    angular.forEach(vm.imgLink, function(item) {
        vm.rankedList.push({
            item: item,
            rank: 0.5 - $window.Math.random()
        });
    });

    /* Второй вариант вывода изображений, к блочку, в случайном порядке. */
    /*$scope.imgLink = ['https://www.imumk.ru/covers/98.png', 'https://www.imumk.ru/covers/66.png', 'https://www.imumk.ru/covers/115.png', 'https://www.imumk.ru/covers/3967.png', 'https://www.imumk.ru/covers/1622.png'];
     $scope.random = function() {
     return 0.5 - Math.random();
     };*/

    vm.resultSearch = 'Результаты поиска';
}]);

 /* Директива вывода картинок, к каждому предмету по соответствию. Из массива 'vm.imgLink'. */
Subj.directive('loadImages', function(){
    return {
        restrict: 'E',
        scope: {
            subject: '=subject',
            index: '=index',
            url: '=url',
            width: '=width'
        },
        templateUrl: 'template/loadImages.html',
        link: function(scope, element, attrs) {
            //console.log(scope.url);
            /*scope.imgLink2 = ['https://www.imumk.ru/covers/80.png', 'https://www.imumk.ru/covers/124.png', 'https://www.imumk.ru/covers/61.png', 'https://www.imumk.ru/covers/53.png',
                'https://www.imumk.ru/covers/77.png',  'https://www.imumk.ru/covers/55.png', 'https://www.imumk.ru/covers/68.png', 'https://www.imumk.ru/covers/1617.png',
                'https://www.imumk.ru/covers/74.png', 'https://www.imumk.ru/covers/1614.png', 'https://www.imumk.ru/covers/110.png', 'https://www.imumk.ru/covers/121.png',
                'https://www.imumk.ru/covers/3903.png', 'https://www.imumk.ru/covers/3968.png'];*/
        }
    }
});