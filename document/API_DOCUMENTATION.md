# POS System API Documentation

**Base URL:** `http://localhost:8080/v1`

---

## 1. CUSTOMER MANAGEMENT APIs

### 1.1 Get All Customers
- **Endpoint:** `GET /customers`
- **Description:** Retrieve all customers from the database
- **Request:** No body required
- **Response (200 OK):**
  ```json
  [
    {
      "customerId": "C001",
      "customerName": "Hemal",
      "phoneNumber": "0776655444",
      "address": "No.34, Galle Road, Colombo 03"
    },
    {
      "customerId": "C002",
      "customerName": "Kamal",
      "phoneNumber": "0788776655",
      "address": "No.56, Kandy Road, Kandy"
    }
  ]
  ```

### 1.2 Get Customer by ID
- **Endpoint:** `GET /customers/{customerId}`
- **Description:** Retrieve a specific customer by ID
- **Request:** No body required
- **Path Parameters:**
  - `customerId` (String): The ID of the customer (e.g., C001)
- **Response (200 OK):**
  ```json
  {
    "customerId": "C001",
    "customerName": "Hemal",
    "phoneNumber": "0776655444",
    "address": "No.34, Galle Road, Colombo 03"
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "message": "Customer not found"
  }
  ```

### 1.3 Create New Customer
- **Endpoint:** `POST /customers`
- **Description:** Create a new customer
- **Content-Type:** `application/json`
- **Request Body:**
  ```json
  {
    "customerName": "John Doe",
    "phoneNumber": "0123456789",
    "address": "123 Main Street, City"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "customerId": "C004",
    "customerName": "John Doe",
    "phoneNumber": "0123456789",
    "address": "123 Main Street, City"
  }
  ```
- **Response (400 Bad Request):**
  ```json
  {
    "message": "Customer name, phone number, and address are required"
  }
  ```

### 1.4 Update Customer
- **Endpoint:** `PUT /customers/{customerId}`
- **Description:** Update an existing customer
- **Content-Type:** `application/json`
- **Path Parameters:**
  - `customerId` (String): The ID of the customer to update
- **Request Body:**
  ```json
  {
    "customerId": "C001",
    "customerName": "Hemal Updated",
    "phoneNumber": "0776655444",
    "address": "No.34, Galle Road, Colombo 03"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "customerId": "C001",
    "customerName": "Hemal Updated",
    "phoneNumber": "0776655444",
    "address": "No.34, Galle Road, Colombo 03"
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "message": "Customer not found"
  }
  ```

### 1.5 Delete Customer
- **Endpoint:** `DELETE /customers/{customerId}`
- **Description:** Delete a customer
- **Path Parameters:**
  - `customerId` (String): The ID of the customer to delete
- **Response (204 No Content):** No body
- **Response (404 Not Found):**
  ```json
  {
    "message": "Customer not found"
  }
  ```

---

## 2. ITEM MANAGEMENT APIs

### 2.1 Get All Items
- **Endpoint:** `GET /items`
- **Description:** Retrieve all items from inventory
- **Request:** No body required
- **Response (200 OK):**
  ```json
  [
    {
      "itemCode": "I001",
      "itemName": "Mouse",
      "description": "Wireless optical mouse with USB receiver",
      "unitPrice": 100.00,
      "quantityOnHand": 10
    },
    {
      "itemCode": "I002",
      "itemName": "Keyboard",
      "description": "Mechanical gaming keyboard with RGB lighting",
      "unitPrice": 200.00,
      "quantityOnHand": 20
    }
  ]
  ```

### 2.2 Get Item by Code
- **Endpoint:** `GET /items/{itemCode}`
- **Description:** Retrieve a specific item by code
- **Request:** No body required
- **Path Parameters:**
  - `itemCode` (String): The code of the item (e.g., I001)
- **Response (200 OK):**
  ```json
  {
    "itemCode": "I001",
    "itemName": "Mouse",
    "description": "Wireless optical mouse with USB receiver",
    "unitPrice": 100.00,
    "quantityOnHand": 10
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "message": "Item not found"
  }
  ```

### 2.3 Create New Item
- **Endpoint:** `POST /items`
- **Description:** Create a new item
- **Content-Type:** `application/json`
- **Request Body:**
  ```json
  {
    "itemCode": "I004",
    "itemName": "USB Cable",
    "description": "High-speed USB 3.0 cable",
    "unitPrice": 50.00,
    "quantityOnHand": 100
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "itemCode": "I004",
    "itemName": "USB Cable",
    "description": "High-speed USB 3.0 cable",
    "unitPrice": 50.00,
    "quantityOnHand": 100
  }
  ```
- **Response (400 Bad Request):**
  ```json
  {
    "message": "Item code, name, price, and quantity are required"
  }
  ```

### 2.4 Update Item
- **Endpoint:** `PUT /items/{itemCode}`
- **Description:** Update an existing item
- **Content-Type:** `application/json`
- **Path Parameters:**
  - `itemCode` (String): The code of the item to update
- **Request Body:**
  ```json
  {
    "itemCode": "I001",
    "itemName": "Mouse Updated",
    "description": "Wireless optical mouse with USB receiver",
    "unitPrice": 120.00,
    "quantityOnHand": 15
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "itemCode": "I001",
    "itemName": "Mouse Updated",
    "description": "Wireless optical mouse with USB receiver",
    "unitPrice": 120.00,
    "quantityOnHand": 15
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "message": "Item not found"
  }
  ```

### 2.5 Delete Item
- **Endpoint:** `DELETE /items/{itemCode}`
- **Description:** Delete an item
- **Path Parameters:**
  - `itemCode` (String): The code of the item to delete
- **Response (204 No Content):** No body
- **Response (404 Not Found):**
  ```json
  {
    "message": "Item not found"
  }
  ```

---

## 3. ORDER MANAGEMENT APIs

### 3.1 Get All Orders
- **Endpoint:** `GET /orders`
- **Description:** Retrieve all orders
- **Request:** No body required
- **Response (200 OK):**
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

### 3.2 Get Order by ID
- **Endpoint:** `GET /orders/{orderId}`
- **Description:** Retrieve a specific order by ID
- **Path Parameters:**
  - `orderId` (String): The ID of the order
- **Response (200 OK):**
  ```json
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
  ```

### 3.3 Place New Order
- **Endpoint:** `POST /orders`
- **Description:** Create and place a new order
- **Content-Type:** `application/json`
- **Request Body:**
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
- **Response (201 Created):**
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
- **Response (400 Bad Request):**
  ```json
  {
    "message": "Customer ID and order details are required"
  }
  ```

### 3.4 Update Order Status
- **Endpoint:** `PUT /orders/{orderId}`
- **Description:** Update order details (e.g., status, total)
- **Path Parameters:**
  - `orderId` (String): The ID of the order to update
- **Request Body:**
  ```json
  {
    "status": "COMPLETED"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "orderId": "ORD001",
    "status": "COMPLETED",
    "message": "Order updated successfully"
  }
  ```

### 3.5 Delete Order
- **Endpoint:** `DELETE /orders/{orderId}`
- **Description:** Delete an order
- **Path Parameters:**
  - `orderId` (String): The ID of the order to delete
- **Response (204 No Content):** No body
- **Response (404 Not Found):**
  ```json
  {
    "message": "Order not found"
  }
  ```

---

## Error Responses

### Common Error Responses

#### 400 Bad Request
```json
{
  "message": "Invalid request data",
  "errors": []
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "message": "An error occurred on the server"
}
```

---

## jQuery Integration Examples

### Example 1: Save Customer
```javascript
function saveCustomer() {
  const name = $("#name").val().trim();
  const phone = $("#phone").val().trim();
  const address = $("#address").val().trim();

  if (!name || !phone || !address) {
    alert("Please fill all fields!");
    return;
  }

  $.ajax({
    url: "http://localhost:8080/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      customerName: name,
      phoneNumber: phone,
      address: address
    }),
    success: function(response) {
      alert("Customer saved successfully!");
      loadAllCustomers();
    },
    error: function(error) {
      alert("Failed to save customer: " + error.responseJSON?.message);
    }
  });
}
```

### Example 2: Load All Items
```javascript
function loadAllItems() {
  $.ajax({
    url: "http://localhost:8080/v1/items",
    method: "GET",
    dataType: "json",
    success: function(items) {
      populateItemTable(items);
    },
    error: function(error) {
      console.error("Error loading items:", error);
      alert("Failed to load items");
    }
  });
}
```

### Example 3: Place Order
```javascript
function placeOrder() {
  const customerId = $("#customerSelect").val();
  const orderTotal = parseFloat($("#total").text());

  $.ajax({
    url: "http://localhost:8080/v1/orders",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      customerId: customerId,
      orderDetails: cart,
      subTotal: subTotal,
      discount: discount,
      total: orderTotal
    }),
    success: function(response) {
      alert("Order placed successfully!");
      console.log("Order ID: " + response.orderId);
      resetOrderForm();
    },
    error: function(error) {
      alert("Failed to place order: " + error.responseJSON?.message);
    }
  });
}
```

---

## Notes

1. **Authentication:** Currently, no authentication is implemented. Add JWT tokens if needed.
2. **CORS:** Ensure CORS is enabled on the backend to allow frontend requests from localhost:3000.
3. **Timestamps:** Dates use ISO 8601 format (YYYY-MM-DD).
4. **Price Format:** All prices are in decimal format with 2 decimal places.
5. **IDs/Codes:** Customer IDs start with "C", Item codes start with "I", Order IDs start with "ORD".

---

## Testing the APIs with cURL

### Create a Customer
```bash
curl -X POST http://localhost:8080/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"customerName":"John Doe","phoneNumber":"0123456789","address":"123 Main St"}'
```

### Get All Customers
```bash
curl -X GET http://localhost:8080/v1/customers
```

### Update a Customer
```bash
curl -X PUT http://localhost:8080/v1/customers/C001 \
  -H "Content-Type: application/json" \
  -d '{"customerId":"C001","customerName":"John Updated","phoneNumber":"0123456789","address":"123 Main St"}'
```

### Delete a Customer
```bash
curl -X DELETE http://localhost:8080/v1/customers/C001
```

### Place an Order
```bash
curl -X POST http://localhost:8080/v1/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId":"C001","orderDetails":[{"itemCode":"I001","quantity":2,"unitPrice":100.00}],"subTotal":200.00,"discount":10.00,"total":190.00}'
```

---

## File Structure

```
pos/
├── index.html
├── css/
│   └── common.css
├── js/
│   ├── customer.js       (Customer API integration)
│   ├── item.js            (Item API integration)
│   └── place-order.js     (Order API integration + dropdown management)
└── pages/
    ├── customer.html      (Customer management page)
    ├── item.html          (Item management page)
    └── place-order.html   (Order placement page)
```

---

**Last Updated:** February 12, 2026
**API Version:** 1.0
