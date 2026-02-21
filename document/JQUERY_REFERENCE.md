# jQuery Functions Quick Reference

## Customer Management (customer.js)

### Public Functions

| Function | Purpose | Called From |
|----------|---------|------------|
| `saveCustomer()` | Create new customer | Form submit event |
| `loadAllCustomers()` | Fetch all customers | Page load, after save/update/delete |
| `getCustomerById(id)` | Fetch specific customer | Edit button click |
| `updateCustomer()` | Update existing customer | Update button click |
| `deleteCustomer()` | Delete customer | Delete button click |
| `handleEdit(id)` | Handle edit button | Edit button onclick |
| `handleDelete(id)` | Handle delete button | Delete button onclick |
| `clearFormFields()` | Reset form inputs | After successful operation |

### AJAX Endpoints

```javascript
// POST /customers - Create
$.ajax({
  url: "http://localhost:8080/v1/customers",
  method: "POST",
  data: { customerName, phoneNumber, address }
});

// GET /customers - List All
$.ajax({
  url: "http://localhost:8080/v1/customers",
  method: "GET"
});

// GET /customers/{id} - Get by ID
$.ajax({
  url: "http://localhost:8080/v1/customers/{customerId}",
  method: "GET"
});

// PUT /customers/{id} - Update
$.ajax({
  url: "http://localhost:8080/v1/customers/{customerId}",
  method: "PUT",
  data: { customerId, customerName, phoneNumber, address }
});

// DELETE /customers/{id} - Delete
$.ajax({
  url: "http://localhost:8080/v1/customers/{customerId}",
  method: "DELETE"
});
```

### HTML Elements Used

| Element ID | Type | Used By |
|-----------|------|---------|
| `customerForm` | Form | Form submission handler |
| `name` | Input | Customer name field |
| `phone` | Input | Phone number field |
| `address` | Textarea | Address field |
| `customerTable` | Table | Dynamic table loading |
| `.btn-warning` | Button | Update customer |
| `.btn-danger` | Button | Delete customer |

### Event Listeners

```javascript
// Form submission
$("#customerForm").on("submit", function(e) { ... });

// Update button
$(".btn-warning").on("click", function() { ... });

// Delete button
$(".btn-danger").on("click", function() { ... });
```

---

## Item Management (item.js)

### Public Functions

| Function | Purpose | Called From |
|----------|---------|------------|
| `saveItem()` | Create new item | Form submit event |
| `loadAllItems()` | Fetch all items | Page load, after save/update/delete |
| `getItemById(id)` | Fetch specific item | Edit button click |
| `updateItem()` | Update existing item | Update button click |
| `deleteItem()` | Delete item | Delete button click |
| `handleItemEdit(id)` | Handle edit button | Edit button onclick |
| `handleItemDelete(id)` | Handle delete button | Delete button onclick |
| `clearItemFormFields()` | Reset form inputs | After successful operation |

### AJAX Endpoints

```javascript
// POST /items - Create
$.ajax({
  url: "http://localhost:8080/v1/items",
  method: "POST",
  data: { itemCode, itemName, unitPrice, quantityOnHand, description }
});

// GET /items - List All
$.ajax({
  url: "http://localhost:8080/v1/items",
  method: "GET"
});

// GET /items/{code} - Get by Code
$.ajax({
  url: "http://localhost:8080/v1/items/{itemCode}",
  method: "GET"
});

// PUT /items/{code} - Update
$.ajax({
  url: "http://localhost:8080/v1/items/{itemCode}",
  method: "PUT",
  data: { itemCode, itemName, unitPrice, quantityOnHand, description }
});

// DELETE /items/{code} - Delete
$.ajax({
  url: "http://localhost:8080/v1/items/{itemCode}",
  method: "DELETE"
});
```

### HTML Elements Used

| Element ID | Type | Used By |
|-----------|------|---------|
| `itemForm` | Form | Form submission handler |
| `code` | Input | Item code field |
| `name` | Input | Item name field |
| `price` | Input | Unit price field |
| `qty` | Input | Quantity field |
| `description` | Textarea | Description field |
| `itemTable` | Table | Dynamic table loading |
| `.btn-warning` | Button | Update item |
| `.btn-danger` | Button | Delete item |

---

## Order Management (place-order.js)

### Public Functions

| Function | Purpose | Called From |
|----------|---------|------------|
| `loadCustomersForDropdown()` | Load customers for dropdown | Page load |
| `loadItemsForDropdown()` | Load items for dropdown | Page load |
| `getSelectedCustomerDetails(id)` | Get full customer details | Customer dropdown change |
| `getSelectedItemDetails(code)` | Get full item details | Item dropdown change |
| `addToCart()` | Add item to shopping cart | Add to Cart button |
| `removeFromCart(index)` | Remove item from cart | Remove button in cart |
| `clearCart()` | Clear entire cart | Clear Cart button |
| `updateCartDisplay()` | Update cart table | After cart changes |
| `updateTotals()` | Calculate & display totals | After cart changes |
| `placeOrder()` | Submit order to backend | Place Order button |
| `resetOrderForm()` | Reset entire order form | After order placed |

### AJAX Endpoints

```javascript
// GET /customers - Load for dropdown
$.ajax({
  url: "http://localhost:8080/v1/customers",
  method: "GET"
});

// GET /items - Load for dropdown
$.ajax({
  url: "http://localhost:8080/v1/items",
  method: "GET"
});

// GET /customers/{id} - Get customer details
$.ajax({
  url: "http://localhost:8080/v1/customers/{customerId}",
  method: "GET"
});

// GET /items/{code} - Get item details
$.ajax({
  url: "http://localhost:8080/v1/items/{itemCode}",
  method: "GET"
});

// POST /orders - Place order
$.ajax({
  url: "http://localhost:8080/v1/orders",
  method: "POST",
  data: { customerId, orderDetails: [...], subTotal, discount, total }
});
```

### HTML Elements Used

| Element ID | Type | Used By |
|-----------|------|---------|
| `customerSelect` | Select | Customer dropdown |
| `itemSelect` | Select | Item dropdown |
| `qtyInput` | Input | Quantity input |
| `selectedCustomer` | Div | Display selected customer |
| `availableStock` | Div | Display available stock |
| `cartTable` | Table | Shopping cart |
| `cartBody` | Tbody | Cart table body |
| `subTotal` | Span | Subtotal display |
| `discount` | Span | Discount display |
| `total` | Span | Total display |

### Event Listeners

```javascript
// Customer dropdown change
$(document).on("change", "#customerSelect", function() { ... });

// Item dropdown change
$(document).on("change", "#itemSelect", function() { ... });

// Add to Cart button
$(document).on("click", ".btn-primary", function() { ... });
```

---

## Common jQuery Patterns Used

### AJAX POST Request
```javascript
$.ajax({
  url: "http://localhost:8080/v1/customers",
  method: "POST",
  contentType: "application/json",
  data: JSON.stringify({ customerName, phoneNumber, address }),
  success: function(response) {
    alert("Success!");
    loadAllCustomers();
  },
  error: function(error) {
    console.error("Error:", error);
    alert("Failed!");
  }
});
```

### AJAX GET Request
```javascript
$.ajax({
  url: "http://localhost:8080/v1/customers",
  method: "GET",
  dataType: "json",
  success: function(data) {
    populateCustomerTable(data);
  },
  error: function(error) {
    console.error("Error:", error);
  }
});
```

### Form Value Retrieval
```javascript
const name = $("#name").val().trim();
const phone = $("#phone").val().trim();
```

### Dynamic Table Rendering
```javascript
customers.forEach(function(customer) {
  const row = `
    <tr>
      <td>${customer.customerId}</td>
      <td>${customer.customerName}</td>
      <td><button onclick="handleEdit('${customer.customerId}')">Edit</button></td>
    </tr>
  `;
  tbody.append(row);
});
```

### Event Delegation
```javascript
$(document).on("change", "#customerSelect", function() {
  // This works even if #customerSelect is added dynamically
});
```

### Form Reset
```javascript
$("#customerForm")[0].reset();  // Vanilla JS method
// or
$("#customerForm").trigger("reset");  // jQuery method
```

### Array Find
```javascript
const customer = customers.find(c => c.customerId === id);
```

### Array Filter & Reduce
```javascript
const subTotal = cart.reduce((sum, item) => 
  sum + (item.unitPrice * item.quantity), 0
);
```

---

## Error Handling Pattern

```javascript
$.ajax({
  url: BASE_URL,
  method: "GET",
  success: function(response) {
    // Handle successful response
    populateTable(response);
  },
  error: function(error) {
    // Handle error
    console.error("Error details:", error);
    
    // Show error message
    if (error.responseJSON && error.responseJSON.message) {
      alert("Error: " + error.responseJSON.message);
    } else {
      alert("An error occurred");
    }
    
    // Fallback to sample data if API unavailable
    populateTable(getSampleData());
  }
});
```

---

## Data Transformation

### Customer Field Mapping
```javascript
// Backend response fields
{
  "customerId": "C001",
  "customerName": "John",
  "phoneNumber": "1234567890",
  "address": "123 Main St"
}

// Frontend uses
customer.customerId    // or customer.id (fallback)
customer.customerName  // or customer.name (fallback)
customer.phoneNumber   // or customer.phone (fallback)
customer.address
```

### Item Field Mapping
```javascript
// Backend response fields
{
  "itemCode": "I001",
  "itemName": "Mouse",
  "description": "Wireless mouse",
  "unitPrice": 100.00,
  "quantityOnHand": 10
}

// Frontend uses
item.itemCode          // or item.code (fallback)
item.itemName          // or item.name (fallback)
item.description
item.unitPrice         // or item.price (fallback)
item.quantityOnHand    // or item.qty/stock (fallback)
```

---

## jQuery Selectors Cheat Sheet

```javascript
// By ID
$("#customerId")

// By Class
$(".btn-primary")

// By Attribute
$("input[type='text']")
$("button[onclick]")

// Direct
$("#customerForm")[0]  // Get DOM element

// Find elements
$("#cartBody").find("tr")
$("#customerForm").find("input")

// Parent/Child navigation
$(this).closest("form")
$(this).parent()

// Direct assignment
$("#total").text(value)
$("#total").val(value)  // For inputs
$("#total").html("<strong>Value</strong>")
```

---

**Last Updated:** February 12, 2026
