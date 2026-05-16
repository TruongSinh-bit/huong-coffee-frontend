import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as newsService from '../services/NewsService';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Button, Container, Form as BootstrapForm } from 'react-bootstrap';

const NewsForm = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Tiêu đề là bắt buộc'),
        content: Yup.string()
            .required('Nội dung là bắt buộc'),
        file: Yup.mixed()
            .required('Ảnh là bắt buộc')
    });

    const saveNews = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('file', values.file);
        const userId = localStorage.getItem("userId");
        formData.append('userId', userId);

        try {
            const response = await newsService.createNews(formData);
            if (response) {
                toast.success('Tin tức được tạo thành công!');
                navigate('/admin/news');
            }
        } catch (error) {
            toast.error('Tạo tin tức thất bại');
        }
    };

    const handleCancel = () => {
        navigate('/admin/news');
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <Container className="mt-4">
                    <h2>Tạo Tin Tức Mới</h2>
                    <Formik
                        initialValues={{
                            title: '',
                            content: '',
                            file: null
                        }}
                        onSubmit={saveNews}
                        validationSchema={validationSchema}
                    >
                        {({ setFieldValue }) => (
                            <Form encType="multipart/form-data">
                                <BootstrapForm.Group className="mb-3" controlId="title">
                                    <BootstrapForm.Label>Tiêu Đề:</BootstrapForm.Label>
                                    <Field name="title" type="text" className="form-control" />
                                    <ErrorMessage name="title" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="content">
                                    <BootstrapForm.Label>Nội Dung:</BootstrapForm.Label>
                                    <Field
                                        name="content"
                                        as="textarea"
                                        className="form-control"
                                        style={{ minHeight: '170px' }}
                                    />
                                    <ErrorMessage name="content" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="file">
                                    <BootstrapForm.Label>Ảnh:</BootstrapForm.Label>
                                    <input
                                        name="file"
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => {
                                            setFieldValue('file', event.currentTarget.files[0]);
                                            setPreviewImage(URL.createObjectURL(event.currentTarget.files[0]));
                                        }}
                                    />
                                    <ErrorMessage name="file" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                {previewImage && (
                                    <div className="mb-3">
                                        <img src={previewImage} alt="Preview" className="img-fluid" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <Button type="submit" variant="primary">Tạo Tin</Button>
                                    <Button type="button" variant="secondary" onClick={handleCancel}>Hủy</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </div>
    );
};

export default NewsForm;
