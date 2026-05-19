import React from 'react';

interface ChevronDownIconProps {
    size?: number;
    stroke?: string;
    style?: React.CSSProperties;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ size = 12, stroke = '#9ca3af', style }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style}>
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default ChevronDownIcon;
