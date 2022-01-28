import { React } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setOrderDetails } from './../../redux/Orders/orders.actions';


const columns = [
    {
        id: 'productThumbnail',
        lable: ''
    },
    {
        id: 'productName',
        lable: 'Name'
    },
    {
        id: 'productPrice',
        lable: 'Price'
    },
    {
        id: 'quantity',
        lable: 'Quantity'
    },
]

const styles = {
    fontSize: '16px',
    width: '10',
}

const formatText = (columnName, columnValue) => {
    switch(columnName) {
        case 'productPrice' :
            return `$${columnValue}`;
        case 'productThumbnail' :
            return <img src={columnValue} width={250} />
        default: 
            return columnValue;
    }
}

const OrderDetails = ({ order }) => {

    const dispatch = useDispatch();
    const orderItems = order && order.orderItems;

    useEffect(()=> {
        return () => {
            dispatch(setOrderDetails({}))
        }
    }, []);

    return (
        <TableContainer>
            <Table>

                <TableHead>
                    <TableRow>

                        {columns.map((col, pos)=> {
                            return (
                                <TableCell key={pos} style={styles}>
                                    {col.lable}
                                </TableCell>
                            )
                        })}

                    </TableRow>
                </TableHead>

                <TableBody>
                        {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => {
                            return (
                                <TableRow key={pos}>
                                   {columns.map((col, pos)=> {

                                        const columnName = col.id;
                                        const columnValue = row[columnName];


                                        return (
                                            <TableCell key={pos} style={styles}>
                                                {formatText(columnName, columnValue)}
                                            </TableCell>
                                        )
                                    })} 
                                </TableRow>
                            )
                        })}
                </TableBody>

            </Table>
        </TableContainer>
    )   
}

export default OrderDetails;
