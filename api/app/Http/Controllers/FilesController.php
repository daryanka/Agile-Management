<?php

namespace App\Http\Controllers;

use App\File;
use App\Traits\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        // Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }
        $this->validate($this->request, [
            "files" => "required",
            "files.*" => "required|file|max:1999" //2mb max
        ]);

        if (!$this->request->file("files")) {
            return response([
                "message" => "Please attach at least one file."
            ],422);
        }

        foreach($this->request->file("files") as $file) {
            $fileName = $file->getClientOriginalName();
            $fileSaveName = time()."-".$fileName;

            Storage::put("/projects/{$id}/{$fileSaveName}", file_get_contents($file));

            file::create([
                "user_id" => $this->request->user->id,
                "project_id" => $id,
                "url" => "projects/{$id}/{$fileSaveName}",
                "file_name" => $fileName,
                "file_save_name" => $fileSaveName
            ]);
        }

        return response("File uploaded", 200);
    }

    public function delete($id) {
        // Delete file from project, but in sql and in storage
        $file = File::find($id);

        if (empty($file)) {
            return response("Unauthorized", 401);
        }

        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $file->project_id)) {
            return response("Unauthorized", 401);
        }

        // Remove from database
        $file->delete();

        $dir = "./public/upload/projectsFiles/{$file->project_id}/{$file->file_save_name}";
        $temp = unlink($dir);

        if ($temp) {
            // Successfully Deleted
            return response("Successfully deleted!", 200);
        } else {
            return response("Something went wrong while trying to delete the file", 500);
        }
    }


    public function downloadFile($id) {
        $f = File::find($id);

        if (empty($f)) {
            return response(["message" => "File not found."],404);
        }

        if (!$this->userBelongsToProject($this->request->user->organisation_id, $f->project_id)) {
            return response("Unauthorized", 401);
        }

        $file = Storage::get($f->url);

        if (empty($file)) {
            return response(["message" => "File not found."],404);
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE); // return mime type ala mimetype extension
        $fileType = "";
        foreach (glob("*") as $filename) {
            $fileType = finfo_file($finfo, storage_path("app/".$f->url)) . "\n";
        }
        finfo_close($finfo);

        return response()->download(storage_path('app/'.$f->url), $f->file_name, [
            "Content-Type" => $fileType
        ]);
    }
}
