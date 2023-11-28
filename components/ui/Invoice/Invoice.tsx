import React, { useState } from 'react';
import styles from './Invoice.module.css';
import Button from '../Buttons/Button';
import DynamicTable from '../DynamicTable/DynamicTable';

const Invoice = ({
    options,
    values,
    onChange,
}: {
    options: { label: string; value: string, table: [] }[];
    values: any;
    onChange: (value: string) => void;
}) => {

    const [selectedValues, setSelectedValue] = useState<string[]>([])
    const [showButton, setShowButton] = useState(true)
    const [show, setShow] = useState(false)
    const handleCheckboxChange = (value: string) => {
        if (selectedValues.includes(value)) {
            // If the value is already selected, remove it
            setSelectedValue(selectedValues.filter((val) => val !== value));
        } else {
            // If the value is not selected, add it
            setSelectedValue([...selectedValues, value]);
        }
    };

    return (
        <>
            <div className={styles.invoiceContainer}>
                {options.map((option, index) => (
                    <>
                        <label key={option.value}
                            style={{ width: '100%', border: "none", padding: "0px" }}
                            className={`${styles.checkboxLabel}`}
                        >
                            <div>
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleCheckboxChange(option.value)}
                                    className={styles.checkboxInput}
                                />
                                {option.label}
                            </div>
                            <div className={styles.viewDetails} onClick={() => setShow(!show)}>
                                View Details{" "} ▼
                            </div>
                        </label>
                        {index === 0 && show &&
                            < div className={styles.descriptionContainer}>
                                Description
                                <p style={{ color: "black" }}>We are in need of a comprehensive bathroom remodel. The project scope involves a total overhaul, including the removal of the existing bathtub to create a spacious walk-in shower. In addition, we require a new floor installation, a modern vanity, and updated lighting fixtures.</p>
                                <div className="grid grid-cols-4 gap-4 pt-4">
                                    {[{ title: "City", value: "Sarasota" }, { title: "State", value: "Florida" }, { title: "Total Labor Hours", value: "80" }, { title: "Total Project Duration", value: "7 days" }].map((item) =>
                                        <div>
                                            <div style={{ color: "var(--grey-100, #727A8B)" }}>
                                                {item.title}
                                            </div>
                                            <p style={{ color: "black" }}>{item.value}</p>
                                        </div>
                                    )
                                    }
                                </div>
                                {
                                    option?.table?.map((data, index) => {
                                        return (
                                            <>
                                                <h6 className='pt-4' style={{ color: "var(--grey-100, #727A8B)" }}>{data.name}</h6>
                                                <DynamicTable data={data?.data} />
                                            </>
                                        )
                                    })
                                }
                                <div>
                                    <p>Before and after picture</p>
                                    <div className='grid grid-cols-3 grid-flow-col gap-4'>
                                        <div>Image 1</div>
                                        <div>Image 2</div>
                                        <div>Image 3</div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 grid-flow-col gap-4 p-8 pr-14 pb-8 pl-14 rounded-lg' style={{ backgroundColor: "#F1F4F9" }}>
                                    <div className='flex flex-col justify-center items-center'>
                                        <h5 className={styles.total}>Subtotal:</h5>
                                        <p className={styles.price}>$26,551.74</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <h5 className={styles.total} >Tax:</h5>
                                        <p className={styles.price}>$26,551.74</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <h5 className={styles.total}>Total:</h5>
                                        <p className={styles.active}>$26,551.74</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <h5 className={styles.total}>Draw Amount:</h5>
                                        <p className={styles.price}>$26,551.74</p>
                                    </div>
                                </div>

                            </div >}
                    </>
                ))}
            </div >
            {showButton && <div>
                <Button onClick={() => { onChange(selectedValues.toString()); setShowButton(false) }}>Confirm</Button>
            </div >
            }
        </>
    );
};

export default Invoice;
