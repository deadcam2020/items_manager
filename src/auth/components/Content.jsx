import React from 'react'

export const Content = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 overflow-y-auto'>

        {/* product cards */}
            <div className="flex flex-col w-full  max-w-xs h-auto p-2 rounded-sm gap-2 bg-white">
                <img
                    className="w-full h-auto rounded-xl"
                    src="https://m.media-amazon.com/images/I/61I6Lq5nXCL.jpg"
                    alt=""
                />
                <p className="text-sm break-words">Audífono KZ ZS10 pro x</p>
                <p className="text-xl font-bold break-words">$100000</p>
            </div>



        </div>
    )
}
