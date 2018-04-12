(function() {
    angular.module('app', [])
        .controller('AppController', AppController);
    AppController.$inject = ['$http', '$rootScope'];
    function AppController($http, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.user = {};
        vm.send = send;
        vm.message = "";
        vm.messages = [];
        vm.username = "";
        vm.password = "";
        vm.isLogin = false;
        vm.searchKey = "";
        vm.search = search;
        vm.client = {};
        var count = 0;
        vm.connected = false;
        var socket = io.connect('https://bot-dev5.tmjp.jp');

        vm.$onInit = function() {
            socket.on('action', function(data) {
                switch (data.type) {
                    case 'RECEIVE_NEW_MESSAGE':
                        console.log(data);
                        $rootScope.$evalAsync(function() {
                            vm.messages.push(data.payload.messages[0])
                            console.log('RECEIVE_NEW_MESSAGE', vm.messages);
                        });
                        
                        break;
                }
            });
        }

        function login() {
            console.log('Username:', vm.username);
            console.log('Password:', vm.password);
            $http.post('/login', {username: vm.username, password: vm.password}).then(function(res) {
                console.log(res.data);
                
                if (res.data) {
                    vm.isLogin = true;
                    vm.user = res.data;
                    socket.emit('start', vm.user);
                }
                
            });
        }

        function send() {
            count++;
            var messages = {
                text: vm.message,
                user: vm.user,
                _id: count
            };

            var data = {
                messages,
                client: vm.client,
                user: vm.user
            }

            console.log(data);
            vm.message = '';
            vm.messages.push(messages);
            socket.emit('NEW_MESSAGE', data);
        }

        function search() {
            $http.get('/search-contacts', {params: {key: vm.searchKey}}).then((res)=>{
                console.log(res.data);
                if (res.data.length) {
                    vm.client = res.data[0];
                    vm.connected = true;
                } else {
                    alert('User does not exist');
                    vm.connected = false;
                }
                
            });
        }

    }
})();