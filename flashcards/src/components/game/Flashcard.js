import React from 'react'

export default function Flashcard({text}) {
    return (
        <div className="card selection">
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
}
