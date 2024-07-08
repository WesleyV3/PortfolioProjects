import React from "react";
import profilePicture from "./resources/AboutMe_ProfileImage.jpg"

function Home() {
    return (
        <div className="Home">
            <h1> About Me </h1>
            <img src={profilePicture} width="75%" alt="Kaylea Gray"/>
            <p>Thanks for checking in!</p>
            <p>
                At 17-years-old, I started working for my local public library as a clerk/page.
                Since then, I've turned my passion for public libraries and advocating for young adults into my career.
                While completing my degree, I worked for two libraries simultaneously in varying capacities.
                By the time I completed my MSLS with a Concentration in Library & Information Sciences at 22-years-old, 
                I had half-a-decade of experience and moved out of state to achieve my dream of becoming a Teen Services Librarian.
                I now have 7 years of experience in public libraries, 5 of those years being programming roles serving teenagers and young adults specifically.
                I am using this space in a personal capacity to share my services with anyone who seeks them, be it book reviews, programming, or workplace writing.
            </p>
        </div>
    );
}

export default Home;