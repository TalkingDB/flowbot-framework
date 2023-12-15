import { useEffect, useState } from 'react';
import styles from './CostCards.module.css'; // Import CSS module
import Button from '../Buttons/Button';

interface CostCardsProps {
    options: any;
    onChange: (val: any) => void;
    showSubmit?: boolean;
    fontSize?: string;
    hightlightIndex?: number;
}

const CostCards: React.FC<CostCardsProps> = ({ options, onChange, showSubmit=true, fontSize, hightlightIndex }) => {
    const [showButton, setShowButton] = useState<Boolean>(showSubmit)

    return (
        <>
            <div className={styles.CostCards}>
                {options.map((item: any, index: any) => {
                    return (
                        <div key={index} className={styles.Card}>
                            <span className={styles.text}>{item.text}</span>
                            <div 
                                className={`${styles.price} ${index === hightlightIndex || item.text === "Total:" ? styles.active : ''}`}
                                style={{fontSize: fontSize}}
                            >{item.price}</div>
                        </div>
                    )
                })}
            </div>
            {showButton && <div style={{ paddingTop: "20px" }}>
                <Button onClick={() => { onChange("$639.18"); setShowButton(false) }}>Confirm</Button>
            </div>}
        </>
    );
};

export default CostCards;
