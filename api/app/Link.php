<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_id', 'link_name', 'link_url'
    ];

    protected $table = "links";
    protected $primaryKey = "id";
}
