import React from "react";
import tickBox from "../../images/Asset 1.svg"
import board from "../../images/undraw_scrum_board_cesn.svg"

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
      <section className={"about"}>
        <svg className={"wave-1"} xmlns="http://www.w3.org/2000/svg" width="100%" height="193.958" viewBox="0 0 1920 193.958" preserveAspectRatio="none">
          <path id="Path_29" data-name="Path 29"
                fill="#e54848"
                d="M1920,0H0V71.382c278.522,33.294,468.826,80.724,1060.124,42.809S1920,193.958,1920,193.958"
                transform="translate(0 0)"/>
        </svg>
        <div className={"content-wrapper"}>
          <div className={"content"}>
            <img src={board} />
            <div className={"about-text"}>
              <h1 className={"title"}>What is Agile Management?</h1>
              <h1 className={"info"}>
                In a nutshell, agile management is
                a simple yet powerful tool, with the
                primary goal of helping you gain
                control over your projects.
              </h1>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="193.958" viewBox="0 0 1920 193.958" preserveAspectRatio="none">
          <path id="Path_29" data-name="Path 29"
                fill="#e54848"
                d="M1920,0H0V71.382c278.522,33.294,468.826,80.724,1060.124,42.809S1920,193.958,1920,193.958"
                transform="translate(0 0)"/>
        </svg>
      </section>
      <section className={"get-started"}>
        <h1>Want to get started?</h1>
        <p className={"text"}>
          To get started sign up by clicking the button below. This will register you as an admin and you will also be able to register your organisation. Under your organisation you can create users accounts to give to your team. With your account you can access the dashboard, where you will have the ability to create projects, assign tasks, view the progress of your tasks and more.
        </p>
        <button className={"button"}>Sign Up</button>
      </section>
    </div>
  )
};

export default HomePage