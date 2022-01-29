import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getUserOrderHistory} from '../../redux/Orders/orders.actions'
import OrderHistory from './../../components/OrderHistory/orderhistory';
import './dashboardstyles.scss'

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data,
})

const Dashboard = props => {
    const dispatch = useDispatch();
    const {currentUser, orderHistory} = useSelector(mapState)
    useEffect(()=> {
        dispatch(getUserOrderHistory(currentUser.id));
    }, []);
    
    return (
        <div>
            <h1>
                Order History
            </h1>
            <OrderHistory orders={orderHistory} />
        </div>
    );
};

export default Dashboard;