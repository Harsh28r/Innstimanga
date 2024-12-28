import React from 'react';

export const Modal = ({ onClose, children }) => {
    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog" style={{ maxWidth: '900px', margin: '1.75rem auto' }}>
                <div className="modal-content" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)', transition: 'transform 0.3s ease' }}>
                    <div className="modal-header" style={{ backgroundColor: '#0056b3', color: '#fff', borderBottom: '2px solid #dee2e6', position: 'relative' }}>
                        <h2 className="modal-title" style={{ fontWeight: 'bold' }}>Modal Title</h2>
                        <button
                            onClick={onClose}
                            className="close"
                            aria-label="Close"
                            style={{ 
                                transition: 'color 0.2s', 
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ padding: '30px', backgroundColor: '#f9f9f9', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                       
                       
                       
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;