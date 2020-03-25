import React, {FC} from "react";
import Single from "./Single";
import Divider from "../../../Components/Divider";
import _ from "lodash";
import {Time} from "../Project";

interface Props {
  time?: Time[]
}

const TimeLogged: FC<Props> = (props) => {
  return(
    <div className="comments comments-2">

      <h4>Logged Time</h4>
      <div className="comments-box">
        {_.isEmpty(props.time) ? <p>No time logged.</p> : props!.time!.map((time, i) => {
          return(
            <>
              <Single key={`time-${i}`} time={time} />
              {i !== props!.time!.length - 1 && <Divider/>}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default TimeLogged;