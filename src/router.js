import NotFound from './components/NotFound';
import { Endpoint } from './constants/endpoint';
import PrivateRouter from './containers/PrivateRouter';
import Category from './pages/Category';
import Color from './pages/Color';
import Coupon from './pages/Coupon';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Order from './pages/Order';
import Product from './pages/Product';
import User from './pages/User';
import Size from './pages/size';

const routes = [
	{
		path: Endpoint.HOME,
		element: <Login />,
	},
	{
		path: Endpoint.DASHBOARD,
		element: <PrivateRouter component={Dashboard} />,
	},
	{
		path: Endpoint.CATEGORY,
		element: <PrivateRouter component={Category} />,
	},
	{
		path: Endpoint.COLOR,
		element: <PrivateRouter component={Color} />,
	},
	{
		path: Endpoint.COUPON,
		element: <PrivateRouter component={Coupon} />,
	},
	{
		path: Endpoint.SIZE,
		element: <PrivateRouter component={Size} />,
	},
	{
		path: Endpoint.PRODUCT,
		element: <PrivateRouter component={Product} />,
	},
	{
		path: Endpoint.USER,
		element: <PrivateRouter component={User} />,
	},
	{
		path: Endpoint.ORDER,
		element: <PrivateRouter component={Order} />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export default routes;
