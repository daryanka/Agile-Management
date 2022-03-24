import React, {FC} from "react";
import Select, {ValueType} from "react-select";
import LoaderBtn from "../../Components/LoaderBtn";
import {useSelector} from "react-redux";
import {RootState} from "../../Store";
import fn from "../../../functions";
import {AssignedUserType} from "./Project";
import {useToasts} from "react-toast-notifications";
import _ from "lodash";

interface Props {
  close?: () => void,
  update: () => void,
  projectID: string,
  users: AssignedUserType[]
}

interface SelectUsers {
  label: string,
  value: number
}

const AssignUserModal: FC<Props> = (props) => {
  const [state, setState] = React.useState<SelectUsers[]>([]);
  const [loading, setLoading] = React.useState(false);
  const users = useSelector((state: RootState) => state.users);
  const {addToast} = useToasts();


  const onChange = (val: any) => {
    if (_.isEmpty(val)) {
      setState([]);
    } else {
      setState(val as SelectUsers[])
    }
  };

  const submit = async () => {
    setLoading(true);
    const res = await fn.post(`/projects/assign/${props.projectID}`, {
      users: _.isEmpty(state) ? [] : state.map(el => el.value)
    })

    setLoading(false);

    if (!fn.apiError(res)) {
      addToast(`Updated assigned users.`, {
        appearance: "success",
        autoDismiss: true,
      })
      props.update();
      props.close!();
    }
  }

  React.useEffect(() => {
    setState(props.users.map(user => ({
      label: user.user_name,
      value: user.user_id
    })))
  }, [])

  return (
    <div className={"assign-wrapper"}>
      <div className="assign-user">
        <h1>Assign To Project</h1>
        <Select
          isMulti
          className={"select-comp"}
          name={"select user"}
          onChange={onChange}
          value={state}
          options={users.users.map(user => ({
          label: user.name,
          value: user.id
        }))}/>
      </div>
      <div className={"modal-buttons-cont"}>
        <div className={"btns"}>
          <button className={"button secondary button-1"} onClick={props.close}>Cancel</button>
          <LoaderBtn disabled={loading} loading={loading} onClick={submit} className={"button-loader button-2"}>
            Confirm
          </LoaderBtn>
        </div>
      </div>
    </div>
  )
}

export default AssignUserModal