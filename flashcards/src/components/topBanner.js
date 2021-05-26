import React from 'react';
import WeatherContainer from './topBanner/WeatherContainer';
import LogOut from './LogOut';
import CurrentUser from './CurrentUser';

export default function TopBanner() {

    return (
        <>
        <div className="container row-red"></div>
        <div className="container text-black row-yellow pt1">
            <div className="row">
                <div className="col-sm-8">
                    <h1>Spanish Flashcards</h1>
                    <p className="text-yellow">The greatest flashcard game you will ever play.  Well, kind of.</p>
                </div>
                <div className="col-sm-4">
                    {/* <div className="row">
                        <div className="col-sm-4" style={{marginTop: "25px"}}>
                            City list
                        </div>
                        <div className="col-sm-8">
                            <div className="row"> */}
                                <WeatherContainer />
                            {/* </div>
                        </div>
                    </div> */}
                </div>
            
            <LogOut />
            <CurrentUser />
            </div>
        </div>
        <div className="container row-red"></div>
        </>
    )
}
