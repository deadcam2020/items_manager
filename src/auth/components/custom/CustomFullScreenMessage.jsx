import React from 'react'

const CustomFullScreenMessage = ({ message }) => {
if(!message) message === 'Cargando';

    return (
        <div className="flex h-screen  items-center justify-center z-10000">
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-medium">{message}</p>
            </div>
        </div>
    )
}

export default CustomFullScreenMessage
