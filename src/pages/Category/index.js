import React, { useEffect, useState } from 'react';
import MainLayout from '../../containers/MainLayout';
import {
	Button,
	Modal,
	Space,
	Table,
	Form,
	Input,
	Pagination,
	Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCategory,
	deleteCategory,
	detailCategory,
	listCategory,
	updateCategory,
} from '../../redux/actions/category.action';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { formatTime } from '../../common/common';

export default function Category() {
	const [visible, setVisible] = useState(false);
	const [page, setPage] = useState(1);
	const [mode, setMode] = useState();
	const [id, setId] = useState();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(listCategory({ page }));
	}, [dispatch, page]);
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'Tên danh mục',
			dataIndex: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			render: (record) => formatTime(record),
		},
		{
			title: 'Ngày cập nhật',
			dataIndex: 'updatedAt',
			render: (record) => formatTime(record),
		},
		{
			title: 'Hành động',
			dataIndex: '',
			key: 'id',
			render: (item) => {
				return (
					<>
						<Popconfirm
							title='Bạn có muốn xoá bản ghi này?'
							onConfirm={() =>
								dispatch(
									deleteCategory(item.id, () =>
										dispatch(listCategory({ page })),
									),
								)
							}
							okText='Có'
							cancelText='Không'
						>
							<DeleteOutlined
								style={{
									cursor: 'pointer',
									paddingRight: 10,
								}}
							/>
						</Popconfirm>
						<EditOutlined
							style={{
								cursor: 'pointer',
							}}
							onClick={() => showModalUpdate(item.id)}
						/>
					</>
				);
			},
		},
	];

	const onChange = (page) => {
		setPage(page);
	};

	useEffect(() => {
		form.setFieldsValue({
			name: state.item.name,
			description: state.item.description,
			images: state.item.logo,
		});
	}, [form, state.item]);

	const showModal = () => {
		form.resetFields();
		setMode('CREATE');
		setVisible(true);
	};

	const showModalUpdate = (id) => {
		setId(id);
		setMode('UPDATE');
		setVisible(true);
		dispatch(detailCategory(id));
	};

	const showTitle = (mode) => {
		switch (mode) {
			case 'CREATE':
				return 'Tạo mới danh mục';
			case 'UPDATE':
				return 'Cập nhật danh mục';
			default:
				break;
		}
	};

	const showLableButton = (mode) => {
		switch (mode) {
			case 'CREATE':
				return 'Tạo mới';
			case 'UPDATE':
				return 'Cập nhật';
			default:
				break;
		}
	};

	const handleCancel = () => {
		setVisible(false);
		form.resetFields();
	};

	const onFinish = (values) => {
		switch (mode) {
			case 'CREATE':
				dispatch(
					createCategory(values, () => dispatch(listCategory({ page }))),
				);
				break;
			case 'UPDATE':
				dispatch(
					updateCategory(id, values, () => dispatch(listCategory({ page }))),
				);
				break;
			default:
				break;
		}

		setVisible(false);
		form.resetFields();
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<MainLayout>
			<h2>Danh sách danh mục</h2>
			<Space style={{ marginBottom: 20 }}>
				<Button type='primary' onClick={showModal}>
					Tạo mới
				</Button>
			</Space>
			<Modal
				title={showTitle(mode)}
				visible={visible}
				// onOk={handleOk}
				// confirmLoading={confirmLoading}
				onCancel={handleCancel}
				footer={false}
			>
				<Form
					name='basic'
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
					form={form}
				>
					<Form.Item
						label='Tên danh mục'
						name='name'
						rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Mô tả'
						name='description'
						rules={[{ required: false }]}
					>
						<Input />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type='primary' htmlType='submit'>
							{showLableButton(mode)}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Table columns={columns} dataSource={state.items} pagination={false} />
			<Pagination
				style={{ marginTop: 10 }}
				current={page}
				total={state.meta.total}
				onChange={onChange}
			/>
		</MainLayout>
	);
}
