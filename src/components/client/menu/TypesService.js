import React, {useEffect, useState} from 'react';
import * as serviceService from "../services/ServiceService";

const TypesService = ({ menuItems }) => {

    const [servicesByType, setServicesByType] = useState({});

    useEffect(() => {
        const getServices = async () => {
            const servicesData = {};
            for (const item of menuItems.slice(0, 4)) {
                const services = await serviceService.getServicesByType(item.typeId);

                // Sắp xếp các dịch vụ theo giá giảm dần và chọn 4 món có giá cao nhất
                const sortedServices = services.sort((a, b) => b.price - a.price).slice(0, 4);

                servicesData[item.typeId] = sortedServices;
            }
            setServicesByType(servicesData);
        };

        getServices();
    }, [menuItems]);

    return (
        <section className="">
            <div className="container">
                <div className="row">
                    {menuItems.slice(0,4).map((item) => (
                        <div key={item.typeId} className="col-md-6 mb-5 pb-3">
                            <h3 className="heading-pricing">
                                {item.typeName}
                            </h3>
                            <div className="pricing-entry">
                                {servicesByType[item.typeId]?.map((service) => (
                                    <div key={service.serviceId} className="d-flex mb-3">
                                        <div className="img"
                                             style={{backgroundImage: `url(/images/${service.imageUrl})`}}></div>
                                        <div className="desc pl-3">
                                            <div className="d-flex text align-items-center">
                                                <h3><span>{service.serviceName}</span></h3>
                                                <span className="price">{service.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</span>
                                            </div>
                                            <div className="description d-block">
                                                <p>{service.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TypesService;
