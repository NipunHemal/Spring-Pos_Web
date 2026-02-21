# Frontend-Backend Integration Guide

## Overview

This document maps the frontend jQuery implementation to the backend API endpoints using the official API documentation (`/api/v1`).

---

## Base Configuration

### Frontend Base URLs
```javascript
// customer.js
const BASE_URL = "http://localhost:8080/api/v1/customers";

// item.js
const BASE_URL_ITEMS = "http://localhost:8080/api/v1/items";

// place-order.js
const BASE_URL_CUSTOMERS = "http://localhost:8080/api/v1/customers";
const BASE_URL_ITEMS = "http://localhost:8080/api/v1/items";
const BASE_URL_ORDERS = "http://localhost:8080/api/v1/orders";
```

---

## Customer Management Integration

### 1. Get All Customers

**Frontend Function:** `loadAllCustomers()`

**Backend Endpoint:** `GET /api/v1/customers`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/customers",
    method: "GET",
    dataType: "json",
    success: function(customers) {
        populateCustomerTable(customers);
    }
});
```

**Backend Response (200 OK):**
```json
[
  {
    "customerId": "C001",
    "customerName": "Hemal",
    "phoneNumber": "0776655444",
    "address": "No.34, Galle Road, Colombo 03"
  }
]
```

**DTO Mapping:** `CustomerDto`

---

### 2. Get Customer by ID

**Frontend Function:** `getCustomerById(customerId)`

**Backend Endpoint:** `GET /api/v1/customers/{customerId}`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/customers/" + customerId,
    method: "GET",
    dataType: "json",
    success: function(customer) {
        populateFormWithCustomer(customer);
        selectedCustomerId = customerId;
    }
});
```

**Backend Response (200 OK):**
```json
{
  "customerId": "C001",
  "customerName": "Hemal",
  "phoneNumber": "0776655444",
  "address": "No.34, Galle Road, Colombo 03"
}
```

**DTO Mapping:** `CustomerDto`

---

### 3. Create New Customer

**Frontend Function:** `saveCustomer()`

**Backend Endpoint:** `POST /api/v1/customers`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        customerName: name,
        phoneNumber: phone,
        address: address
    }),
    success: function(response) {
        alert("Customer saved successfully!");
        clearFormFields();
        loadAllCustomers();
    }
});
```

**Request Body (from form):**
```json
{
  "customerName": "John Doe",
  "phoneNumber": "0123456789",
  "address": "123 Main Street, City"
}
```

**Backend Response (201 Created):**
```json
{
  "customerId": "C004",
  "customerName": "John Doe",
  "phoneNumber": "0123456789",
  "address": "123 Main Street, City"
}
```

**DTO Mapping:** `CustomerDto`

**Form Fields Used:**
- `#name` → `customerName`
- `#phone` → `phoneNumber`
- `#address` → `address`

---

### 4. Update Customer

**Frontend Function:** `updateCustomer()`

**Backend Endpoint:** `PUT /api/v1/customers/{customerId}`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/customers/" + selectedCustomerId,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
        customerId: selectedCustomerId,
        customerName: name,
        phoneNumber: phone,
        address: address
    }),
    success: function(response) {
        alert("Customer updated successfully!");
        clearFormFields();
        selectedCustomerId = null;
        loadAllCustomers();
    }
});
```

**Request Body (from form):**
```json
{
  "customerId": "C001",
  "customerName": "Hemal Updated",
  "phoneNumber": "0776655444",
  "address": "No.34, Galle Road, Colombo 03"
}
```

**Backend Response (200 OK):** Updated `CustomerDto`

**DTO Mapping:** `CustomerDto`

---

### 5. Delete Customer

**Frontend Function:** `deleteCustomer()`

**Backend Endpoint:** `DELETE /api/v1/customers/{customerId}`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/customers/" + selectedCustomerId,
    method: "DELETE",
    contentType: "application/json",
    success: function(response) {
        alert("Customer deleted successfully!");
        clearFormFields();
        selectedCustomerId = null;
        loadAllCustomers();
    }
});
```

**Backend Response (204 No Content):** No body

**Error Response (404 Not Found):**
```json
{ "message": "Customer not found" }
```

---

## Item Management Integration

### 1. Get All Items

**Frontend Function:** `loadAllItems()`

**Backend Endpoint:** `GET /api/v1/items`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/items",
    method: "GET",
    dataType: "json",
    success: function(items) {
        populateItemTable(items);
        if (typeof populateItemDropdown === 'function') {
            populateItemDropdown(items);
        }
    }
});
```

**Backend Response (200 OK):**
```json
[
  {
    "itemCode": "I001",
    "itemName": "Mouse",
    "description": "Wireless optical mouse with USB receiver",
    "unitPrice": 100.00,
    "quantityOnHand": 10
  }
]
```

**DTO Mapping:** `ItemDto`

---

### 2. Get Item by Code

**Frontend Function:** `getItemById(itemCode)`

**Backend Endpoint:** `GET /api/v1/items/{itemCode}`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/items/" + itemCode,
    method: "GET",
    dataType: "json",
    success: function(item) {
        populateItemFormWithData(item);
        selectedItemId = itemCode;
    }
});
```

**Backend Response (200 OK):**
```json
{
  "itemCode": "I001",
  "itemName": "Mouse",
  "description": "Wireless optical mouse with USB receiver",
  "unitPrice": 100.00,
  "quantityOnHand": 10
}
```

**DTO Mapping:** `ItemDto`

---

### 3. Create New Item

**Frontend Function:** `saveItem()`

**Backend Endpoint:** `POST /api/v1/items`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/items",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        itemCode: code,
        itemName: name,
        unitPrice: price,
        quantityOnHand: qty,
        description: description
    }),
    success: function(response) {
        alert("Item saved successfully!");
        clearItemFormFields();
        loadAllItems();
    }
});
```

**Request Body (from form):**
```json
{
  "itemCode": "I004",
  "itemName": "USB Cable",
  "description": "High-speed USB 3.0 cable",
  "unitPrice": 50.00,
  "quantityOnHand": 100
}
```

**Backend Response (201 Created):**
```json
{
  "itemCode": "I004",
  "itemName": "USB Cable",
  "description": "High-speed USB 3.0 cable",
  "unitPrice": 50.00,
  "quantityOnHand": 100
}
```

**DTO Mapping:** `ItemDto`

**Form Fields Used:**
- `#code` → `itemCode`
- `#name` → `itemName`
- `#price` → `unitPrice`
- `#qty` → `quantityOnHand`
- `#description` → `description`

---

### 4. Update Item

**Frontend Function:** `updateItem()`

**Backend Endpoint:** `PUT /api/v1/items/{itemCode}`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/items/" + selectedItemId,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
        itemCode: code,
        itemName: name,
        unitPrice: price,
        quantityOnHand: qty,
        description: description
    }),
    success: function(response) {
        alert("Item updated successfully!");
        clearItemFormFields();
        selectedItemId = null;
        loadAllItems();
    }
});
```

**Request Body (from form):**
```json
{
  "itemCode": "I001",
  "itemName": "Mouse Updated",
  "description": "Wireless optical mouse with USB receiver",
  "unitPrice": 120.00,
  "quantityOnHand": 15
}
```

**Backend Response (200 OK):** Updated `ItemDto`

**DTO Mapping:** `ItemDto`

---

### 5. Delete Item

**Frontend Function:** `deleteItem()`

**Backend Endpoint:** `DELETE /api/v1/items/{itemCode}`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/items/" + selectedItemId,
    method: "DELETE",
    contentType: "application/json",
    success: function(response) {
        alert("Item deleted successfully!");
        clearItemFormFields();
        selectedItemId = null;
        loadAllItems();
    }
});
```

**Backend Response (204 No Content):** No body

**Error Response (404 Not Found):**
```json
{ "message": "Item not found" }
```

---

## Order Management Integration

### 1. Get All Orders

**Frontend Function:** `loadOrdersForDashboard()` (if needed)

**Backend Endpoint:** `GET /api/v1/orders`

**Frontend Code (if implemented):**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/orders",
    method: "GET",
    dataType: "json",
    success: function(orders) {
        populateOrdersTable(orders);
    }
});
```

**Backend Response (200 OK):**
```json
[
  {
    "orderId": "ORD001",
    "customerId": "C001",
    "orderDate": "2024-02-12",
    "subTotal": 1000.00,
    "discount": 50.00,
    "total": 950.00,
    "orderDetails": [
      {
        "itemCode": "I001",
        "quantity": 5,
        "unitPrice": 100.00
      }
    ]
  }
]
```

**DTO Mapping:** `OrdersDto` with nested `OrderDetailDto[]`

---

### 2. Place New Order

**Frontend Function:** `placeOrder()`

**Backend Endpoint:** `POST /api/v1/orders`

**Frontend Code:**
```javascript
const orderData = {
    customerId: customerId,
    orderDetails: cart.map((item) => ({
        itemCode: item.code,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
    })),
    subTotal: subTotal,
    discount: discount,
    total: orderTotal,
};

$.ajax({
    url: "http://localhost:8080/api/v1/orders",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(orderData),
    success: function(response) {
        alert("Order placed successfully!");
        console.log("Order Response:", response);
        resetOrderForm();
    }
});
```

**Request Body (from cart):**
```json
{
  "customerId": "C001",
  "orderDetails": [
    {
      "itemCode": "I001",
      "quantity": 2,
      "unitPrice": 100.00
    },
    {
      "itemCode": "I002",
      "quantity": 1,
      "unitPrice": 200.00
    }
  ],
  "subTotal": 400.00,
  "discount": 20.00,
  "total": 380.00
}
```

**Backend Response (201 Created):**
```json
{
  "orderId": "ORD002",
  "customerId": "C001",
  "orderDate": "2024-02-12",
  "subTotal": 400.00,
  "discount": 20.00,
  "total": 380.00,
  "orderDetails": [
    {
      "itemCode": "I001",
      "quantity": 2,
      "unitPrice": 100.00
    },
    {
      "itemCode": "I002",
      "quantity": 1,
      "unitPrice": 200.00
    }
  ]
}
```

**DTO Mapping:** `OrdersDto` with `OrderDetailDto[]`

**Validation Notes (from backend):**
- Validates that `customerId` exists
- Validates each `itemCode` exists
- Checks `quantityOnHand` is sufficient for each item
- Decrements `Item.quantityOnHand` by ordered quantity
- Persists order and details in a single transaction

---

### 3. Load Customers for Dropdown (OrdersPage)

**Frontend Function:** `loadCustomersForDropdown()`

**Backend Endpoint:** `GET /api/v1/customers`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/customers",
    method: "GET",
    dataType: "json",
    success: function(customers) {
        customersData = customers;
        populateCustomerDropdown(customers);
    }
});
```

**Backend Response:** Array of `CustomerDto`

---

### 4. Load Items for Dropdown (OrdersPage)

**Frontend Function:** `loadItemsForDropdown()`

**Backend Endpoint:** `GET /api/v1/items`

**Frontend Code:**
```javascript
$.ajax({
    url: "http://localhost:8080/api/v1/items",
    method: "GET",
    dataType: "json",
    success: function(items) {
        itemsData = items;
        populateItemDropdown(items);
    }
});
```

**Backend Response:** Array of `ItemDto`

---

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "message": "Invalid request data",
  "errors": []
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "An error occurred on the server"
}
```

### Frontend Error Handling Pattern
```javascript
error: function(error) {
    console.error("Error:", error);
    const errorMessage = error.responseJSON?.message || "Server error";
    alert("Operation failed: " + errorMessage);
}
```

---

## Field Mapping Summary

### Customer Fields
| Form ID | JavaScript Variable | DTO Field | Backend Field |
|---------|-------------------|-----------|---------------|
| #name | name | customerName | customerName |
| #phone | phone | phoneNumber | phoneNumber |
| #address | address | address | address |
| (auto-generated) | - | customerId | customerId |

### Item Fields
| Form ID | JavaScript Variable | DTO Field | Backend Field |
|---------|-------------------|-----------|---------------|
| #code | code | itemCode | itemCode |
| #name | name | itemName | itemName |
| #price | price | unitPrice | unitPrice |
| #qty | qty | quantityOnHand | quantityOnHand |
| #description | description | description | description |

### Order Fields
| Source | JavaScript Variable | DTO Field | Backend Field |
|--------|-------------------|-----------|---------------|
| dropdown | customerId | customerId | customerId |
| cart items | cart[] | orderDetails | orderDetails |
| calculated | subTotal | subTotal | subTotal |
| calculated | discount | discount | discount |
| calculated | total | total | total |

---

## Testing Checklist

- [ ] GET `/api/v1/customers` returns array of CustomerDto
- [ ] POST `/api/v1/customers` accepts CustomerDto (without customerId) and returns with customerId
- [ ] PUT `/api/v1/customers/{id}` accepts CustomerDto with customerId and returns updated record
- [ ] DELETE `/api/v1/customers/{id}` returns 204 No Content
- [ ] GET `/api/v1/items` returns array of ItemDto
- [ ] POST `/api/v1/items` accepts ItemDto (without itemCode) and returns with itemCode
- [ ] PUT `/api/v1/items/{code}` accepts ItemDto with itemCode and returns updated record
- [ ] DELETE `/api/v1/items/{code}` returns 204 No Content
- [ ] GET `/api/v1/orders` returns array of OrdersDto
- [ ] POST `/api/v1/orders` accepts OrdersDto and:
  - Validates customer exists
  - Validates items exist
  - Decrements item quantities
  - Returns created OrdersDto with orderId and orderDate
- [ ] Frontend correctly displays all responses in UI
- [ ] Error messages are user-friendly

---

## CORS Configuration Required

If your frontend runs on a different port, ensure CORS is enabled on the backend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(false);
            }
        };
    }
}
```

---

## Data Flow Example: Save Customer

```
User fills form
    ↓
User clicks Save button
    ↓
saveCustomer() executes
    ↓
Extract form values: name, phone, address
    ↓
Validate required fields
    ↓
POST /api/v1/customers with JSON payload:
{
  "customerName": name,
  "phoneNumber": phone,
  "address": address
}
    ↓
Backend creates customer with auto-generated customerId
    ↓
Backend returns CustomerDto with customerId: "C004"
    ↓
Frontend success callback:
  - Show alert
  - Clear form
  - Call loadAllCustomers()
    ↓
loadAllCustomers() calls GET /api/v1/customers
    ↓
Backend returns array of all CustomerDtos
    ↓
populateCustomerTable() renders table with new customer
```

---

## Data Flow Example: Place Order

```
User selects customer
    ↓
loadCustomersForDropdown() populates dropdown
    ↓
User selects customer from dropdown
    ↓
getSelectedCustomerDetails() displays customer info
    ↓
User selects item from dropdown
    ↓
getSelectedItemDetails() displays stock
    ↓
User enters quantity and clicks "Add to Cart"
    ↓
addToCart() adds to cart array and updates cart display
    ↓
User repeats for more items
    ↓
User clicks "Place Order"
    ↓
placeOrder() creates OrdersDto with:
{
  "customerId": "C001",
  "orderDetails": [
    { "itemCode": "I001", "quantity": 2, "unitPrice": 100 },
    { "itemCode": "I002", "quantity": 1, "unitPrice": 200 }
  ],
  "subTotal": 400.00,
  "discount": 20.00,
  "total": 380.00
}
    ↓
POST /api/v1/orders
    ↓
Backend validates customer and items exist
    ↓
Backend decrements item quantities
    ↓
Backend creates order and returns OrdersDto with orderId
    ↓
Frontend shows confirmation
    ↓
Frontend clears cart and form
```

---

**Document Version:** 2.0
**Updated:** February 12, 2026
**Status:** Backend API (/api/v1) Integration Complete ✅
