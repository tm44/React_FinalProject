import React from 'react'

export default function Flashcard({text, onCardClick, optionId}) {
    
    return (
        <div onClick={() => {onCardClick(optionId);}} className="card selection">
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
}
