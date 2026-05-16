import React, { useEffect, useState } from 'react';
import * as serviceService from "../services/ServiceService";
import { Container, Row } from 'react-bootstrap';
import ServiceTypes from './ServiceTypes';
import ListServiceByType from './ListServiceByType';
import ListBillDetails from './ListBillDetails';
import './Menu.css';
import SockJS from "sockjs-client";
import {Client} from '@stomp/stompjs';


const Order = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [services, setServices] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [allTables, setAllTables] = useState([]);
    const [tableInfo, setTableInfo] = useState(null);
    const [rangeValue, setRangeValue] = useState(500000); // Giá trị phạm vi mặc định
    const [selectedType, setSelectedType] = useState(null);
    const itemsPerPage = 8;


    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onStompError: (error) => {
                console.error('STOMP error', error);
            },
            onWebSocketClose: () => {
                console.error('WebSocket connection closed');
            }
        });

        stompClient.onConnect = () => {
            console.log('Connected to WebSocket');

            stompClient.subscribe('/topic/client/order', (message) => {
                const updatedTables = JSON.parse(message.body);
                setAllTables(updatedTables);
            });

            stompClient.subscribe('/topic/client/callEmployee', (message) => {
                const updatedTables = JSON.parse(message.body);
                setAllTables(updatedTables);
            });
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);




    useEffect(() => {
        // Khôi phục dữ liệu từ sessionStorage khi component được khởi tạo
        const savedCartItems = sessionStorage.getItem('cartItems');
        const savedTableInfo = sessionStorage.getItem('tableInfo');

        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }

        if (savedTableInfo) {
            setTableInfo(JSON.parse(savedTableInfo));
        }

        allMenuItems();
        getAllTables();
    }, []);

    useEffect(() => {
        // Lưu dữ liệu vào sessionStorage khi cartItems hoặc tableInfo thay đổi
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        sessionStorage.setItem('tableInfo', JSON.stringify(tableInfo));
    }, [cartItems, tableInfo]);

    const getAllTables = async () => {
        try {
            const tables = await serviceService.getAllTables();
            setAllTables(tables);
        } catch (error) {
            console.error('Error fetching all tables:', error);
        }
    };

    const allMenuItems = async () => {
        const data = await serviceService.getMenuItems();
        setMenuItems(data);

        if (data.length > 0) {
            const firstTypeId = data[0].typeId;
            handleButtonClick(firstTypeId);
        }
    };

    const handleButtonClick = async (typeId) => {
        const response = await serviceService.getServicesByType(typeId);
        setServices(response);
        setSelectedType(typeId);
        setCurrentPage(1);
    };

    const handleAddToCart = (service, quantity) => {
        const itemInCart = cartItems.find(item => item.service.serviceId === service.serviceId && item.isOrder === false);

        if (itemInCart) {
            setCartItems(cartItems.map(item =>
                item.service.serviceId === service.serviceId && item.isOrder === false
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
            return;
        } else {
            const newItem = {
                service: { ...service },
                isOrder: false,
                quantity: quantity,
                tableId: tableInfo?.tableId ?? null
            };
            setCartItems([...cartItems, newItem]);
            return;
        }

        const existingItem = cartItems.find(item => item.service.serviceId === service.serviceId && item.isOrder === true);

        if (existingItem) {
            const newItem = {
                service: { ...service },
                isOrder: false,
                quantity: quantity,
                tableId: tableInfo?.tableId ?? null
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    const handleStatusChange = (index) => {
        const updatedItems = [...cartItems];
        updatedItems[index] = { ...updatedItems[index], status: !updatedItems[index].status };
        setCartItems(updatedItems);
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity = newQuantity;
        setCartItems(updatedItems);
    };


    const handleDeleteCartItems = (updatedItems) => {
        setCartItems(updatedItems);
    };

    const handleSentBillDetail = (updatedItems) => {
        setCartItems(updatedItems);
    }

    const handleUpdateTableInfo = (table) => {
        setTableInfo(table);
        // Cập nhật danh sách bàn khi bàn đã thay đổi
        const updatedTables = allTables.map(t => t.tableId === table.tableId ? table : t);
        setAllTables(updatedTables);
    };

    return (
        <section className="ftco-section">
            <Container>
                <Row className="mt-4">
                    <ServiceTypes
                        menuItems={menuItems}
                        selectedType={selectedType}
                        handleButtonClick={handleButtonClick}
                        rangeValue={rangeValue}
                        setRangeValue={setRangeValue} // Truyền hàm setRangeValue
                    />
                    <ListServiceByType
                        services={services}
                        handleAddToCart={handleAddToCart}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        isTransitioning={isTransitioning}
                        setIsTransitioning={setIsTransitioning}
                        itemsPerPage={itemsPerPage}
                        rangeValue={rangeValue} // Truyền rangeValue vào component
                    />
                </Row>
                <ListBillDetails
                    cartItems={cartItems}
                    handleQuantityChange={handleQuantityChange}
                    handleStatusChange={handleStatusChange}
                    handleDeleteCartItems={handleDeleteCartItems}
                    handleSentBillDetail={handleSentBillDetail}
                    tableInfo={tableInfo}
                    allTables={allTables}
                    onUpdateTableInfo={handleUpdateTableInfo}
                />
            </Container>
        </section>
    );
};

export default Order;
