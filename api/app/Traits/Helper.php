<?php

namespace App\Traits;

use App\Project;

trait Helper {
    /**
     * @param $userOrganisationId
     * @param $projectId
     * @return bool
     */
    public function userBelongsToProject($userOrganisationId, $projectId) {
        $project = Project::find($projectId);

        if (!$project || empty($project)) {
            return false;
        }

        if ($userOrganisationId !== $project->organisation_id) {
            return false;
        } else {
            return true;
        }
    }
}

