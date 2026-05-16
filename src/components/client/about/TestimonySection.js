import React from 'react';

const TestimonySection = () => {
    return (
        <section
            className="ftco-section img"
            id="ftco-testimony"
            style={{ backgroundImage: 'url(images/bg_1.jpg)' }}
            data-stellar-background-ratio="0.5"
        >
            <div className="overlay"></div>
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-md-7 heading-section text-center ">
                        <span className="subheading">Testimony</span>
                        <h2 className="mb-4">Customers Says</h2>
                        <p>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                            there live the blind texts.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-wrap">
                <div className="row d-flex no-gutters">
                    <Testimony
                        text="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small."
                        imgSrc="images/person_1.jpg"
                        name="Louise Kelly"
                        position="Illustrator Designer"
                    />
                    <Testimony
                        text="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
                        imgSrc="images/person_2.jpg"
                        name="Louise Kelly"
                        position="Illustrator Designer"
                        overlay={true}
                    />
                    <Testimony
                        text="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small  line of blind text by the name."
                        imgSrc="images/person_3.jpg"
                        name="Louise Kelly"
                        position="Illustrator Designer"
                    />
                    <Testimony
                        text="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however."
                        imgSrc="images/person_2.jpg"
                        name="Louise Kelly"
                        position="Illustrator Designer"
                        overlay={true}
                    />
                    <Testimony
                        text="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small  line of blind text by the name."
                        imgSrc="images/person_3.jpg"
                        name="Louise Kelly"
                        position="Illustrator Designer"
                    />
                </div>
            </div>
        </section>
    );
};

// Testimony component for each testimonial
const Testimony = ({ text, imgSrc, name, position, overlay }) => {
    return (
        <div className="col-lg align-self-sm-end">
            <div className={`testimony ${overlay ? 'overlay' : ''}`}>
                <blockquote>
                    <p>&ldquo;{text}&rdquo;</p>
                </blockquote>
                <div className="author d-flex mt-4">
                    <div className="image mr-3 align-self-center">
                        <img src={imgSrc} alt={name} />
                    </div>
                    <div className="name align-self-center">
                        {name} <span className="position">{position}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonySection;
