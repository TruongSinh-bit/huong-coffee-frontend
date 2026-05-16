import React from 'react';
const BlogPost = ({ imgUrl, title, date, author}) => {
    return (
        <div className="block-21 mb-4 d-flex">
            <a className="img mr-4 rounded" style={{ backgroundImage: `/images/url(${imgUrl})` }}></a>
            <div className="text">
                <h3 className="heading"><a href="#">{title}</a></h3>
                <div className="meta">
                    <div><a href="#"><span className="icon-calendar"></span> {date}</a></div>
                    <div><a href="#"><span className="icon-person"></span> {author}</a></div>
                    {/*<div><a href="#"><span className="icon-chat"></span> {comments} Comments</a></div>*/}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
