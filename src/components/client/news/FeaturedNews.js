import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import * as newsService from "../services/NewsService";
const FeaturedNews = () => {
    const [topNews, setTopNews] = useState([]);

    useEffect(() => {
        fetchTopNews();
    }, []);

    const fetchTopNews = async () => {
        const data = await newsService.getTopViewedNews();
        setTopNews(data);
    };

    return (
        <div className="sidebar-box">
            <h3>Featured News</h3>
            {topNews.map((news, index) => (
                <div className="block-21 mb-4 d-flex" key={index}>
                    <Link to={`/news/${news.newsId}`} className="blog-img mr-4"
                          style={{backgroundImage: `url(${news.imageUrl})`}}></Link>
                    <div className="text">
                        <h3 className="heading"><Link to={`/news/${news.newsId}`}>{news.title}</Link></h3>
                        <div className="meta">
                            <div><Link to={`/news/${news.newsId}`}><span
                                className="icon-calendar"></span> {news.publishDate ? format(new Date(news.publishDate), 'dd MMM yyyy') : 'Unknown Date'}
                            </Link></div>
                            {/*<div><Link to={`/news/${news.newsId}`}><span*/}
                            {/*    className="icon-person"></span> {news.creator.username}</Link></div>*/}
                            <div><Link to={`/news/${news.newsId}`}><span
                                className="icon-eye"></span> {news.viewCount} views</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedNews;
