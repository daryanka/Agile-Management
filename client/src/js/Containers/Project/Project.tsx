import React, {useState, useRef, FC} from "react";
import Divider from "../../Components/Divider";
import Modal, {ModalRef} from "../../Components/Modal";
import AssignUserModal from "./AssignUserModal";
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

interface MatchParams {
  id: string
}

export interface Time {
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

interface ProjectData {
  project: {
    id: number,
    project_name: string,
    description?: string,
    created_at: string
  },
  comments: Comment[],
  links: {
    link_name: string,
    link_url: string,
  }[],
  users: {
    user_name: string,
    user_id: number
  }[],
  logged_time: Time[]
}

const Project: FC<RouteComponentProps<MatchParams>> = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectData>();
  const assignModalRef = useRef<ModalRef>(null)
  const addTimeModalRef = useRef<ModalRef>(null)

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

  console.log(data);

  return (
    <div className={"project-cont"}>
      <div className={"project-box"}>
        <ContentLoader loading={loading} data={data} message={"Unable to find project."}>
          <>
            <div className={"box-header"}>
              <h3 className={"title"}>{data?.project?.project_name}</h3>
            </div>

            <div className={"box-content"}>
              <div className={"section-1 section"}>
                <div className={"left"}>
                  <ProjectDescription description={data?.project?.description}
                  />

                  <Divider/>

                  <LinksSection links={data?.links} />
                </div>

                <div className={"right"}>

                  <Divider/>

                  <div className={"assign"}>
                    <h4>Assigned to</h4>
                    <p>John Doe</p>
                    <p>John Doe</p>
                    <p>John Doe</p>
                    <p>John Doe</p>
                    <p>Jane Smith</p>
                    <Modal ref={assignModalRef}>
                      <AssignUserModal/>
                    </Modal>
                    <button type={"button"} onClick={() => assignModalRef!.current!.open()} className={"button"}>Add Assignee</button>
                  </div>

                  <Divider/>

                  <div className={"time"}>
                    <h4>Time Estimates</h4>
                    <p><strong>Estimated Time:</strong> 4d 12h 0m</p>
                    <p><strong>Time Spent:</strong> 4d 12h 0m</p>
                    <Modal ref={addTimeModalRef}>
                      <TimeModal/>
                    </Modal>
                    <button onClick={() => addTimeModalRef!.current!.open()} className={"button"}>Add Time</button>
                  </div>
                </div>
              </div>
              <div className="section-2 section">
                <Divider/>

                <DownloadFiles files={[
                  {
                    name: "Wireframe.png",
                    url: "google.com"
                  },
                  {
                    name: "Downloadable File.jpeg",
                    url: "youtube.com"
                  }
                ]}/>

                <Divider/>

                <Tasks/>

                <Divider/>

                <Comments comments={data?.comments}/>

                <Divider/>

                <TimeLogged time={data?.logged_time} />
              </div>
            </div>
          </>
        </ContentLoader>
      </div>
    </div>
  )
};

export default Project