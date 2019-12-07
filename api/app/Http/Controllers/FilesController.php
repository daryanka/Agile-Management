<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilesController extends Controller
{
    var $request;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function upload($id) {
        $this->validate($this->request, [
            "file" => "required|file|max:2048" //2mb max
        ]);

        $fileName = $this->request->file('file')->getClientOriginalName();

        $fileSaveName = time()."-".$fileName;
        $destination_path = './upload/user/';

        if ($this->request->file('file')->move($destination_path, $fileSaveName)) {
            return response(base_path(), 200);
        } else {
            return $this->responseRequestError('Cannot upload file');
        }
    }
}
