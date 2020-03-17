import React from "react";
import {FiEdit3} from "react-icons/Fi";

const Single = (props) => {
  return(
    <div className="comment">
      <p className="comment-title">Daryan Amin - 12 Hours <FiEdit3 onClick={() => props.edit(props.id)} /></p>
      <p className="comment-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  )
};

export default Single;