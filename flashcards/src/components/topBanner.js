import React from 'react';
import WeatherContainer from './topBanner/WeatherContainer';
import LogOut from './topBanner/LogOut';
import CurrentUser from './topBanner/CurrentUser';

export default function TopBanner() {

    return (
        <>
        <div className="container row-red"></div>
        <div className="container text-black row-yellow pt1">
            <div className="row">
                <div className="col-sm-8">
                    <h1>Spanish Flashcards</h1>
                    <p className="text-yellow mb-2">The greatest flashcard game you will ever play.  Well, kind of.</p>
                    <CurrentUser /><br />
                    <LogOut />
                </div>
                <div className="col-sm-4">
                    <WeatherContainer />
                </div>

            </div>
        </div>
        <div className="container row-red"></div>
        </>
    )
}
