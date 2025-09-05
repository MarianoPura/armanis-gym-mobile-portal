<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class MembersPortalController extends BaseController
{
    public function index($id = null){
        return view('mobile-portal/index', ['id' => $id]);
    }
}
