import React from 'react';
import ReactLoading from 'react-loading';

const LoadingIcon = () => (
    <div style={{margin: '0 auto'}}>
        <ReactLoading type={'bars'} color={'rgba(172, 128, 193, 1)'} height={20} width={200}/>
    </div>
);
 
export default LoadingIcon;