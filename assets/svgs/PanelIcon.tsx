import React from 'react';

interface PanelIconProps {
    size?: number;
    stroke?: string;
}

const PanelIcon: React.FC<PanelIconProps> = ({ size = 20, stroke = '#6b7280' }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
    );
};

export default PanelIcon;
