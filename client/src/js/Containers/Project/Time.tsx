import React, {FC, useRef, useState} from "react";
import ContentLoader from "../../Components/ContentLoader";
import Modal, {ModalRef} from "../../Components/Modal";
import TimeModal from "./TimeModal";
import fn from "../../../functions";

interface Props {
  projectID: string,
  time?: string
}

const Time: FC<Props> = (props) => {
  const [time, setTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const addTimeModalRef = useRef<ModalRef>(null)

  React.useEffect(() => {
    setTime(props.time ? parseInt(props.time)  : 0)
  }, [])

  const update = async () => {
    setLoading(true);
    const res = await fn.get(`/projects/individual/${props.projectID}`);
    setLoading(false);

    if (!fn.apiError(res)) {
      setTime(parseInt(res.data.time_logged));
    }
  }

  return (
    <div className={"time"}>
      <Modal ref={addTimeModalRef}>
        <TimeModal update={update}/>
      </Modal>
      <ContentLoader loading={loading} data={["test"]}>
          <h4>Time Estimates</h4>
          <p><strong>Time Spent:</strong> 4d 12h 0m</p>
      </ContentLoader>
      <button onClick={() => addTimeModalRef!.current!.open()} className={"button"}>Add Time</button>
    </div>
  )
}

export default Time;