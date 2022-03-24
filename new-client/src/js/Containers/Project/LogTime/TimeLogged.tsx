import React, {FC, useState} from "react";
import Single from "./Single";
import Divider from "../../../Components/Divider";
import _ from "lodash";
import {TimeType} from "../Project";
import fn from "../../../../functions";
import ContentLoader from "../../../Components/ContentLoader";

interface Props {
  time?: TimeType[],
  projectID: string
}

const TimeLogged: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [loggedTimes, setLoggedTimes] = useState<TimeType[]>([]);

  const update = async () => {
    setLoading(true);
    const res = await fn.get(`/projects/individual/${props.projectID}`);
    setLoading(false);

    if (!fn.apiError(res)) {
      setLoggedTimes(res.data.project.logged_work);
      console.log("new logged_work", res.data.project.logged_work)
    }
  }

  React.useEffect(() => {
    props.time && setLoggedTimes(props.time)
  }, [])

  return(
    <div className="comments comments-2">

      <h4>Logged Time</h4>
      <div className="comments-box">
        <ContentLoader loading={loading} data={loggedTimes} message={"No time logged"}>
          <>
            {
              loggedTimes.map((time, i) => {
                return(
                  <React.Fragment key={`time-${i}`}>
                    <Single time={time} projectID={props.projectID} update={update} />
                    {i !== loggedTimes.length - 1 && <Divider/>}
                  </React.Fragment>
                )
              })
            }
          </>
        </ContentLoader>
      </div>
    </div>
  )
}

export default TimeLogged;