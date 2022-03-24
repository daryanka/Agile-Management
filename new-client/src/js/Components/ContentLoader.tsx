import React, {FC} from "react";
import _ from "lodash";

interface Props {
  loading: boolean,
  data: any,
  message?: string
}

const ContentLoader: FC<Props> = (props) => {
  if (props.loading) {
    return (
      <div className={"content-loader-wrapper"}>
        <span className="large-loader"></span>
      </div>
    )
  } else if (_.isEmpty(props.data)) {
    return props.message ? <p className={"no-data-msg"}>{props.message}</p> : <p className={"no-data-msg"}>No data found.</p>;
  } else {
    return <>{props.children}</>;
  }
}

export default ContentLoader;