import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Plus, Trash2, Edit } from 'lucide-react';
import { Modal } from '../admin/Model';

const InventorySection = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        quantity: 0,
        minQuantity: 0,
        supplier: '',
        lastRestocked: '',
        unit: '',
        status: 'in-stock'
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:5000/inventory');
            setInventory(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItemSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/inventory', newItem);
            setInventory([...inventory, response.data]);
            setIsAddModalOpen(false);
            setNewItem({ name: '', category: '', quantity: 0, minQuantity: 0, supplier: '', lastRestocked: '', unit: '', status: 'in-stock' });
        } catch (err) {
            setError(err.message);
        }
    };

    const styles = {
        container: {
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            color: '#007bff',
            marginBottom: '1rem',
            fontSize: '2.5rem',
            fontWeight: 'bold',
        },
        buttonAdd: {
            backgroundColor: '#28a745',
            color: 'white',
            marginBottom: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '5px',
            transition: 'background-color 0.3s, transform 0.3s',
        },
        buttonAddHover: {
            backgroundColor: '#218838',
            transform: 'scale(1.05)',
        },
        tableResponsive: {
            overflowX: 'auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        tableCell: {
            border: '1px solid #dee2e6',
            padding: '0.75rem',
            textAlign: 'left',
            transition: 'background-color 0.3s',
        },
        tableCellHover: {
            backgroundColor: '#f1f1f1',
        },
        tableHeader: {
            backgroundColor: '#f8f9fa',
            fontWeight: 'bold',
        },
        badge: {
            padding: '0.5em',
            borderRadius: '0.25rem',
            fontSize: '0.9rem',
        },
        bgSuccess: {
            backgroundColor: '#28a745',
            color: 'white',
        },
        bgWarning: {
            backgroundColor: '#ffc107',
            color: 'black',
        },
        bgDanger: {
            backgroundColor: '#dc3545',
            color: 'white',
        },
        dFlex: {
            display: 'flex',
            gap: '0.5rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Inventory Management</h1>
            <button
                onClick={() => setIsAddModalOpen(true)}
                style={styles.buttonAdd}
                className="btn btn-success mb-3"
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = styles.buttonAddHover.backgroundColor;
                    e.target.style.transform = styles.buttonAddHover.transform;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = styles.buttonAdd.backgroundColor;
                    e.target.style.transform = 'scale(1)';
                }}
            >
                <Plus className="mr-2" /> Add New Item
            </button>

            {isAddModalOpen && (
                <Modal onClose={() => setIsAddModalOpen(false)}>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="h4 text-center">Add New Item</h2>
                            <form onSubmit={handleAddItemSubmit}>
                                <input type="text" className="form-control mb-2" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
                                <input type="text" className="form-control mb-2" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} required />
                                <input type="number" className="form-control mb-2" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })} required />
                                <input type="number" className="form-control mb-2" placeholder="Minimum Quantity" value={newItem.minQuantity} onChange={(e) => setNewItem({ ...newItem, minQuantity: Number(e.target.value) })} required />
                                <input type="text" className="form-control mb-2" placeholder="Supplier" value={newItem.supplier} onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })} required />
                                <input type="date" className="form-control mb-2" placeholder="Last Restocked" value={newItem.lastRestocked} onChange={(e) => setNewItem({ ...newItem, lastRestocked: e.target.value })} required />
                                <input type="text" className="form-control mb-2" placeholder="Unit" value={newItem.unit} onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })} required />
                                <select className="form-select mb-2" value={newItem.status} onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}>
                                    <option value="in-stock">In Stock</option>
                                    <option value="low-stock">Low Stock</option>
                                    <option value="out-of-stock">Out of Stock</option>
                                </select>
                                <button type="submit" className="btn btn-primary w-100">Add Item</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Inventory Table */}
            <div style={styles.tableResponsive}>
                <table style={styles.table} className="table table-hover table-bordered">
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.tableCell}>Name</th>
                            <th style={styles.tableCell}>Category</th>
                            <th style={styles.tableCell}>Quantity</th>
                            <th style={styles.tableCell}>Status</th>
                            <th style={styles.tableCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item._id} className="table-row" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.tableCellHover.backgroundColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <td style={styles.tableCell}>{item.name}</td>
                                <td style={styles.tableCell}>{item.category}</td>
                                <td style={styles.tableCell}>{item.quantity}</td>
                                <td style={styles.tableCell}>
                                    <span style={styles.badge} className={item.status === 'in-stock' ? styles.bgSuccess : item.status === 'low-stock' ? styles.bgWarning : styles.bgDanger}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={styles.tableCell}>
                                    <div style={styles.dFlex}>
                                        <button className="btn btn-outline-primary" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button className="btn btn-outline-danger" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventorySection;