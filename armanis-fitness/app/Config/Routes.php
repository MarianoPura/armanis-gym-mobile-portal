<?php

use CodeIgniter\Router\RouteCollection;
use App\Controllers\MembersPortalController;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('mobile-portal/(:segment)', [MembersPortalController::class, 'index']);
