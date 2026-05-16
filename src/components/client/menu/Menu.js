import React, { useEffect, useState } from 'react';
import * as serviceService from "../services/ServiceService";
import { Container, Row } from 'react-bootstrap';
import TypesService from './TypesService';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        allMenuItems();
    }, []);

    const allMenuItems = async () => {
        const data = await serviceService.getMenuItems();
        setMenuItems(data);

        if (data.length > 0) {
            const firstTypeId = data[0].typeId;
            setSelectedType(firstTypeId);
        }
    };

    return (
        <section className="ftco-section">
            <Container>
                <Row className="mt-4">
                    <TypesService
                        menuItems={menuItems}
                        selectedType={selectedType}
                    />
                </Row>
            </Container>
        </section>
    );
};

export default Menu;
