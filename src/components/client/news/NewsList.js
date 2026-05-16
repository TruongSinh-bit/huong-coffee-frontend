import React, { useEffect, useState } from "react";
import NewsEntry from "./NewsEntry";
import * as newsService from "../services/NewsService";
import useScrollToHash from "../common/UseScrollToHash";
const NewsList = () => {
    const [newsEntries, setNewsEntries] = useState([]);
    const [visibleEntries, setVisibleEntries] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 6;

    useScrollToHash([newsEntries]);

    useEffect(() => {
        findAllNews(currentPage);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [currentPage]);

    const findAllNews = async (page) => {
        try {
            const { content, last } = await newsService.getAllActiveNews(page, pageSize);
            if (content.length > 0) {
                setNewsEntries((prevEntries) => [...prevEntries, ...content]);
            }
            setHasMore(!last);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            if (hasMore) {
                loadMoreEntries();
            }
        }
    };

    const loadMoreEntries = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setVisibleEntries((prevVisibleEntries) => prevVisibleEntries + pageSize);
    };

    return (
        <section className="ftco-section" id="news-list">
            <div className="container">
                <h2 className="mb-5">News List</h2>
                <div className="row d-flex">
                    {newsEntries.slice(0, visibleEntries).map((entry) => (
                        <NewsEntry
                            key={entry.newsId}
                            newsId={entry.newsId}
                            imageUrl={entry.imageUrl}
                            publishDate={entry.publishDate}
                            creator={entry.creator.username}
                            title={entry.title}
                            content={entry.content}
                            // viewCount={entry.viewCount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsList;
