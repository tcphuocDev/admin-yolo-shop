export const Endpoint = {
	HOME: '/',
	DASHBOARD: '/dashboard',
	BRANCH: '/branch',
	SETTING: '/setting',
	CATEGORY: '/categories',
	COLOR: '/colors',
	COUPON: '/coupon',
	SPECIFICATION: '/specification',
	PRODUCT: '/products',
	USER: '/user',
	ORDER: '/orders',
	SIZE: '/sizes',
};

export const routers = [
	{
		endpoint: Endpoint.DASHBOARD,
		text: 'Dashboard',
	},
	{
		endpoint: Endpoint.CATEGORY,
		text: 'Quản lý danh mục',
	},
	{
		endpoint: Endpoint.PRODUCT,
		text: 'Quản lý sản phẩm',
	},
	{
		endpoint: Endpoint.COLOR,
		text: 'Quản lý màu sắc',
	},
	{
		endpoint: Endpoint.SIZE,
		text: 'Quản lý kích cỡ',
	},
	// {
	//   endpoint: Endpoint.COUPON,
	//   text: "Quản lý mã giảm giá",
	// },
	{
		endpoint: Endpoint.USER,
		text: 'Quản lý người dùng',
	},
	{
		endpoint: Endpoint.ORDER,
		text: 'Quản lý đơn hàng',
	},
	// {
	//   endpoint: Endpoint.SETTING,
	//   text: "Cài đặt website",
	// },
];
