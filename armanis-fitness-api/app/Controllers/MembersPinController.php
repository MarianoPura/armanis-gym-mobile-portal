<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\MembersPinModel;

class MembersPinController extends BaseController
{   
    public function login($id = null)
{
    $memberModel = model(MembersPinModel::class);
    $requestData = $this->request->getJSON(true);
    $pin = $requestData['pin'] ?? null;

    if (!$id || !$pin) {
        return $this->response->setJSON([
            'success' => false,
            'message' => 'Missing ID or PIN',
        ]);
    }

    $userData = $memberModel->where('id', $id)->first();

    if ($userData) {
        $verified = password_verify($pin, $userData['pin']);
        if ($verified) {
            $this->setUserSession($userData);
            return $this->response->setJSON([
                'success' => true,
                'message' => 'Access Granted',
            ]);
        }
    }

    return $this->response->setJSON([
        'success' => false,
        'message' => 'Invalid ID or PIN',
    ]);
}

    private function setUserSession($id){
        $data = [
            'id' => $id['id'],
            'fname' => $id['fname'],
            'lname' => $id['lname'],
            'user_id' => $id['user_id'],
            'branch_id' => $id['branch'],
            'loggedIn' => true
        ];
        session()->set($data);
        return true;
    }

    public function logout(){
        session()->destroy();
        return $this->response->setJSON([
            'success' => true,
            'message' => 'Account has been logged out'
        ]);
    }

    public function updatePin($id = null){
        if(!$id){
            return $this->response->setJSON([
                'success' => true,
                'message' => 'error. no user logged in'
            ]);
        }

        $memberModel = model(MembersPinModel::class);
        $requestData = $this->request->getJSON(true);

        $userPin = $requestData['pin'];
            
        $hashedPin = password_hash($userPin, PASSWORD_DEFAULT);

        $user = $memberModel->where('id', $id)->first();
        if ($user){
            $memberModel->update($id,['pin' => $hashedPin ]);
            return $this->response->setJSON([
                'success' => true,
                'message' => 'PIN update successful'
            ]);
        }
    }
}
