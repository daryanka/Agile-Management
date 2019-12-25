import React from "react";
import tickBox from "../../images/Asset 1.svg"

const HomePage = () => {
  return (
    <div className={"homepage"}>
      <section className={"main"}>
        <div className={"text"}>
          <h1>Project management made <span className={"key"}>easy</span></h1>
          <h2>Effortlessly manage your teams</h2>
          <h2>Assign tasks with a simple drag and drop</h2>
          <h2>Track project progress and time spent</h2>
        </div>
        <div className={"image"}>
          <img src={tickBox} />
        </div>
      </section>
    </div>
  )
};

export default HomePage