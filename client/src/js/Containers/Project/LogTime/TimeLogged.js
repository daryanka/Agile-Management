import React from "react";
import Single from "./Single";
import Divider from "../../../Components/Divider";

const TimeLogged = () => {
  const [edit, setEdit] = React.useState(null);
  return(
    <div className="comments comments-2">

      <h4>Logged Time</h4>
      <div className="comments-box">
        <Single />
        <Divider/>
        <Single time={"2w 3d"} />
      </div>
    </div>
  )
}

export default TimeLogged