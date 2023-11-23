import { useEffect, useState } from 'react';
import styles from './CostCards.module.css'; // Import CSS module
import Button from '../Buttons/Button';

interface CostCardsProps {
    options: any;
    onChange: (val: any) => void;
}

const CostCards: React.FC<CostCardsProps> = ({ options, onChange }) => {
    const [showButton, setShowButton] = useState<Boolean>(true)

    return (
        <>
            <div className={styles.CostCards}>
                {options.map((item: any, index: any) => {
                    return (
                        <div key={index} className={styles.Card}>
                            <span className={styles.text}>{item.text}</span>
                            <h3 className={styles.price}>{item.price}</h3>
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
