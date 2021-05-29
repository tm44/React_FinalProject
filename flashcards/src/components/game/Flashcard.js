import React from 'react'

export default function Flashcard({text, onCardClick, isCorrect}) {

    return (
        <div onClick={(e) => onCardClick(e, isCorrect)}
            className="card selection">
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
}
