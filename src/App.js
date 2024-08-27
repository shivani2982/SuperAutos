import Header from "./Pages/Header";
import Content from "./Pages/Content";
import AddItem from "./Pages/AddItem";
import EditItem from './Pages/EditItem'
import Home from "./Pages/Home";
import Cart from './Pages/Cart';
import GenerateBill from "./Pages/GenerateBill";
import BillPreview from "./Pages/BillPreview";
import Login from "./Pages/Login";
import api from './api/items' 
import { Route, Routes , useNavigate}  from 'react-router-dom';
import { useState, useEffect } from 'react';
import { showPopupMessage } from "./Pages/popup";

function App() {
  const [items,setItems]=useState([])  
  const [itemName, setItemName] =useState('')
  const [itemQty, setItemQty] =useState('')
  const [itemPrice, setItemPrice] =useState('')
  const [editName, setEditName] =useState('')
  const [editQty, setEditQty] =useState('')
  const [editPrice, setEditPrice] =useState('')
  const [search,setSearch]=useState('')
  const [searchResult, setSearchResult] =useState([])
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryId, setCategoryId] = useState(null); 
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        setItems(JSON.parse(storedItems));
    } else {
        const fetchItems = async () => {
            try {
                const response = await api.get('/items');
                setItems(response.data);
                localStorage.setItem('items', JSON.stringify(response.data));
            } catch (err) {
                console.error('Error fetching items:', err.message);
            }
        };
        fetchItems();
    }
  }, []);

  useEffect(() => {
      if (items.length > 0) {
          localStorage.setItem('items', JSON.stringify(items));
      }
  }, [items]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
          const response = await api.get('/items', { params: { category_id: categoryId } });
          setItems(response.data);
      } catch (err) {
          console.error('Error fetching items:', err.message);
      }
    };
    if (categoryId) {
        fetchItems();
    }
  }, [categoryId]);
   
  useEffect(() => {
    if (categoryId) {
      const filteredByCategory = items.filter(item => item.category_id === categoryId);
      setFilteredItems(filteredByCategory); 
      console.log("Filtered items:", filteredByCategory);
    } else {
      setFilteredItems(items);
    }
  }, [items, categoryId]);

  useEffect(()=>{
    const filteredResults = filteredItems.filter(item => 
    ((item.name).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filteredResults)
  },[filteredItems, search]) 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        setCartItems(response.data);
        console.log('Fetched cart items:', response.data); 
      } catch (err) {
        console.error('Error fetching cart items:', err.message);
      }
    };
  
    fetchCartItems();
  }, []);

  

  const handleAddItem = async(name,quantity,price,category_id) => {
    const newItem = { name,quantity,price,category_id:categoryId}
    try{
      const response = await api.post('/items', newItem) 
      const listItems = [...items, response.data]
      setItems(listItems)
      setItemName('')
      setItemQty('')
      setItemPrice('')
      navigate('/content')
      showPopupMessage('Item added successfully!', 'success', setPopupMessage, setShowPopup);
    }
    catch(err) {
      console.error('Error adding item:', err.message);
      showPopupMessage('Failed to add item. Please try again.', 'error',setPopupMessage, setShowPopup);
    }
  }

  const handleEdit = async(id, name, quantity, price, category_id) => { 
    const updatedItem = {name:editName, quantity:parseInt(editQty), price:parseInt(editPrice), category_id };
    try {
      const response = await api.put(`/items/${id}`, updatedItem);
      const updatedItems = items.map(item => item._id.toString() === id ? response.data : item)
      setItems(updatedItems);
      setFilteredItems(updatedItems.filter(item => item.category_id === categoryId));
      setEditName('');
      setEditQty('');
      setEditPrice('');
      navigate('/content');
      showPopupMessage('Item edited sucessfully!', 'success',setPopupMessage, setShowPopup);
    }
    catch(err) {
      console.error('Error Editing item:', err.message);
      showPopupMessage('Failed to edit item. Please try again.', 'error',setPopupMessage, setShowPopup);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      const updatedItems = items.filter(item => item._id.toString() !== id.toString());
      setItems(updatedItems);
      setFilteredItems(updatedItems.filter(item => item.category_id === categoryId));
      navigate('/content');
      showPopupMessage('Item deleted!', 'success', setPopupMessage, setShowPopup);
    } catch (err) {
      console.error('Error Deleteing item:', err.message);
      showPopupMessage('Failed to delete item. Please try again.', 'error',setPopupMessage, setShowPopup);
    }
  };

  const filterItemsByCategory = (category_id) => {
    setCategoryId(category_id);
    navigate('/content');
  };

  const handleAddToCart = async (item, quantity = 1) => {
    const itemData = {
      item_id: item._id, 
      quantity
    };
  
    try {
      const response = await api.post('/cart/add', itemData);
      console.log(response.data)

      setCartItems(prevCartItems => {
        const existingItemIndex = prevCartItems.findIndex(cartItem => cartItem._id === response.data._id);
        if (existingItemIndex !== -1) {
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex] = response.data;
          setCartItems(updatedCartItems);
        } else {
          setCartItems([...prevCartItems, response.data]);
        }
      })
      setItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem._id === item._id ? { ...prevItem, quantity: prevItem.quantity - quantity } : prevItem
        )
      );
      showPopupMessage('Item added to cart!', 'success', setPopupMessage, setShowPopup);
    } catch (err) {
      console.error('Error adding to cart:', err.message);
      showPopupMessage('Failed to add item to cart. Please try again.', 'error',setPopupMessage, setShowPopup);
    }
  };
  
  const handleRemoveFromCart = async (cartItem) => {
    try {
      await api.delete(`/cart/${cartItem._id}`);
      const updatedCartItems = cartItems.filter(item => item._id !== cartItem._id);
      setCartItems(updatedCartItems);
      setItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem._id === cartItem.item_id._id 
            ? { ...prevItem, quantity: prevItem.quantity + cartItem.quantity } 
            : prevItem
        )
      );
      showPopupMessage('Item removed from cart!', 'success', setPopupMessage, setShowPopup);
    } catch (err) {
      console.error('Error removing item from cart:', err.message);
      showPopupMessage('Failed to remove item from cart. Please try again.', 'error',setPopupMessage, setShowPopup);
    }
  };

  const handleUpdateCartQuantity = async (itemId, newQuantity) => {
    try {
      const response = await api.put(`/cart/${itemId}`, { quantity: newQuantity });
      const updatedCartItem = response.data;
      
      setCartItems(prevCartItems => 
        prevCartItems.map(item => 
          item._id === itemId ? updatedCartItem : item
        )
      );
      setItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem._id === updatedCartItem.item_id._id 
            ? { ...prevItem, quantity: prevItem.quantity - (newQuantity - updatedCartItem.quantity) } 
            : prevItem
        )
      );
    } catch (err) {
      console.error('Error updating cart item quantity:', err.message);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      if (item.item_id && item.item_id.price && item.quantity) {
        return total + item.item_id.price * item.quantity;
      }
      return total;
    }, 0);
  };
  
  return (
    <div className="App">
      <Header />
      {showPopup && (
          <div className={`popup ${popupMessage.type}`}>
            {popupMessage.text} {/* This is correct */}
          </div>
        )
      }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home filterItemsByCategory={filterItemsByCategory} />} />
        <Route path="/content" 
          element={<Content 
                      items={searchResult} 
                      categoryId={categoryId}
                      handleDelete={handleDelete} 
                      search={search} 
                      setSearch={setSearch} 
                      handleAddToCart={handleAddToCart}
                  />} 
        />
        <Route path="/addItem" 
          element={<AddItem 
                      handleAddItem={handleAddItem} 
                      itemName={itemName}
                      setItemName={setItemName}
                      itemQty={itemQty} 
                      setItemQty={setItemQty}
                      itemPrice={itemPrice}
                      setItemPrice={setItemPrice}
                  />} 
        />
        <Route path="/editItem/:id" 
          element={<EditItem 
                      items={filteredItems}
                      handleEdit={handleEdit} 
                      editName={editName}
                      setEditName={setEditName}
                      editQty={editQty} 
                      setEditQty={setEditQty}
                      editPrice={editPrice} 
                      setEditPrice={setEditPrice}
                  />} 
        />
        <Route path="/cart" 
          element={<Cart 
                      cartItems={cartItems} 
                      handleRemoveFromCart={handleRemoveFromCart} 
                      calculateTotalAmount={calculateTotalAmount}
                      setCartItems={setCartItems} 
                      handleUpdateCartQuantity={handleUpdateCartQuantity}
                  />} 
        />
        <Route path="/generateBill" 
          element={<EditItem 
                      items={filteredItems}
                      handleEdit={handleEdit} 
                      editName={editName}
                      setEditName={setEditName}
                      editQty={editQty} 
                      setEditQty={setEditQty}
                      editPrice={editPrice} 
                      setEditPrice={setEditPrice}
                  />} 
        />
        <Route path="/generate-bill" element={<GenerateBill />} />
        <Route path="/generate-bill/:billId" element={<BillPreview />} />
      </Routes>
    </div>
  );
}


export default App;
