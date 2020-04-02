import React, {useState, FC} from "react";
import Divider from "../../Components/Divider";
import TimeModal from "./TimeModal";
import ProjectDescription from "./ProjectDescription";
import LinksSection from "./LinksSection";
import DownloadFiles from "./DownloadFiles";
import Tasks from "./Tasks";
import Comments from "./Comments/Comments";
import TimeLogged from "./LogTime/TimeLogged";
import {RouteComponentProps} from "react-router";
import fn from "../../../functions";
import ContentLoader from "../../Components/ContentLoader";
import ProjectTitle from "./ProjectTitle";
import AssignUsers from "./AssignUsers";
import TimeComp from "./Time";

interface MatchParams {
  id: string
}

export interface TimeType {
  id: number,
  minutes_logged: number,
  description: string,
  name: string
}

export interface Comment {
  id: number,
  user_id: number,
  comment_text: string,
  name: string
}

export interface FileType {
  id: number,
  file_name: string,
}

export interface User {
  id: number,
  name: string,
}

export interface Task {
  id: number,
  title: string,
  description?: string,
  user_id?: number,
  user_name?: string,
  status: number
}

export interface AssignedUserType {
  user_name: string,
  user_id: number
}

interface ProjectData {
  project: {
    id: number,
    project_name: string,
    description?: string,
    created_at: string
    comments: Comment[],
    links: {
      id: number,
      link_name: string,
      link_url: string,
    }[],
    users: AssignedUserType[],
    logged_work: TimeType[],
    files: FileType[],
    tasks: Task[]
  }
  all_users: User[],
  time_logged: string
}

const Project: FC<RouteComponentProps<MatchParams>> = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectData>();

  React.useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setLoading(true);
    const res = await fn.get(`/projects/individual/${props.match.params.id}`);

    if (!fn.apiError(res)) {
      setData(res.data)
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  return (
    <div className={"project-cont"}>
      <div className={"project-box"}>
        <ContentLoader loading={loading} data={data} message={"Unable to find project."}>
          <>
            <div className={"box-header"}>
              <ProjectTitle title={data?.project.project_name} projectID={props.match.params.id}/>
            </div>

            <div className={"box-content"}>
              <div className={"section-1 section"}>
                <div className={"left"}>
                  <ProjectDescription description={data?.project?.description} projectID={props.match.params.id}/>

                  <Divider/>

                  <LinksSection links={data?.project.links} projectID={props.match.params.id} />
                </div>

                <div className={"right"}>

                  <Divider/>

                  <AssignUsers projectID={props.match.params.id} users={data?.project.users}/>

                  <Divider/>

                  <TimeComp fetchData={fetchData} time={data?.time_logged} projectID={props.match.params.id} />
                </div>
              </div>
              <div className="section-2 section">
                <Divider/>

                <DownloadFiles files={data?.project.files} project_id={data?.project.id}/>

                <Divider/>

                <Tasks tasks={data?.project.tasks} id={props.match.params.id}/>

                <Divider/>

                <Comments comments={data?.project.comments} projectID={props.match.params.id}/>

                <Divider/>

                <TimeLogged time={data?.project.logged_work} projectID={props.match.params.id} />
              </div>
            </div>
          </>
        </ContentLoader>
      </div>
    </div>
  )
};

export default Project