import React, {FC, useState} from "react";
import LinkComp from "../../Components/LinkComp";
import _ from "lodash";

interface Props {
  links: {
    link_name: string,
    link_url: string,
  }[] | null | undefined,
}

const LinksSection: FC<Props> = (props) => {
  const [newLink, setNewLink] = useState(false)
  const [links, setLinks] = useState<{link_name: string, link_url: string}[]>([]);

  const addNew = (name: string, url: string) => {
    setLinks(prev => [...prev, {
      link_name: name,
      link_url: url
    }])

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
        <LinkComp addNew={addNew} cancel={() => setNewLink(false)} isNew={true}/>
      )}

      {_.isEmpty(links) ? <p>No links found.</p> :
        links.map((link, i) => {
          return <LinkComp key={`link-${i}`} name={link.link_name} url={link.link_url} />
        })
      }
    </div>
  )
}

export default LinksSection;