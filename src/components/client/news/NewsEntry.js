import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import "./NewsEntry.css";

const NewsEntry = ({ imageUrl, publishDate, creator, title, content, newsId, viewCount }) => {
    const formattedDate = formatDistanceToNow(parseISO(publishDate), { addSuffix: true });

    return (
        <div className="col-md-4 d-flex">
            <div className="blog-entry align-self-stretch">
                <Link to={`/news/${newsId}`} className="block-20" style={{ backgroundImage: `url(${imageUrl})` }} aria-label={title}>
                </Link>
                <div className="text py-4 d-block">
                    <div className="meta">
                        <div>
                            <span className="icon-calendar"></span> {formattedDate || "Unknown Date"}
                        </div>
                        <div>
                            <span className="icon-person"></span> {creator || "Unknown Author"}
                        </div>
                        {/*<div>*/}
                        {/*    <Link to={`/news/${newsId}`}>*/}
                        {/*        <span className="icon-eye"></span> {viewCount || 0} views*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>
                    <h3 className="heading mt-2"><Link to={`/news/${newsId}`}>{title}</Link></h3>
                    <p className="news-content">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default NewsEntry;
