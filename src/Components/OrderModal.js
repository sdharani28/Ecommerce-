import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Modal.setAppElement('#yourAppElement');

const OrderModal = ({ showModal, setShowModal, placeOrder }) => {
    let subtitle;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");

    function openModal() {
        setShowModal(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const addressInfo = {
                name,
                address,
                pincode,
                phone,
            }
            placeOrder(addressInfo);
            closeModal();
        } catch (error) {
            console.error(`Error in adding address : ${error}`);
            closeModal();
        }
    }

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={showModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='modal-header'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add your address</h2>
                </div>
                <form className='modal-form' onSubmit={handleSubmit} >
                    <input className="form-control" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea className="form-control" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type={"number"} className="form-control" placeholder="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                    <input type={"number"} className="form-control" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <div className='modal-btn-wrapper'>
                        <button className="my-3" type="button" onClick={closeModal}>Close</button>
                        <button className="my-3" type='submit' >Order</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default OrderModal;