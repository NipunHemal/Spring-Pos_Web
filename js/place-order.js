/* ========================================
   Place Order - jQuery API Integration
   Base URL: localhost:8080/api/v1
   Backend DTOs: OrdersDto, OrderDetailDto, CustomerDto, ItemDto
   ======================================== */

const BASE_URL_CUSTOMERS = "http://localhost:8080/api/v1/customers";
const BASE_URL_ITEMS = "http://localhost:8080/api/v1/items";
const BASE_URL_ORDERS = "http://localhost:8080/api/v1/orders";

let cart = [];
let selectedCustomer = null;
let itemsData = [];
let customersData = [];

// Initialize on page load
$(document).ready(function () {
  loadCustomersForDropdown();
  loadItemsForDropdown();
  setupOrderEventListeners();
});

// Setup event listeners
function setupOrderEventListeners() {
  // Customer selection
  $(document).on("change", "#customerSelect", function () {
    const customerId = $(this).val();
    if (customerId) {
      getSelectedCustomerDetails(customerId);
    } else {
      selectedCustomer = null;
      updateSelectedCustomerDisplay();
    }
  });

  // Item selection
  $(document).on("change", "#itemSelect", function () {
    const itemCode = $(this).val();
    if (itemCode) {
      getSelectedItemDetails(itemCode);
    } else {
      updateStockDisplay(null);
    }
  });

  // Add to cart button
  $(document).on("click", ".btn-primary", function () {
    if ($(this).text().trim() === "Add to Cart") {
      addToCart();
    }
  });
}

// ====== Load Data Functions ======

/**
 * Load customers for dropdown
 * API: GET /api/v1/customers
 * Response: CustomerDto[] array { customerId, customerName, phoneNumber, address }
 */
function loadCustomersForDropdown() {
  $.ajax({
    url: BASE_URL_CUSTOMERS,
    method: "GET",
    dataType: "json",
    success: function (customers) {
      customersData = customers;
      populateCustomerDropdown(customers);
    },
    error: function (error) {
      console.error("Error loading customers:", error);
      customersData = getSampleCustomers();
      populateCustomerDropdown(customersData);
    },
  });
}

/**
 * Load items for dropdown
 * API: GET /api/v1/items
 * Response: ItemDto[] array { itemCode, itemName, description, unitPrice, quantityOnHand }
 */
function loadItemsForDropdown() {
  $.ajax({
    url: BASE_URL_ITEMS,
    method: "GET",
    dataType: "json",
    success: function (items) {
      itemsData = items;
      populateItemDropdown(items);
    },
    error: function (error) {
      console.error("Error loading items:", error);
      itemsData = getSampleItems();
      populateItemDropdown(itemsData);
    },
  });
}

/**
 * Get full customer details
 * API: GET /api/v1/customers/{customerId}
 * Response: CustomerDto { customerId, customerName, phoneNumber, address }
 */
function getSelectedCustomerDetails(customerId) {
  const customer = customersData.find(
    (c) => (c.customerId || c.id) === customerId,
  );

  if (customer) {
    selectedCustomer = customer;
    updateSelectedCustomerDisplay();
  } else {
    // Fallback to API if not in loaded data
    $.ajax({
      url: BASE_URL_CUSTOMERS + "/" + customerId,
      method: "GET",
      dataType: "json",
      success: function (customer) {
        selectedCustomer = customer;
        updateSelectedCustomerDisplay();
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
}

/**
 * Get full item details
 * API: GET /api/v1/items/{itemCode}
 * Response: ItemDto { itemCode, itemName, description, unitPrice, quantityOnHand }
 */
function getSelectedItemDetails(itemCode) {
  const item = itemsData.find((i) => (i.itemCode || i.code) === itemCode);

  if (item) {
    updateStockDisplay(item);
  } else {
    // Fallback to API if not in loaded data
    $.ajax({
      url: BASE_URL_ITEMS + "/" + itemCode,
      method: "GET",
      dataType: "json",
      success: function (item) {
        updateStockDisplay(item);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
}

// ====== Display Update Functions ======

/**
 * Populate customer dropdown
 */
function populateCustomerDropdown(customers) {
  const select = $("#customerSelect");
  select.find("option:not(:first)").remove();

  customers.forEach(function (customer) {
    const customerId = customer.customerId || customer.id;
    const customerName = customer.customerName || customer.name;
    const phone = customer.phoneNumber || customer.phone;

    const option = $("<option>")
      .val(customerId)
      .text(`${customerName} - ${phone}`);
    select.append(option);
  });
}

/**
 * Populate item dropdown
 */
function populateItemDropdown(items) {
  const select = $("#itemSelect");
  select.find("option:not(:first)").remove();

  items.forEach(function (item) {
    const itemCode = item.itemCode || item.code;
    const itemName = item.itemName || item.name;
    const price = parseFloat(item.unitPrice || item.price || 0).toFixed(2);

    const option = $("<option>")
      .val(itemCode)
      .text(`${itemName} - Rs. ${price}`);
    select.append(option);
  });
}

/**
 * Update selected customer display
 */
function updateSelectedCustomerDisplay() {
  const display = $("#selectedCustomer");
  if (selectedCustomer) {
    const customerId = selectedCustomer.customerId || selectedCustomer.id;
    const customerName = selectedCustomer.customerName || selectedCustomer.name;
    const phone = selectedCustomer.phoneNumber || selectedCustomer.phone;
    const address = selectedCustomer.address;

    display.html(`
            <strong>${customerName}</strong><br>
            ID: ${customerId}<br>
            Phone: ${phone}<br>
            Address: ${address}
        `);
  } else {
    display.html("No customer selected");
  }
}

/**
 * Update stock display
 */
function updateStockDisplay(item) {
  const display = $("#availableStock");
  if (item) {
    const stock = item.quantityOnHand || item.stock || 0;
    const price = parseFloat(item.unitPrice || item.price || 0).toFixed(2);

    display.html(`
            <strong>Stock Available:</strong> ${stock} units<br>
            <strong>Unit Price:</strong> Rs. ${price}
        `);
  } else {
    display.html("Select an item to see stock");
  }
}

// ====== Cart Management Functions ======

/**
 * Add item to cart
 */
function addToCart() {
  const itemSelect = $("#itemSelect");
  const qtyInput = $("#qtyInput");

  const itemCode = itemSelect.val();
  const quantity = parseInt(qtyInput.val());

  if (!itemCode) {
    alert("Please select an item");
    return;
  }

  if (!quantity || quantity < 1) {
    alert("Please enter a valid quantity");
    return;
  }

  const item = itemsData.find((i) => (i.itemCode || i.code) === itemCode);

  if (!item) {
    alert("Item not found");
    return;
  }

  const stock = item.quantityOnHand || item.stock;

  if (quantity > stock) {
    alert(`Only ${stock} units available in stock`);
    return;
  }

  // Check if item already in cart
  const existingItemIndex = cart.findIndex(
    (cartItem) => (cartItem.code || cartItem.itemCode) === itemCode,
  );

  if (existingItemIndex !== -1) {
    const newQuantity = cart[existingItemIndex].quantity + quantity;
    if (newQuantity > stock) {
      alert(`Cannot add more than ${stock} units of this item`);
      return;
    }
    cart[existingItemIndex].quantity = newQuantity;
  } else {
    cart.push({
      itemId: item.itemId,
      code: item.itemCode || item.code,
      description: item.itemName || item.name,
      unitPrice: item.unitPrice || item.price,
      quantity: quantity,
    });
  }

  // Reset form
  itemSelect.val("");
  qtyInput.val("1");
  updateStockDisplay(null);

  // Update cart display
  updateCartDisplay();
}

/**
 * Remove item from cart
 */
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

/**
 * Update cart display
 */
function updateCartDisplay() {
  const cartBody = $("#cartBody");
  cartBody.empty();

  if (cart.length === 0) {
    cartBody.html(
      "<tr><td colspan='6' style='text-align:center;'>Cart is empty</td></tr>",
    );
    updateTotals();
    return;
  }

  cart.forEach((item, index) => {
    const total = item.unitPrice * item.quantity;
    const row = `
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>Rs. ${item.unitPrice.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>Rs. ${total.toFixed(2)}</td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    cartBody.append(row);
  });

  updateTotals();
}

/**
 * Update totals
 */
function updateTotals() {
  const subTotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const discount = subTotal * 0.05; // 5% discount
  const total = subTotal - discount;

  $("#subTotal").text(subTotal.toFixed(2));
  $("#discount").text(discount.toFixed(2));
  $("#total").text(total.toFixed(2));
}

/**
 * Clear cart
 */
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    updateCartDisplay();
  }
}

// ====== Order Placement ======

/**
 * Place order
 * API: POST /api/v1/orders
 * Payload: {
 *   customerId: string,
 *   orderDetails: [ { itemCode, quantity, unitPrice } ],
 *   subTotal: decimal,
 *   discount: decimal,
 *   total: decimal
 * }
 * Response: OrdersDto { orderId, customerId, orderDate, subTotal, discount, total, orderDetails }
 */
function placeOrder() {
  if (!selectedCustomer) {
    alert("Please select a customer");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty. Please add items to the cart");
    return;
  }

  const total = document.getElementById("total").textContent;
  const confirmOrder = confirm(
    `Confirm Order:\nCustomer: ${selectedCustomer.customerName || selectedCustomer.name}\nTotal Amount: Rs. ${total}\n\nDo you want to place this order?`,
  );

  if (!confirmOrder) {
    return;
  }

  const customerId = selectedCustomer.customerId || selectedCustomer.id;
  const subTotal = parseFloat($("#subTotal").text());
  const discount = parseFloat($("#discount").text());
  const orderTotal = parseFloat($("#total").text());

  // Prepare order details
  const orderDetails = cart.map((item) => ({
    itemId: item.itemId,
    itemCode: item.code,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

  const orderData = {
    customerId: customerId,
    orderDetails: orderDetails,
    subTotal: subTotal,
    discount: discount,
    total: orderTotal,
  };

  // Send order to backend
  $.ajax({
    url: BASE_URL_ORDERS,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(orderData),
    success: function (response) {
      alert("Order placed successfully!");
      console.log("Order Response:", response);
      resetOrderForm();
    },
    error: function (error) {
      console.error("Error:", error);
      alert(
        "Failed to place order: " +
          (error.responseJSON?.message || "Server error"),
      );
    },
  });
}

/**
 * Reset order form
 */
function resetOrderForm() {
  cart = [];
  selectedCustomer = null;
  $("#customerSelect").val("");
  $("#itemSelect").val("");
  $("#qtyInput").val("1");
  updateSelectedCustomerDisplay();
  updateStockDisplay(null);
  updateCartDisplay();
}

// ====== Sample Data (Fallback) ======

/**
 * Sample customers (fallback if API not available)
 * Uses exact DTO field names: customerId, customerName, phoneNumber, address
 */
function getSampleCustomers() {
  return [
    {
      customerId: "C001",
      customerName: "Hemal",
      phoneNumber: "0776655444",
      address: "No.34, Galle Road, Colombo 03",
    },
    {
      customerId: "C002",
      customerName: "Kamal",
      phoneNumber: "0788776655",
      address: "No.56, Kandy Road, Kandy",
    },
    {
      customerId: "C003",
      customerName: "Nimal",
      phoneNumber: "0765544332",
      address: "No.78, Marine Drive, Mount Lavinia",
    },
  ];
}

/**
 * Sample items (fallback if API not available)
 * Uses exact DTO field names: itemCode, itemName, description, unitPrice, quantityOnHand
 */
function getSampleItems() {
  return [
    {
      itemCode: "I001",
      itemName: "Mouse",
      description: "Wireless optical mouse with USB receiver",
      unitPrice: 100,
      quantityOnHand: 10,
    },
    {
      itemCode: "I002",
      itemName: "Keyboard",
      description: "Mechanical gaming keyboard with RGB lighting",
      unitPrice: 200,
      quantityOnHand: 20,
    },
    {
      itemCode: "I003",
      itemName: "Monitor",
      description: "24-inch LED monitor with Full HD resolution",
      unitPrice: 5000,
      quantityOnHand: 5,
    },
  ];
}
