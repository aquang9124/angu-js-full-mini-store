// Module
myApp = angular.module('myApp', ['ngRoute', 'angularMoment']);
	
	myApp.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'partials/dash.html',
			controller: 'dashesController'
		})
		.when('/products', {
			templateUrl: 'partials/products.html',
			controller: 'productsController'
		})
		.when('/orders', {
			templateUrl: 'partials/orders.html',
			controller: 'ordersController'
		})
		.when('/customers', {
			templateUrl: 'partials/customers.html',
			controller: 'customersController'
		})
		.when('/settings', {
			templateUrl: 'partials/settings.html',
			controller: 'settingsController'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
// Services/Factories
myApp.service('locationService', function() {
	this.currentUrl;
});

myApp.factory('customerFactory', ['$http', function($http) {
	var factory = {};
	var customers = [];

	factory.index = function(callback) {
		$http.get('/customers').success(function(output) {
			customers = output;
			callback(customers);
		});
	};

	factory.create = function(customer, callback) {

		$http.post('/customers', { name: customer.name }).then(function error(response) {
			callback(response);
		});
	};

	factory.destroy = function(_id) {
		$http.delete('/customers/' + _id);
	};

	return factory;
}]);

myApp.factory('productFactory', ['$http', function($http) {
	var factory = {};
	var products = [];

	factory.index = function(callback) {
		$http.get('/products').success(function (response) {
			products = response;
			callback(products);
		});
	};

	factory.create = function(product, callback) {

		$http.post('/products', { product_name: product.product_name, qty: product.qty, description: product.description, image_url: product.image_url })
		.then(function error(response) {
			callback(response);
		});
	};
	return factory;
}]);

myApp.factory('orderFactory', ['$http', function($http) {
	var factory = {};
	var orders = [];
	factory.index = function(callback) {
		$http.get('/orders').success(function (response) {
			orders = response;
			callback(orders);
		});
	};

	factory.create = function(order, callback) {

		$http.post('/orders', { customer_name: order.customer_name, order_qty: order.order_qty, product_name: order.product_name })
		.then(function error(response) {
			callback(response);
		});
	};
	return factory;
}]);
// Controllers
myApp.controller('mainController', ['$scope', '$location', 'locationService', function($scope, $location, locationService) {
	$scope.urlPath = locationService;
	
}]);

myApp.controller('dashesController', ['$scope', '$location', 'locationService', 'customerFactory', function($scope, $location, locationService, customerFactory) {
	locationService.currentUrl = $location.url();



}]);

myApp.controller('productsController', ['$scope', '$location', 'locationService', 'productFactory', function($scope, $location, locationService, productFactory) {
	locationService.currentUrl = $location.url();
	$scope.newProduct = {};
	$scope.init = function() {
		productFactory.index(function(data) {
			$scope.products = data;
		});
	};

	$scope.init();

	$scope.create = function() {
		productFactory.create($scope.newProduct, function(errors) {
			$scope.errors = errors.data.errors.product_name;
		});
		$scope.newProduct = {};
		$scope.init();
	};

}]);

myApp.controller('ordersController', ['$scope', '$location', 'locationService', 'productFactory', 'customerFactory', 'orderFactory', function($scope, $location, locationService, productFactory, customerFactory, orderFactory) {
	locationService.currentUrl = $location.url();
	$scope.newOrder = {};
	$scope.init = function() {
		
		customerFactory.index(function(data) {
			$scope.customers = data;
		});

		productFactory.index(function(data) {
			$scope.products = data;
		});
	};

	$scope.show = function() {
		orderFactory.index(function(data) {
			$scope.orders = data;
		});
	};

	$scope.init();
	$scope.show();

	$scope.create = function() {

		orderFactory.create($scope.newOrder, function(errors) {
			$scope.errors = errors;
		});
		$scope.show();
		$scope.newOrder = {};
		
	};

}]);

myApp.controller('customersController', ['$scope', '$location', 'locationService', 'customerFactory', function($scope, $location, locationService, customerFactory) {
	locationService.currentUrl = $location.url();

	$scope.init = function() {
		customerFactory.index(function(data) {
			$scope.customers = data;
		});
	};

	$scope.init();

	$scope.create = function() {
		customerFactory.create($scope.newCustomer, function(errors) {
			$scope.errors = errors.data.errors.name;
		});
		$scope.newCustomer = {};
	};

	$scope.destroy = function(customer) {
		console.log(customer);
		customerFactory.destroy(customer._id);
	};

}]);

myApp.controller('settingsController', ['$scope', '$location', 'locationService', function($scope, $location, locationService) {
	locationService.currentUrl = $location.url();

}]);