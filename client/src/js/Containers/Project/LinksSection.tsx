import React, {FC, useState} from "react";
import LinkComp from "../../Components/LinkComp";
import _ from "lodash";
import functions from "../../../functions";
import {Link} from "react-router-dom";
import ContentLoader from "../../Components/ContentLoader";

interface Props {
  links: LinkType[] | null | undefined,
  projectID: string
}

interface LinkType {
  id: number
  link_name: string,
  link_url: string,
}

const LinksSection: FC<Props> = (props) => {
  const [newLink, setNewLink] = useState(false)
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(false);

  const update = async () => {
    //Update
    const res = await functions.get(`/links/${props.projectID}`);

    if (!functions.apiError(res)) {
      setLinks(res.data.map((link: LinkType) => ({link_name: link.link_name, link_url: link.link_url, id: link.id})))
    }

    setNewLink(false)
  }

  React.useEffect(() => {
    if (props.links) {
      setLinks(props.links)
    }
  }, [])

  return(
    <div className={"links"}>
      <h3>Links</h3>
      {!newLink ? <button onClick={() => setNewLink(true)} className={"button add"}>Add Link</button> : (
        <LinkComp update={update} cancel={() => setNewLink(false)} isNew={true} ProjectID={props.projectID}/>
      )}

      <ContentLoader loading={loading} data={links} message={"No links found."}>
        <>
          {
            links.map((link, i) => {
              return <LinkComp
                key={`link-${i}`}
                name={link.link_name}
                url={link.link_url}
                ProjectID={props.projectID}
                update={update}
                linkID={link.id}
              />
            })
          }
        </>
      </ContentLoader>
    </div>
  )
}

export default LinksSection;