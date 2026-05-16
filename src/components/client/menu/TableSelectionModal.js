import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const TableSelectionModal = ({ show, onHide, tables, onSelectTable }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Chọn Bàn</Modal.Title> {/* Thêm style */}
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {tables.length > 0 ? (
                        tables.map((table) => (
                            <Col xs={6} sm={4} md={3} lg={3} key={table.tableId} className="mb-3">
                                <Button
                                    variant={table.on ? 'success' : 'secondary'}
                                    className="w-100"
                                    onClick={() => table.on && onSelectTable(table)} // Chọn bàn chỉ khi trạng thái là true
                                    disabled={!table.on}
                                >
                                    <div><strong>Mã Bàn:</strong> {table.code}</div>
                                    <div><strong>Trạng Thái:</strong> {table.on ? "Trống" : "Đã đặt"}</div>
                                </Button>
                            </Col>
                        ))
                    ) : (
                        <div>Không có bàn nào.</div>
                    )}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TableSelectionModal;
