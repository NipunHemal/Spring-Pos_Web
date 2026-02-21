# POS (Point of Sale) System - Frontend

A responsive jQuery-based Point of Sale system frontend that integrates with a backend API for customer, item, and order management.

## Features

- **Customer Management:** Add, view, update, and delete customers
- **Item Management:** Add, view, update, and delete items
- **Order Management:** Place orders with multiple items, apply discounts
- **Real-time Stock Updates:** View available stock while selecting items
- **Shopping Cart:** Add items, adjust quantities, remove items
- **Responsive Design:** Works on desktop and tablet devices

## Project Structure

```
pos/
├── index.html                  # Home page
├── API_DOCUMENTATION.md        # Complete API documentation
├── README.md                   # This file
├── css/
│   └── common.css             # Shared styles for all pages
├── js/
│   ├── customer.js            # Customer management with jQuery AJAX
│   ├── item.js                # Item management with jQuery AJAX
│   └── place-order.js         # Order placement with jQuery AJAX
└── pages/
    ├── customer.html          # Customer details page
    ├── item.html              # Item details page
    └── place-order.html       # Place order page
```

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API running on `http://localhost:8080/v1`
- jQuery 3.6.0 (loaded from CDN)

## Setup Instructions

### 1. Backend Setup

Make sure your backend API is running on `http://localhost:8080/v1`. The following endpoints must be available:

- **Customers:** GET, POST, PUT, DELETE `/customers` and `/customers/{id}`
- **Items:** GET, POST, PUT, DELETE `/items` and `/items/{code}`
- **Orders:** GET, POST, PUT, DELETE `/orders` and `/orders/{id}`

For more details, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### 2. Frontend Setup

1. Clone or download this project
2. Open `index.html` in your web browser
3. Navigate to the different pages using the navigation menu

```
No build process required! This is a vanilla HTML/CSS/jQuery project.
```

## Usage

### Customer Management

**Page:** `pages/customer.html`

#### Add a New Customer
1. Enter customer name, phone number, and address
2. Click "Save" button
3. Customer appears in the list below

#### Edit a Customer
1. Click "Edit" button on the customer in the list
2. Modify the details in the form
3. Click "Update" button

#### Delete a Customer
1. Click "Edit" button on the customer
2. Click "Delete" button
3. Confirm deletion

### Item Management

**Page:** `pages/item.html`

#### Add a New Item
1. Enter item code, name, unit price, quantity, and description (optional)
2. Click "Save" button
3. Item appears in the list below

#### Edit an Item
1. Click "Edit" button on the item in the list
2. Modify the details in the form
3. Click "Update" button

#### Delete an Item
1. Click "Edit" button on the item
2. Click "Delete" button
3. Confirm deletion

### Place Order

**Page:** `pages/place-order.html`

#### Place a New Order
1. Select a customer from the dropdown
2. Select an item and enter quantity
3. Click "Add to Cart" button
4. Review the item in the shopping cart
5. Repeat steps 2-4 for additional items
6. Review totals (subtotal and 5% discount applied)
7. Click "Place Order" button to confirm

#### Manage Cart
- **Remove Item:** Click "Remove" button on the item in the cart
- **Clear Cart:** Click "Clear Cart" button to remove all items
- **Modify Quantity:** Remove the item and add it again with the desired quantity

## API Integration

### Base URL
```
http://localhost:8080/v1
```

### Key JavaScript Functions

#### Customer Functions (customer.js)
```javascript
saveCustomer()           // Create new customer
loadAllCustomers()       // Load all customers
getCustomerById(id)      // Get customer details
updateCustomer()         // Update customer
deleteCustomer()         // Delete customer
```

#### Item Functions (item.js)
```javascript
saveItem()               // Create new item
loadAllItems()           // Load all items
getItemById(id)          // Get item details
updateItem()             // Update item
deleteItem()             // Delete item
```

#### Order Functions (place-order.js)
```javascript
loadCustomersForDropdown()   // Load customers for dropdown
loadItemsForDropdown()       // Load items for dropdown
addToCart()                  // Add item to cart
removeFromCart(index)        // Remove item from cart
placeOrder()                 // Place order
```

## Troubleshooting

### Items not loading
1. Verify backend API is running on `http://localhost:8080/v1`
2. Check browser console for CORS errors
3. Ensure backend allows requests from your origin
4. Check network tab in browser developer tools

### Customer not appearing after save
1. Verify the API response is successful
2. Check browser console for AJAX errors
3. Ensure the backend is saving data correctly
4. Refresh the page and reload data

### Stock showing as unavailable
1. Verify items exist in the backend database
2. Check quantity on hand in the item details
3. Ensure item code matches in the dropdown

### Cart calculations wrong
1. Check the item unit price in the backend
2. Verify quantity is correct
3. Ensure 5% discount is being applied correctly

## Customization

### Change API Base URL
Edit the `BASE_URL` variables in each JavaScript file:
- `customer.js`: `const BASE_URL = "your_url/customers"`
- `item.js`: `const BASE_URL_ITEMS = "your_url/items"`
- `place-order.js`: Update `BASE_URL_*` variables

### Change Discount Percentage
In `place-order.js`, find the `updateTotals()` function and change:
```javascript
const discount = subTotal * 0.05; // Change 0.05 to desired percentage
```

### Modify Styling
Edit `css/common.css` to customize colors, fonts, and layout.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- [jQuery 3.6.0](https://code.jquery.com/) - Loaded from CDN
- No other external dependencies

## Future Enhancements

- [ ] Add authentication/login system
- [ ] Add order history and search
- [ ] Add customer address book
- [ ] Add payment integration
- [ ] Add receipt printing
- [ ] Add barcode scanning
- [ ] Add inventory management dashboard
- [ ] Add sales reports

## License

This project is provided as-is for educational purposes.

## Support

For issues or questions:
1. Check the [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
2. Review browser console errors
3. Verify backend API responses using cURL or Postman
4. Check network requests in browser developer tools

## Author

Developed for IJSE - Advanced Application Development (AAD) Course

---

**Last Updated:** February 12, 2026
