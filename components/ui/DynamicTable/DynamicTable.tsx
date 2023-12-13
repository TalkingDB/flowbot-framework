import { useState } from 'react';
import styles from './DynamicTable.module.css'; // Import CSS module

interface TableProps {
    data: any;
    onChange: (value: string) => void;
}

const DynamicTable: React.FC<TableProps> = ({ data, onChange }) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedColumn, setSortedColumn] = useState<string>('brand');

    const handleSort = (column: string) => {
        if (sortedColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortOrder('asc');
        }
    };
    return (
        <table className={styles.table + " table-auto"}>
            <thead>
                <tr>
                    {data?.name?.map((item, index) => 
                    <th 
                    style={{ width: item.width}} 
                    className={` ${index === data.name.length - 1  ? 'text-end' : (index !== data.name.length - 1 && index !== 0) ? "text-center" :'text-start'}`}
                    >{item}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data?.data?.map((item, index) => (
                    <tr key={index} className={selectedRow === index ? styles.selectedRow : ''}>
                        {data?.name?.map((value, newindex) => [
                            <td
                            className={` ${newindex === data.name.length - 1  ? 'text-end' : (newindex !== data.name.length - 1 && newindex !== 0) ? "text-center" :'text-start'}`}  
                            >
                                <span>{item[newindex]}</span>
                            </td>
                        ])
                        }
                    </tr>
                ))}
            </tbody>
            {/* <tfoot>
                <tr>
                    {data?.name?.map((item, index) => {
                        if (data?.name?.length - 1 == index) {
                            return (<>
                                <td style={{ width: item.width }} className={styles.price}>$1998.345</td>
                            </>)
                        } else if (data?.name?.length - 2 == index) {
                            return <td style={{ width: item.width, textAlign: 'center' }} className={styles.total}>Total</td>
                        }
                        else {
                            return <td style={{ width: item.width }}></td>
                        }
                    }
                    )}
                </tr>

            </tfoot> */}
        </table>
    );
};

export default DynamicTable;
