import React, { useState } from 'react';
import styles from '../../../configuration/CSS/Index.module.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Button from '../Buttons/Button';

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: Option[];
    onChange: (value: string) => void;
    value: string;
}

const AutoCompleteInput: React.FC<SelectInputProps> = ({ options, onChange, value }) => {
    const [selectedValue, setSelectedValue] = useState(""); // Initialize with an empty string
    const [showButton, setShowButton] = useState<Boolean>(true)
    const [items, setItems] = useState([{ id: 1, name: "Canal Street, New York, NY, USA" }, { id: 2, name: "Canal Street, New Smyrna Beach, FL, USA" }]);

    // const items = [
    //     {
    //         id: 0,
    //         name: 'Cobol'
    //     },
    //     {
    //         id: 1,
    //         name: 'JavaScript'
    //     },
    //     {
    //         id: 2,
    //         name: 'Basic'
    //     },
    //     {
    //         id: 3,
    //         name: 'PHP'
    //     },
    //     {
    //         id: 4,
    //         name: 'Java'
    //     }
    // ]

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log("searching ==> ", string, results)
        // autocomplete()
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log("selected value ==> ", item.name)
        setSelectedValue(item.name)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }


    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: "360px" }}>
                <ReactSearchAutocomplete
                    items={items}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    autoFocus
                    formatResult={formatResult}
                />
            </div>
            <div style={{ marginLeft: "20px" }}>
                {showButton && <Button onClick={() => { onChange(selectedValue); setShowButton(false) }}>Confirm</Button>}
            </div>
        </div>
    );
};

export default AutoCompleteInput;
