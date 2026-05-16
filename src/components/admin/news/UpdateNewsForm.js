import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as newsService from "../../client/services/NewsService";
import { Button, Form, Container } from "react-bootstrap";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateNewsForm = () => {
    const { newsId } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState({
        title: "",
        content: "",
        imageUrl: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        loadNews();
    }, []);

    useEffect(() => {
        if (selectedFile) {
            setPreviewImage(URL.createObjectURL(selectedFile));
        }
    }, [selectedFile]);

    const loadNews = async () => {
        try {
            const data = await newsService.getNewsById(newsId);
            setNews({
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrl,
            });
            setPreviewImage(data.imageUrl);
        } catch (error) {
            toast.error("Không thể tải tin tức.");
        }
    };

    const handleChange = (e) => {
        setNews({ ...news, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", news.title);
        formData.append("content", news.content);
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            await newsService.updateNews(newsId, formData);
            toast.success("Cập nhật tin tức thành công!");
            navigate("/admin/news");
        } catch (error) {
            toast.error("Cập nhật tin tức thất bại!");
        }
    };

    const handleCancel = () => {
        navigate('/admin/news');
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <Container>
                    <h2 className="mt-4">Cập nhật tin tức</h2>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group controlId="newsTitle">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={news.title}
                                onChange={handleChange}
                                placeholder="Nhập tiêu đề tin tức"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="newsContent">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                value={news.content}
                                onChange={handleChange}
                                rows={10}
                                placeholder="Nhập nội dung tin tức"
                                style={{minHeight: "170px"}}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="newsImage">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control
                                type="file"
                                name="imageUrl"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            {previewImage && (
                                <div className="mt-3">
                                    <img src={previewImage} alt="News Thumbnail"
                                         style={{width: "150px", height: "auto"}}/>
                                </div>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit" className="mt-3">Cập nhật</Button>
                            <Button type="button" variant="secondary" className="mt-3"
                                    onClick={handleCancel}>Hủy</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default UpdateNewsForm;
