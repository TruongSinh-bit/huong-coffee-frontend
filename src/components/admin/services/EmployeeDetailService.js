import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployee } from "../employee/getEmployee";
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!employeeId) {
            toast.error("Invalid employee ID.");
            setLoading(false);
            return;
        }

        const fetchEmployee = async () => {
            try {
                const data = await getEmployee(employeeId);
                setEmployee(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employee details:", error);
                setError(error);
                setLoading(false);
                toast.error("Error loading employee details.");
            }
        };

        fetchEmployee();
    }, [employeeId]);

    if (loading) return <div className="text-center mt-5"><p>Loading...</p></div>;
    if (error) return <div className="text-center mt-5"><p>Error loading employee details!</p></div>;

    return (
        <div className="main-content">
            <div className="section-body">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="card shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="mb-0">Employee Details</h4>
                                </div>
                                <div className="card-body">
                                    {employee ? (
                                        <div>
                                            <div className="text-center mb-4">
                                                {employee.imageUrl && (
                                                    <img
                                                        src={`/images/${employee.imageUrl}`}
                                                        alt={employee.fullName}
                                                        className="img-fluid rounded-circle"
                                                        style={{ maxWidth: '100px' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-5">
                                                    <p><strong>Full Name:</strong> {employee.fullName}</p>
                                                    <p><strong>Position:</strong> {employee.position.positionName}</p>
                                                    <p><strong>Email:</strong> {employee.email}</p>
                                                    <p><strong>Address:</strong> {employee.address}</p>
                                                    <p><strong>Phone:</strong> {employee.tel}</p>
                                                </div>
                                                <div className="col-12 col-md-7">
                                                    <p><strong>Birthday:</strong> {new Date(employee.birthday).toLocaleDateString()}</p>
                                                    <p><strong>Gender:</strong> {employee.gender}</p>
                                                    <p><strong>Salary:</strong> ${employee.salary}</p>
                                                    <p><strong>Note:</strong> {employee.note}</p>
                                                </div>
                                            </div>
                                            <div className="text-center mt-4">
                                                <button
                                                    className="btn btn-secondary me-2"
                                                    onClick={() => navigate(-1)}
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    className="btn btn-primary me-2"
                                                    onClick={() => navigate(`/edit-employee/${employeeId}`)}
                                                >
                                                    Update Information
                                                </button>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() =>  navigate(`/admin/change-password`)}
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No employee data found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
