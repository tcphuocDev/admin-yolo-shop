import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import categoryReducer from './category.reducer';
import colorReducer from './color.reducer';
import couponReducer from './coupon.reducer';
import dashboardReducer from './dashboard.reducer';
import orderReducer from './order.reducer';
import productReducer from './product.reducer';
import sizeReducer from './size.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	color: colorReducer,
	coupon: couponReducer,
	size: sizeReducer,
	product: productReducer,
	user: userReducer,
	order: orderReducer,
	dashboard: dashboardReducer,
});

export default rootReducer;
