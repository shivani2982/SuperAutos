
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {useNavigate}  from 'react-router-dom';

const EditItem = ({items, handleEdit, editName, setEditName, editQty, setEditQty, editPrice, setEditPrice,}) => {
    const { id } = useParams();
    const item = items.find(item => (item._id).toString() === id);

    useEffect(() => {
        if (item) {
            setEditName(item.name);
            setEditQty(item.quantity);
            setEditPrice(item.price);
        }
    }, [item, setEditName, setEditQty, setEditPrice])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        handleEdit(item._id, editName, editQty, editPrice, item.category_id);
        navigate('/content');
    };

    return (
        <main className="NewItem">
            {editName &&
                <>
                    <h2>Edit Item</h2>
                    <form className="addItemForm" onSubmit={onSubmit}>
                        <label htmlFor='itemName'>Name: </label>
                        <input 
                            id='itemName'
                            required
                            type='Text'
                            placeholder="Item Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <label htmlFor='itemQty'>Quantity: </label>
                        <input 
                            id='itemQty'
                            required
                            type='number'
                            value={editQty}
                            onChange={(e) => setEditQty(e.target.value)}
                        />
                        <label htmlFor='itemPrice'>Price: </label>
                        <input 
                            id='itemPrice'
                            required
                            type='number'
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                        />
                        <button type='submit'>Edit</button>
                    </form>
                </>
            }
            {!editName &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditItem
