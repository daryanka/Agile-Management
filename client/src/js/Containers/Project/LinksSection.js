import React, { useState } from "react";
import LinkComp from "../../Components/LinkComp";

const LinksSection = (props) => {
  const [newLink, setNewLink] = useState(false)
  const [links, setLinks] = useState([]);

  const addNew = (name, url) => {
    setLinks(prev => [...prev, {
      name,
      url
    }])

    setNewLink(false)
  }

  React.useEffect(() => {
    setLinks(props.links)
  }, [])
  return(
    <div className={"links"}>
      <h3>Links</h3>
      {!newLink ? <button onClick={() => setNewLink(true)} className={"button add"}>Add Link</button> : (
        <LinkComp addNew={addNew} cancel={() => setNewLink(false)} isNew={true}/>
      )}

      {links.map((link, i) => {
        return <LinkComp key={`link-${i}`} name={link.name} url={link.url} />
      })}
    </div>
  )
}

export default LinksSection;