import React from 'react'

export default function ListItem({source, target}) {
    return (
        <div className="row">
            <div className="col-sm-6">
                {source}
            </div>
            <div className="col-sm-6">
                {target}
            </div>
        </div>
    )
}
