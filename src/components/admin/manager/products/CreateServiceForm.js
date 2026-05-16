import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as serviceService from '../../service/ServiceService';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Button, Container, Form as BootstrapForm } from 'react-bootstrap';

const CreateServiceForm = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);

    useEffect(() => {
        const fetchServiceTypes = async () => {
            try {
                const response = await serviceService.getServiceTypes();
                setServiceTypes(response);
            } catch (error) {
                toast.error('Không thể tải loại món');
            }
        };

        fetchServiceTypes();
    }, []);

    const validationSchema = Yup.object({
        serviceName: Yup.string().required('Tên món là bắt buộc'),
        typeId: Yup.number().required('Loại món là bắt buộc'),
        price: Yup.number().required('Giá là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
        imageUrl: Yup.mixed().required('Ảnh là bắt buộc'),
        waitTime: Yup.number().required('Thời gian chờ là bắt buộc')
            .min(0, 'Thời gian chờ không được âm'),
        status: Yup.string().required('Trạng thái là bắt buộc')
    });

    const saveService = async (values) => {
        try {
            const minutes = values.waitTime;
            const hours = Math.floor(minutes / 60);
            const minutesPart = minutes % 60;
            const localTime = `${String(hours).padStart(2, '0')}:${String(minutesPart).padStart(2, '0')}:00`;

            const formData = new FormData();
            formData.append('serviceName', values.serviceName);
            formData.append('typeId', values.typeId);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('imageUrl', values.imageUrl);
            formData.append('waitTime', localTime);
            formData.append('status', values.status);

            const response = await serviceService.addService(formData);
            if (response) {
                toast.success('Món được tạo thành công!');
                navigate('/admin/service');
            } else {
                toast.error('Tạo món thất bại');
            }
        } catch (error) {
            toast.error('Tạo món thất bại');
            console.error('Error saving service:', error);
        }
    };

    const handleCancel = () => {
        navigate('/admin/service');
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setFieldValue('imageUrl', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const formatPrice = (value) => {
        if (!value) return value;

        // Chuyển đổi về số trước khi định dạng
        const number = value.replace(/\D/g, '');

        return new Intl.NumberFormat('vi-VN').format(number);
    };


    return (
        <div className="main-content">
            <div className="section-body">
                <Container className="mt-4">
                    <h2>Create New Dish</h2>
                    <Formik
                        initialValues={{
                            serviceCode: '',
                            serviceName: '',
                            typeId: 0,
                            price: '',
                            description: '',
                            imageUrl: null,
                            waitTime: '',
                            status: 'available'
                        }}
                        onSubmit={saveService}
                        validationSchema={validationSchema}
                    >
                        {({ setFieldValue }) => (
                            <Form encType="multipart/form-data">

                                <BootstrapForm.Group className="mb-3" controlId="serviceName">
                                    <BootstrapForm.Label>Dish Name:</BootstrapForm.Label>
                                    <Field name="serviceName" type="text" className="form-control" />
                                    <ErrorMessage name="serviceName" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="typeId">
                                    <BootstrapForm.Label>Type of Dish:</BootstrapForm.Label>
                                    <Field as="select" name="typeId" className="form-control">
                                        <option value="">Select Dish Type</option>
                                        {serviceTypes.map(type => (
                                            <option key={type.typeId} value={type.typeId}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="typeId" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="price">
                                    <BootstrapForm.Label>Price:</BootstrapForm.Label>
                                    <Field name="price">
                                        {({ field, form }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                className="form-control"
                                                value={formatPrice(field.value)} // Định dạng giá trị đầu vào
                                                onChange={(e) => {
                                                    const inputValue = e.target.value.replace(/\D/g, ''); // Chỉ giữ lại số
                                                    form.setFieldValue('price', inputValue); // Lưu giá trị dưới dạng số nguyên (không có định dạng)
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="price" component="p" className="text-danger" />
                                </BootstrapForm.Group>


                                <BootstrapForm.Group className="mb-3" controlId="description">
                                    <BootstrapForm.Label>Describe:</BootstrapForm.Label>
                                    <Field name="description" as="textarea" className="form-control" />
                                    <ErrorMessage name="description" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="imageUrl">
                                    <BootstrapForm.Label>Image:</BootstrapForm.Label>
                                    <input
                                        name="imageUrl"
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                    />
                                    <ErrorMessage name="imageUrl" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                {previewImage && (
                                    <div className="mb-3">
                                        <img src={previewImage} alt="Preview" className="img-fluid" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    </div>
                                )}

                                <BootstrapForm.Group className="mb-3" controlId="waitTime">
                                    <BootstrapForm.Label>Time Wait (minute):</BootstrapForm.Label>
                                    <Field name="waitTime" type="number" className="form-control" min="0" />
                                    <ErrorMessage name="waitTime" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="status">
                                    <BootstrapForm.Label>Status:</BootstrapForm.Label>
                                    <Field as="select" name="status" className="form-control">
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="out_of_stock">Out of Stock</option>
                                    </Field>
                                    <ErrorMessage name="status" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <div className="d-flex justify-content-between">
                                    <Button type="submit" variant="primary">Create</Button>
                                    <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </div>
    );
};

export default CreateServiceForm;
