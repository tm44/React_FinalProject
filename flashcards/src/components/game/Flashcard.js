import React, { useState } from 'react';

export default function Flashcard({text, onCardClick, isCorrect, isAnswerCard}) {

    const [hovered, setHovered] = useState(false);

    function toggleHover() {
        setHovered(!hovered);
    }

    return (
        <div onClick={(e) => onCardClick(e, isCorrect, isAnswerCard)}
            className={"card selection " + (hovered ? 'shadow' : '')}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            >
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
}
