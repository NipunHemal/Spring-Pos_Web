# 🚀 Quick Start Guide

## Start Here!

Your POS frontend is ready to connect to your backend API. Follow these steps to get everything working:

---

## ✅ Step 1: Verify Your Setup (5 minutes)

### Check that files exist:
```
✓ js/customer.js
✓ js/item.js
✓ js/place-order.js
✓ pages/customer.html (updated with jQuery)
✓ pages/item.html (updated with jQuery)
✓ pages/place-order.html (updated with jQuery)
✓ API_DOCUMENTATION.md
✓ README.md
✓ SETUP_GUIDE.md
```

### Open in browser:
1. Open `index.html` in your browser
2. Navigate to Customer page
3. Check browser console (F12) for any errors
4. You should see: "Failed to load customers" (expected, backend not running yet)

---

## ✅ Step 2: Prepare Your Backend (30-60 minutes)

Your backend must implement these endpoints:

### Customer Endpoints
```
POST   http://localhost:8080/v1/customers
GET    http://localhost:8080/v1/customers
GET    http://localhost:8080/v1/customers/{customerId}
PUT    http://localhost:8080/v1/customers/{customerId}
DELETE http://localhost:8080/v1/customers/{customerId}
```

### Item Endpoints
```
POST   http://localhost:8080/v1/items
GET    http://localhost:8080/v1/items
GET    http://localhost:8080/v1/items/{itemCode}
PUT    http://localhost:8080/v1/items/{itemCode}
DELETE http://localhost:8080/v1/items/{itemCode}
```

### Order Endpoints
```
POST   http://localhost:8080/v1/orders
GET    http://localhost:8080/v1/orders
GET    http://localhost:8080/v1/orders/{orderId}
PUT    http://localhost:8080/v1/orders/{orderId}
DELETE http://localhost:8080/v1/orders/{orderId}
```

### Data Models Your API Should Accept/Return:

**Customer:**
```json
{
  "customerId": "C001",
  "customerName": "John Doe",
  "phoneNumber": "0123456789",
  "address": "123 Main Street"
}
```

**Item:**
```json
{
  "itemCode": "I001",
  "itemName": "Mouse",
  "description": "Wireless mouse",
  "unitPrice": 100.00,
  "quantityOnHand": 10
}
```

**Order:**
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

### Don't forget CORS!
Add this to your Spring Boot application:
```java
@Configuration
public class CorsConfig {
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

## ✅ Step 3: Test Backend Endpoints (10 minutes)

Before testing with frontend, test your API directly using cURL:

### Test Customer Endpoint
```bash
# Create customer
curl -X POST http://localhost:8080/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"customerName":"John Doe","phoneNumber":"0123456789","address":"123 Main St"}'

# Get all customers
curl http://localhost:8080/v1/customers

# Get specific customer
curl http://localhost:8080/v1/customers/C001

# Update customer
curl -X PUT http://localhost:8080/v1/customers/C001 \
  -H "Content-Type: application/json" \
  -d '{"customerId":"C001","customerName":"John Updated","phoneNumber":"0123456789","address":"123 Main St"}'

# Delete customer
curl -X DELETE http://localhost:8080/v1/customers/C001
```

### Expected Responses
- ✅ POST: 201 Created with customer object
- ✅ GET (all): 200 OK with array of customers
- ✅ GET (single): 200 OK with customer object
- ✅ PUT: 200 OK with updated customer object
- ✅ DELETE: 204 No Content (empty body)

---

## ✅ Step 4: Test Frontend (15 minutes)

### 1. Make sure backend is running:
```
Backend should be running on http://localhost:8080/v1
Database should be populated with sample data (optional)
```

### 2. Open frontend:
```
Open pages/customer.html in browser
Open DevTools (F12) → Console tab
```

### 3. Check console:
- ✅ No red errors
- ✅ Customers should load in table
- ✅ Network tab should show API calls to localhost:8080/v1

### 4. Test Customer Page:
```
[ ] Fill form (name, phone, address)
[ ] Click "Save"
[ ] Verify "Customer saved successfully!" alert
[ ] Verify new customer appears in table
[ ] Click "Edit" on customer
[ ] Verify form populates
[ ] Change values
[ ] Click "Update"
[ ] Verify changes in table
[ ] Click "Delete"
[ ] Click "OK" on confirmation
[ ] Verify customer removed from table
```

### 5. Test Item Page:
```
[ ] Fill form (code, name, price, quantity, description)
[ ] Click "Save"
[ ] Verify "Item saved successfully!" alert
[ ] Verify new item appears in table
[ ] Repeat edit/update/delete testing
```

### 6. Test Place Order Page:
```
[ ] Customer dropdown should populate (from database)
[ ] Item dropdown should populate (from database)
[ ] Select a customer
[ ] Verify customer details display
[ ] Select an item
[ ] Verify stock and price display
[ ] Enter quantity (1)
[ ] Click "Add to Cart"
[ ] Verify item appears in cart table
[ ] Verify totals calculate correctly
[ ] Change quantity of item in dropdown
[ ] Add same item again
[ ] Verify quantity increases in cart
[ ] Click "Remove" on item
[ ] Verify item removed from cart
[ ] Add 2-3 different items
[ ] Verify subtotal = sum of (price × quantity)
[ ] Verify discount = subtotal × 0.05
[ ] Verify total = subtotal - discount
[ ] Click "Clear Cart"
[ ] Click "Yes"
[ ] Verify cart is empty
[ ] Add items again and click "Place Order"
[ ] Click "OK" to confirm
[ ] Verify "Order placed successfully!" message
[ ] Check backend - order should be saved
```

---

## ✅ Step 5: Troubleshooting (If Needed)

### Problem: Table is empty, no error
**Solution:**
1. Open DevTools (F12)
2. Click Network tab
3. Reload page
4. Look for GET request to localhost:8080/v1/customers
5. If no request: jQuery not loading or JavaScript error
6. If red status: Backend endpoint not implemented or not running

### Problem: CORS error
**Solution:**
1. Check browser console for: "No 'Access-Control-Allow-Origin' header"
2. This means your backend doesn't allow requests from your origin
3. Add CORS configuration to Spring Boot (see Step 2)
4. Restart backend

### Problem: API returns wrong field names
**Solution:**
1. Check what field names your API returns (e.g., `cId` vs `customerId`)
2. If they don't match, update the JavaScript mapping
3. Example in `customer.js`:
   ```javascript
   // If your API uses different field names:
   const customerId = customer.cId || customer.customerId; // Try both
   const name = customer.cName || customer.customerName;   // Try both
   ```

### Problem: Form submits but nothing happens
**Solution:**
1. Check browser console for JavaScript errors
2. Check Network tab for API request
3. Verify form field IDs match the JavaScript:
   - Customer: `#name`, `#phone`, `#address`
   - Item: `#code`, `#name`, `#price`, `#qty`, `#description`

---

## 📚 Documentation Reference

| Document | Purpose | Read If... |
|----------|---------|-----------|
| **README.md** | Project overview | You want to understand the project |
| **API_DOCUMENTATION.md** | Complete API specs | You need endpoint details |
| **SETUP_GUIDE.md** | Integration details | You're setting up backend |
| **JQUERY_REFERENCE.md** | Function quick ref | You need to modify JavaScript |
| **IMPLEMENTATION_SUMMARY.md** | What was created | You want a detailed summary |

---

## 🎯 Success Checklist

When everything is working, you should be able to:

- [ ] Load customer.html and see customer list
- [ ] Load item.html and see item list
- [ ] Load place-order.html and see populated dropdowns
- [ ] Save a new customer via frontend
- [ ] Edit customer and see changes
- [ ] Delete customer
- [ ] Save a new item via frontend
- [ ] Add items to cart and place order
- [ ] No errors in browser console
- [ ] All API calls return 2xx status codes

---

## 🚀 You're Ready!

Once you complete all steps above, your POS system is ready to use!

**Key reminder:** The frontend will automatically show sample data if the backend is not available. This is useful for testing the UI without the backend running.

---

## Need Help?

1. **Check the console** (F12 → Console tab) for JavaScript errors
2. **Check the Network tab** to see API requests and responses
3. **Test API with cURL** before testing with frontend
4. **Read SETUP_GUIDE.md** for detailed troubleshooting
5. **Check API_DOCUMENTATION.md** for endpoint specifications

---

**Last Updated:** February 12, 2026
**Status:** Ready for Testing! ✅
