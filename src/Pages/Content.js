import {useNavigate}  from 'react-router-dom';
import ItemsTable from './ItemsTable';
import SearchItem from './SearchItem';
import { FaCartArrowDown } from "react-icons/fa";


const Content = ({categoryId, items, handleDelete, search, setSearch, handleAddToCart }) => {
    const navigate = useNavigate();
    const goToAddItem = () => {
        navigate('/addItem', { state: { categoryId } });
    };
    return (
        <main>
            <SearchItem search={search} setSearch={setSearch} />
            <div className='Content-Buttons'>
                <button className="backButton" onClick={() => navigate('/')}>Back</button>
                <button className="addItems" onClick={goToAddItem}>Add Items</button>
                <button className="cartButton" onClick={() => navigate('/cart')}><FaCartArrowDown /></button>
            </div>
            <ItemsTable 
                items={items}
                handleDelete={handleDelete}
                handleAddToCart={handleAddToCart}
            />
            
        </main>
    )
}

export default Content