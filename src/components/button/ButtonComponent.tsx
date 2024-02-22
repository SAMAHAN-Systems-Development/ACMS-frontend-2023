import React from 'react';

interface Props{
    text: string;
    type: string;
    isDisabled: boolean;
}

export const ButtonComponent:React.FC<Props> = ({text, type, isDisabled}) => {
    return (
        <button 
                onClick={()=>''}
                className={`px-4 py-1 text-slate-50 font-semibold rounded-lg  
                ${type === 'primary' && !isDisabled
                    ? 'bg-navyBlue text-white' 
                    : isDisabled
                    ? 'bg-blue text-white border-none cursor-not-allowed disabled' : 'bg-white text-navyBlue border-solid border-navyBlue border-2'
                } 
            `}
            
        >
            {text}
        </button>
    )
}
