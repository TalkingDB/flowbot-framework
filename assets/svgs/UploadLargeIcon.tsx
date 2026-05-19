import React from 'react';

interface UploadLargeIconProps {
    size?: number;
    stroke?: string;
}

const UploadLargeIcon: React.FC<UploadLargeIconProps> = ({ size = 32, stroke = '#6b7280' }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M12 15V3M12 3L8 7M12 3L16 7" 
                stroke={stroke} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
        </svg>
    );
};

export default UploadLargeIcon;
