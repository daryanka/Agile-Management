<?php

namespace App\Http\Controllers;

use App\File;
use App\Traits\Helper;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    use Helper;
    var $request;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware("auth");
    }

    public function upload($id) {
//        Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }
        $this->validate($this->request, [
            "file" => "required|file|max:1999" //2mb max
        ]);

        $fileName = $this->request->file('file')->getClientOriginalName();

        $fileSaveName = time()."-".$fileName;
        $destination_path = "public/upload/projectsFiles/{$id}";

        //Save in files table project_id, upload by user_id, and url

        if ($this->request->file('file')->move($destination_path, $fileSaveName)) {
            File::create([
                "user_id" => $this->request->user->id,
                "project_id" => $id,
                "url" => "http://localhost:8080/public/upload/projectsFiles/{$id}/{$fileSaveName}",
                "file_name" => $fileName
            ]);
            return response("File uploaded", 200);
        } else {
            return response("Unable to upload file", 400);
        }
    }
}
