import React from "react";


function App(){


    return(
        <>
        <div id="header-container">
            <h1>WELCOME TO COLLEGE</h1>
        </div>
        <nav id="navbar">
            <a class="navlink selected">Students(#)</a>
            <a class="navlink">Campuses(#)</a>
        </nav>
        <div id="students-container">
            <div class="student">
                <div class="student-text">
                    <h2>MOE</h2>
                    <p>Attends Bazz Tech</p>
                    <br/>
                    <a>Details for Moe</a>
                </div>
                <div class="delete-text">
                    <button class="delete-button">Delete</button>
                </div>
            </div>
            <div class="student">
                <div class="student-text">
                    <h2>Thomas </h2>
                    <p>Attends Cornell</p>
                    <br/>
                    <a>Details for Thomas</a>
                </div>
                <div class="delete-text">
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        </div>
        </>

    )
}

export default App;