import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as newsService from "../services/NewsService";
import {format} from "date-fns";
import SearchForm from "./SearchForm";

const NewsDetail = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await newsService.getNewsById(newsId);
                setNews(newsData);
                await newsService.incrementViewCount(newsId);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [newsId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!news) return <p>No news found</p>;

    const formattedDate = news.publishDate
        ? format(new Date(news.publishDate), 'dd MMM yyyy HH:mm')
        : 'Unknown Date';

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="mb-3">{news.title}</h2>
                        <p><strong>Date: </strong>{formattedDate}</p>
                        <p>{news.content}</p>
                        {news.imageUrl && (
                            <p>
                                <img src={`${news.imageUrl}`} alt={news.title} className="img-fluid"/>
                            </p>
                        )}
                        <div className="tag-widget post-tag-container mb-5 mt-5">
                            <div className="tagcloud">
                                <a href="#" className="tag-cloud-link">Coffe</a>
                                <a href="#" className="tag-cloud-link">Tea</a>
                                <a href="#" className="tag-cloud-link">Freeze</a>
                                <a href="#" className="tag-cloud-link">Other</a>
                            </div>
                        </div>
                    </div>
                    <SearchForm/>
                </div>
            </div>
        </section>
    );
};

export default NewsDetail;
