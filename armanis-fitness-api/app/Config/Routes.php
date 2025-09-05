<?php

use CodeIgniter\Router\RouteCollection;
use App\Controllers\MembersPinController;
use App\Controllers\MembersController;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('members-portal/(:segment)', [MembersController::class,'index']);
$routes->post('/members-portal-sign-in/(:segment)', [MembersPinController::class,'login']);
$routes->post('/members-update/(:segment)', [MembersPinController::class,'updatePin']);
$routes->get('members/(:segment)', [MembersController::class, 'show']);
$routes->get('logs/(:segment)', [MembersController::class,'logs']);