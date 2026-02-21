# Quick Setup Guide - Frontend to Backend Integration

## Integration Overview

Your POS frontend is now fully configured with jQuery AJAX calls to integrate with your Spring Boot backend running on `http://localhost:8080/v1`.

---

## Files Created/Modified

### 1. JavaScript Files (New)

#### `js/customer.js`
- **Functions:** Save, Load, Update, Delete customers
- **Endpoints:** POST, GET, PUT, DELETE `/customers`
- **Events:** Form submission, Edit/Delete buttons

#### `js/item.js`
- **Functions:** Save, Load, Update, Delete items
- **Endpoints:** POST, GET, PUT, DELETE `/items`
- **Events:** Form submission, Edit/Delete buttons

#### `js/place-order.js`
- **Functions:** Order management, Cart operations, Order placement
- **Endpoints:** POST, GET `/orders`, GET `/customers`, GET `/items`
- **Features:** Cart management, discount calculation, stock validation

### 2. HTML Files (Modified)

#### `pages/customer.html`
- Added jQuery CDN link
- Modified table to use ID `customerTable` for dynamic loading
- Replaced inline script with `<script src="../js/customer.js"></script>`

#### `pages/item.html`
- Added jQuery CDN link
- Modified table to use ID `itemTable` for dynamic loading
- Replaced inline script with `<script src="../js/item.js"></script>`

#### `pages/place-order.html`
- Added jQuery CDN link
- Replaced 200+ lines of inline script with `<script src="../js/place-order.js"></script>`

### 3. Documentation Files (New)

#### `API_DOCUMENTATION.md`
- Complete endpoint specifications
- Request/Response examples
- Error handling guide
- jQuery integration examples
- cURL testing examples

#### `README.md`
- Project overview
- Setup instructions
- Usage guide
- Troubleshooting
- Customization options

---

## Backend Requirements

Your backend must expose these endpoints:

### Customers
```
POST   /v1/customers              - Create customer
GET    /v1/customers              - Get all customers
GET    /v1/customers/{customerId} - Get customer by ID
PUT    /v1/customers/{customerId} - Update customer
DELETE /v1/customers/{customerId} - Delete customer
```

### Items
```
POST   /v1/items           - Create item
GET    /v1/items           - Get all items
GET    /v1/items/{itemCode}- Get item by code
PUT    /v1/items/{itemCode}- Update item
DELETE /v1/items/{itemCode}- Delete item
```

### Orders
```
POST   /v1/orders      - Place order
GET    /v1/orders      - Get all orders
GET    /v1/orders/{id} - Get order by ID
PUT    /v1/orders/{id} - Update order
DELETE /v1/orders/{id} - Delete order
```

---

## How It Works

### Flow Diagram

```
User Action (click Save)
        ↓
JavaScript Event Handler
        ↓
Get form data
        ↓
Validate input
        ↓
jQuery AJAX Request
        ↓
Backend API (localhost:8080/v1)
        ↓
Database operations
        ↓
Response JSON
        ↓
Success/Error callback
        ↓
Update UI with new data
```

### Example: Save Customer

```javascript
// 1. User fills form and clicks Save
// 2. Form submit event triggers saveCustomer()
function saveCustomer() {
  // 3. Get values from form
  const name = $("#name").val().trim();
  const phone = $("#phone").val().trim();
  const address = $("#address").val().trim();
  
  // 4. Validate
  if (!name || !phone || !address) {
    alert("Please fill all fields!");
    return;
  }
  
  // 5. Make AJAX request
  $.ajax({
    url: "http://localhost:8080/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      customerName: name,
      phoneNumber: phone,
      address: address
    }),
    // 6. Success callback
    success: function(response) {
      alert("Customer saved successfully!");
      clearFormFields();
      loadAllCustomers(); // Refresh list
    },
    // 7. Error callback
    error: function(error) {
      alert("Failed to save customer!");
      console.log(error);
    }
  });
}
```

---

## API Response Format Expectations

Your backend should return JSON in this format:

### Customer Response
```json
{
  "customerId": "C001",
  "customerName": "John Doe",
  "phoneNumber": "0123456789",
  "address": "123 Main Street"
}
```

### Item Response
```json
{
  "itemCode": "I001",
  "itemName": "Mouse",
  "description": "Wireless mouse",
  "unitPrice": 100.00,
  "quantityOnHand": 10
}
```

### Order Response
```json
{
  "orderId": "ORD001",
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
    }
  ]
}
```

---

## Testing Checklist

### Before Launching

- [ ] Backend API is running on `localhost:8080/v1`
- [ ] All endpoints are implemented
- [ ] Database is set up and populated with sample data
- [ ] CORS is enabled on backend (if frontend runs on different port)
- [ ] Open `index.html` in browser
- [ ] Navigation links work

### Customer Page

- [ ] Fill customer form and click Save
- [ ] Customer appears in list
- [ ] Click Edit - form populates
- [ ] Edit details and click Update
- [ ] Click Delete - customer removed
- [ ] Refresh page - data persists

### Item Page

- [ ] Fill item form and click Save
- [ ] Item appears in list
- [ ] Click Edit - form populates
- [ ] Edit details and click Update
- [ ] Click Delete - item removed
- [ ] Refresh page - data persists

### Place Order Page

- [ ] Customer dropdown populates
- [ ] Item dropdown populates
- [ ] Select customer - details display
- [ ] Select item - stock shows
- [ ] Add item to cart - appears in table
- [ ] Multiple items - totals calculate correctly
- [ ] 5% discount applies
- [ ] Click Remove - item removes
- [ ] Click Clear Cart - all items removed
- [ ] Click Place Order - order saved to backend
- [ ] Order page refreshes after placement

---

## Common Issues & Solutions

### Issue: "Failed to load customers"

**Cause:** Backend not running or endpoint not found

**Solution:**
1. Verify backend is running: `http://localhost:8080/v1/customers`
2. Check console for CORS errors
3. Test endpoint with Postman or cURL:
   ```bash
   curl http://localhost:8080/v1/customers
   ```

### Issue: Table stays empty after save

**Cause:** Data not being loaded from API

**Solution:**
1. Check browser console for AJAX errors
2. Verify API response format matches expected JSON
3. Check that `loadAllCustomers()` is called in success callback

### Issue: Form doesn't populate on Edit

**Cause:** `getCustomerById()` not finding data

**Solution:**
1. Check if customer ID is passed correctly
2. Verify API responds with correct field names
3. Update field mapping if different from expected

### Issue: CORS error when calling API

**Cause:** Backend doesn't allow cross-origin requests

**Solution:**
Add CORS configuration to Spring Boot:
```java
@Configuration
public class CORSConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/v1/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
```

---

## Optional Enhancements

### 1. Add Loading Indicators
```javascript
// Show loading spinner
$.ajax({
  url: BASE_URL,
  beforeSend: function() {
    $("#loadingSpinner").show();
  },
  complete: function() {
    $("#loadingSpinner").hide();
  }
});
```

### 2. Add Form Validation
```javascript
function validateCustomerForm() {
  const name = $("#name").val().trim();
  if (name.length < 3) {
    alert("Customer name must be at least 3 characters");
    return false;
  }
  // Add more validations
  return true;
}
```

### 3. Add Confirmation Dialogs
```javascript
if (confirm("Are you sure you want to delete this customer?")) {
  deleteCustomer();
}
```

### 4. Add Local Storage Caching
```javascript
// Cache customer list
localStorage.setItem('customers', JSON.stringify(customerData));

// Retrieve cached data
const cachedCustomers = JSON.parse(localStorage.getItem('customers'));
```

---

## Debugging Tips

### Enable Console Logging
Open browser DevTools (F12) and add logging:
```javascript
$.ajax({
  url: BASE_URL,
  success: function(response) {
    console.log("Response:", response);
    console.log("First item:", response[0]);
  }
});
```

### Check Network Requests
1. Open DevTools → Network tab
2. Perform action (Save, Delete, etc.)
3. Look for the API request
4. Check: Status code, Request body, Response body

### Test Endpoint Directly
```bash
# Test GET
curl http://localhost:8080/v1/customers

# Test POST
curl -X POST http://localhost:8080/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","phoneNumber":"1234567890","address":"123 St"}'
```

---

## Deployment to Production

When deploying to production:

1. **Update API URL** in JavaScript files:
   ```javascript
   const BASE_URL = "https://your-production-api.com/v1/customers";
   ```

2. **Enable HTTPS** - Modern browsers require HTTPS for many features

3. **Add Authentication** - Use JWT tokens or similar

4. **Add Rate Limiting** - Prevent API abuse

5. **Add Error Tracking** - Use services like Sentry for error monitoring

6. **Optimize Performance:**
   - Minify CSS and JavaScript
   - Cache API responses
   - Use CDN for static files
   - Implement pagination for large data sets

---

## Support Resources

- jQuery Documentation: https://api.jquery.com/
- AJAX Documentation: https://api.jquery.com/jquery.ajax/
- Spring Boot REST Docs: https://spring.io/guides/gs/rest-service/
- MDN Web Docs: https://developer.mozilla.org/

---

**Ready to Connect!** Your frontend is now ready to integrate with your Spring Boot backend. Ensure all endpoints are implemented according to the API documentation and you're good to go! 🚀
