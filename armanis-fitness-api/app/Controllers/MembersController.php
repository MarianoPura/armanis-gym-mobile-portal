<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\MembersModel;
use App\Models\FitnessLogsModel;

class MembersController extends BaseController
{

    public function show($id = null)
    {
        $model = model(MembersModel::class);
        if (!$id) {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'no user logged in'
            ]);
        }
        $data = $model->find($id);
        return $this->response->setJSON($data);
    }

    public function logs($id = null){
        $model = model(FitnessLogsModel::class);
        $data = $model->where('user_id', $id)->findAll();
        return $this->response->setJSON($data);
    }
}
