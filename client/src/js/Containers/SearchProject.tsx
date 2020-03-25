import React, {FC, useState} from "react";
import Divider from "../Components/Divider";
import Modal from "../Components/Modal";
import CreateProject from "./CreateProject";
import fn from "../../functions";
import {ModalRef} from "../Components/Modal";
import ContentLoader from "../Components/ContentLoader";
import {RouteComponentProps} from "react-router";

const SearchProject: FC<RouteComponentProps> = (props) => {
  const [searchResults, setSearchResults] = useState<{
    project_name: string, description: string, priority?: number, id: number}[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (search?: string) => {
    setLoading(true);
    const res = await fn.get(`/projects/search${search ? `?search=${search}` : ""}`);
    setLoading(false)
    if (!fn.apiError(res)) {
      setSearchResults(res.data);
    }
  }

  const createModal = React.useRef<ModalRef>(null);

  const goToProject = (id: number) => {
    console.log(props.history.push(`/projects/${id}`))
  }

  return(
    <div className={"search-cont"}>
      <Modal ref={createModal}>
        <CreateProject/>
      </Modal>
      <button className={"button"} onClick={() => createModal!.current!.open()}>Create New Project</button>
      <div className={"search-box"}>
        <div className={"box-head"}>
          <div className={"box-content"}>
            <h4 className={"head-title"}>Search Projects</h4>
            <input className={"search-box"} onChange={(e) => fetchData(e.target.value)} />
          </div>
        </div>
        <div className={"box-body"}>
          <ContentLoader loading={loading} data={searchResults} message={"No projects found."}>
            {searchResults.map((item, i) => {
              return(
                <React.Fragment key={`search-item-${i}`}>
                  <div className={"body-element"}>
                    <h4 className={"element-title"} onClick={() => goToProject(item.id)}>{item.project_name}</h4>
                    <h6 className={"element-desc"}>{item.description}</h6>
                  </div>
                  {i !== searchResults.length - 1 && (
                    <Divider width={"95%"} marginAuto />
                  )}
                </React.Fragment>
              )
            })}
          </ContentLoader>
        </div>
      </div>
    </div>
  )
};

export default SearchProject