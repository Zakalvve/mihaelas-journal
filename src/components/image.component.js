import React from 'react';

const Image = React.forwardRef(({src, width, height, alt, loading, ...props}, ref) => {
    return (
        <img 
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={loading ? 'eager' : 'lazy'}
        decoding='async'
        ref={ref}
        {...props}
        />
    )
})
export default Image;