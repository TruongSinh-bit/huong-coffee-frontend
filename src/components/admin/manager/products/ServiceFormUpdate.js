import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as serviceService from '../../service/ServiceService';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Button, Container, Form as BootstrapForm } from 'react-bootstrap';

const ServiceFormUpdate = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);




    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await serviceService.getServiceDetails(serviceId);
                const waitTime = response.waitTime; // get the waitTime from the response
                const hoursMinutes = waitTime.split(':'); // split the time into hours and minutes
                const minutes = (+hoursMinutes[0]) * 60 + (+hoursMinutes[1]); // convert hours and minutes to total minutes
                setService({
                    ...response,
                    waitTime: minutes // set the waitTime in minutes
                });
                setService(response);
                setPreviewImage(response.imageUrl); // set the image URL to previewImage
            } catch (error) {
                toast.error('Không thể tải dịch vụ');
            }
        };

        const fetchServiceTypes = async () => {
            try {
                const response = await serviceService.getServiceTypes();
                setServiceTypes(response);
            } catch (error) {
                toast.error('Không thể tải loại dịch vụ');
            }
        };

        fetchService();
        fetchServiceTypes();
    }, [serviceId]);

    const validationSchema = Yup.object({
        // serviceCode: Yup.string().required('Mã món là bắt buộc'),
        serviceName: Yup.string().required('Tên món là bắt buộc'),
        typeId: Yup.number().required('Loại món là bắt buộc'),
        price: Yup.number().required('Giá là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
        imageUrl: Yup.mixed().required('Ảnh là bắt buộc'),
        waitTime: Yup.number().required('Thời gian chờ là bắt buộc')
            .min(0, 'Thời gian chờ không được âm'),
        status: Yup.string().required('Trạng thái là bắt buộc')
    });

    const updateService = async (values) => {
        try {
            const minutes = values.waitTime;
            const hours = Math.floor(minutes / 60);
            const minutesPart = minutes % 60;
            const localTime = `${String(hours).padStart(2, '0')}:${String(minutesPart).padStart(2, '0')}:00`;
            // const waitTime = `PT${values.waitTime}M`; // convert minutes to ISO-8601 duration format


            const formData = new FormData();
            // formData.append('serviceCode', values.serviceCode);
            formData.append('serviceName', values.serviceName);
            formData.append('typeId', values.typeId);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('imageUrl', values.imageUrl);
            formData.append('waitTime', localTime);
            formData.append('status', values.status);
            // Kiểm tra xem người dùng có chọn file mới để tải lên hay không
            if (selectedFile) {
                // Nếu có, sử dụng file mới
                formData.append('imageUrl', selectedFile);
            } else {
                // Nếu không, sử dụng URL ảnh đã lưu
                formData.append('imageUrl', service.imageUrl);
            }
            const response = await serviceService.updateService(serviceId, formData);
            if (response) {
                toast.success('Dịch vụ được cập nhật thành công!');
                navigate('/admin/service');
            } else {
                toast.error('Cập nhật dịch vụ thất bại');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with error:', error.response.data);
                console.error('Status code:', error.response.status);
                toast.error(`Cập nhật dịch vụ thất bại: ${error.response.data}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                toast.error('Cập nhật dịch vụ thất bại: No response received');
            } else {
                console.error('Error setting up request:', error.message);
                toast.error(`Cập nhật dịch vụ thất bại: ${error.message}`);
            }
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
    return (
        <div className="main-content">
            <div className="section-body">
                <Container className="mt-4">
                    <h2>Update Dish</h2>
                    {service && (
                        <Formik
                            initialValues={service}
                            onSubmit={updateService}
                            validationSchema={validationSchema}
                        >
                            {({ setFieldValue }) => (
                                <Form encType="multipart/form-data">
                                    {/*<BootstrapForm.Group className="mb-3" controlId="serviceCode">*/}
                                    {/*    <BootstrapForm.Label>Mã Món:</BootstrapForm.Label>*/}
                                    {/*    <Field name="serviceCode" type="text" className="form-control" />*/}
                                    {/*    <ErrorMessage name="serviceCode" component="p" className="text-danger" />*/}
                                    {/*</BootstrapForm.Group>*/}

                                    <BootstrapForm.Group className="mb-3" controlId="serviceName">
                                        <BootstrapForm.Label>Name Dish:</BootstrapForm.Label>
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
                                        <Field name="price" type="number" className="form-control" />
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
                                        <Button type="submit" variant="primary">Update</Button>
                                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ServiceFormUpdate;