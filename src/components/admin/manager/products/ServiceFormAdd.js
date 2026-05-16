import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {createService} from "../../service/ServiceService";
import * as Yup from 'yup';


const ServiceFormAdd = () => {
    const navigate = useNavigate();
    const [serviceCode, setServiceCode] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [typeId, setTypeId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [waitTime, setWaitTime] = useState('00:05:00');
    const [status, setStatus] = useState('available');
    const [is_delete, setIsDelete] = useState(false);

    const validationSchema = Yup.object().shape({
        serviceCode: Yup.string()
            .required('Mã dịch vụ không được để trống')
            .test('is-valid', 'Mã dịch vụ không đúng định dạng', function(value) {
                const { typeId } = this.parent;
                let regex;
                switch (typeId) {
                    case '1':
                        regex = /^CF\d{4}$/;
                        break;
                    case '2':
                        regex = /^FZ\d{4}$/;
                        break;
                    case '3':
                        regex = /^TEA\d{4}$/;
                        break;
                    case '4':
                        regex = /^OT\d{4}$/;
                        break;
                    default:
                        return false;
                }
                return regex.test(value);
            }),
        serviceName: Yup.string()
            .required('Tên dịch vụ không được để trống'),
        price: Yup.number()
            .required('Giá dịch vụ không được để trống')
            .positive('Giá dịch vụ phải là một số dương'),
        typeId: Yup.string()
            .required('Loại dịch vụ không được để trống')
            .oneOf(['1', '2', '3', '4'], 'Loại dịch vụ không hợp lệ')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            serviceCode,
            serviceName,
            typeId,
            price: Number(price),
            description,
            imageUrl,
            waitTime,
            status,
            is_delete: Boolean(is_delete)
        };
        try {
            await validationSchema.validate(values);

            const response = await createService(values);
            if (response) {
                toast.success('Dịch vụ được tạo thành công!');
                navigate('/admin/service');
            }
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error('Tạo dịch vụ thất bại');
        }
    };

    const handleCancel = () => {
        navigate('/admin/service');
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2>Tạo Dịch Vụ Mới</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="serviceCode">Mã Sản Phẩm </label><br/>
                                    <input
                                        id="serviceCode"
                                        type="text"
                                        className="form-control"
                                        value={serviceCode}
                                        onChange={(e) => setServiceCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="serviceName">Tên Sản Phẩm</label>
                                    <input
                                        id="serviceName"
                                        type="text"
                                        className="form-control"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="typeId">Loại Dịch Vụ:</label>
                                    <select
                                        id="typeId"
                                        className="form-control"
                                        value={typeId}
                                        onChange={(e) => setTypeId(e.target.value)}
                                        required
                                    >
                                        <option value="1">Cà Phê</option>
                                        <option value="2">Freeze</option>
                                        <option value="3">Trà</option>
                                        <option value="4">Khác</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="price">Giá:</label>
                                    <input
                                        id="price"
                                        type="number"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description">Mô Tả:</label>
                                    <input
                                        id="description"
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="imageUrl">URL Ảnh:</label>
                                    <input
                                        id="imageUrl"
                                        type="text"
                                        className="form-control"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="status">Trạng Thái:</label>
                                    <select
                                        id="status"
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="out_of_stock">Out of Stock</option>
                                    </select>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">Tạo Dịch Vụ</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceFormAdd;