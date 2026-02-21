/* ========================================
   Item Management - jQuery API Integration
   Base URL: localhost:8080/api/v1
   Backend DTOs: ItemDto
   ======================================== */

const BASE_URL_ITEMS = "http://localhost:8080/api/v1/items";

let selectedItemId = null;

// Initialize on page load
$(document).ready(function () {
  loadAllItems();
  setupItemEventListeners();
});

// Setup event listeners
function setupItemEventListeners() {
  // Form submission
  $("#itemForm").on("submit", function (e) {
    e.preventDefault();
    saveItem();
  });

  // Update button
  $(".btn-warning").on("click", function () {
    updateItem();
  });

  // Delete button
  $(".btn-danger").on("click", function (e) {
    if ($(this).closest("form").length) {
      e.preventDefault();
      deleteItem();
    }
  });
}

// ====== API CRUD Functions ======

/**
 * Save new item
 * API: POST /api/v1/items
 * Payload: { itemCode, itemName, unitPrice, quantityOnHand, description }
 * Response: ItemDto { itemCode, itemName, description, unitPrice, quantityOnHand }
 */
function saveItem() {
  const code = $("#code").val().trim();
  const name = $("#name").val().trim();
  const price = parseFloat($("#price").val());
  const qty = parseInt($("#qty").val());
  const description = $("#description").val().trim();

  if (!code || !name || !price || !qty) {
    alert("Please fill all required fields!");
    return;
  }

  if (price <= 0 || qty <= 0) {
    alert("Price and Quantity must be greater than 0!");
    return;
  }

  $.ajax({
    url: BASE_URL_ITEMS,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      itemCode: code,
      itemName: name,
      unitPrice: price,
      quantityOnHand: qty,
      description: description,
    }),
    success: function (response) {
      alert("Item saved successfully!");
      clearItemFormFields();
      loadAllItems();
    },
    error: function (error) {
      console.error("Error:", error);
      alert(
        "Failed to save item: " +
          (error.responseJSON?.message || "Server error"),
      );
    },
  });
}

/**
 * Load all items
 * API: GET /api/v1/items
 * Response: ItemDto[] array
 */
function loadAllItems() {
  $.ajax({
    url: BASE_URL_ITEMS,
    method: "GET",
    dataType: "json",
    success: function (items) {
      populateItemTable(items);
      // Also populate dropdown in place-order page if it exists
      if (typeof populateItemDropdown === "function") {
        populateItemDropdown(items);
      }
    },
    error: function (error) {
      console.error("Error loading items:", error);
      alert("Failed to load items");
      populateItemTable(getSampleItems());
    },
  });
}

/**
 * Get item by code
 * API: GET /api/v1/items/{itemCode}
 * Response: ItemDto { itemCode, itemName, description, unitPrice, quantityOnHand }
 */
function getItemById(itemId) {
  $.ajax({
    url: BASE_URL_ITEMS + "/" + itemId,
    method: "GET",
    dataType: "json",
    success: function (item) {
      populateItemFormWithData(item);
      selectedItemId = itemId;
    },
    error: function (error) {
      console.error("Error:", error);
      alert("Failed to load item details");
    },
  });
}

/**
 * Update item
 * API: PUT /api/v1/items/{itemCode}
 * Payload: { itemCode, itemName, description, unitPrice, quantityOnHand }
 * Response: ItemDto { itemCode, itemName, description, unitPrice, quantityOnHand }
 */
function updateItem() {
  if (!selectedItemId) {
    alert("Please select an item first (click Edit)");
    return;
  }

  const code = $("#code").val().trim();
  const name = $("#name").val().trim();
  const price = parseFloat($("#price").val());
  const qty = parseInt($("#qty").val());
  const description = $("#description").val().trim();

  if (!code || !name || !price || !qty) {
    alert("Please fill all required fields!");
    return;
  }

  if (price <= 0 || qty <= 0) {
    alert("Price and Quantity must be greater than 0!");
    return;
  }

  $.ajax({
    url: BASE_URL_ITEMS + "/" + selectedItemId,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      itemId: selectedItemId,
      itemCode: code,
      itemName: name,
      unitPrice: price,
      quantityOnHand: qty,
      description: description,
    }),
    success: function (response) {
      alert("Item updated successfully!");
      clearItemFormFields();
      selectedItemId = null;
      loadAllItems();
    },
    error: function (error) {
      console.error("Error:", error);
      alert(
        "Failed to update item: " +
          (error.responseJSON?.message || "Server error"),
      );
    },
  });
}

/**
 * Delete item
 * API: DELETE /api/v1/items/{itemCode}
 * Response: 204 No Content
 */
function deleteItem() {
  if (!selectedItemId) {
    alert("Please select an item first (click Edit)");
    return;
  }

  if (!confirm("Are you sure you want to delete this item?")) {
    return;
  }

  $.ajax({
    url: BASE_URL_ITEMS + "/" + selectedItemId,
    method: "DELETE",
    contentType: "application/json",
    success: function (response) {
      alert("Item deleted successfully!");
      clearItemFormFields();
      selectedItemId = null;
      loadAllItems();
    },
    error: function (error) {
      console.error("Error:", error);
      alert(
        "Failed to delete item: " +
          (error.responseJSON?.message || "Server error"),
      );
    },
  });
}

// ====== Helper Functions ======

/**
 * Populate item table with data
 */
function populateItemTable(items) {
  const tbody = $("#itemTable tbody");

  // Handle different table ID possibilities
  if (tbody.length === 0) {
    // Try alternative table ID
    const alternativeTable = $("table:first tbody");
    if (alternativeTable.length > 0) {
      tbody = alternativeTable;
    }
  }

  if (tbody.length === 0) {
    console.warn("Item table not found");
    return;
  }

  tbody.empty();

  if (!items || items.length === 0) {
    tbody.html(
      "<tr><td colspan='6' style='text-align:center;'>No items found</td></tr>",
    );
    return;
  }

  items.forEach(function (item) {
    const row = `
            <tr>
                <td>${item.itemCode || item.code || "N/A"}</td>
                <td>${item.itemName || item.name || "N/A"}</td>
                <td>${item.description || "N/A"}</td>
                <td>Rs. ${parseFloat(item.unitPrice || item.price || 0).toFixed(2)}</td>
                <td>${item.quantityOnHand || item.qty || 0}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="handleItemEdit('${item.itemId}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="handleItemDelete('${item.itemId}')">Delete</button>
                </td>
            </tr>
        `;
    tbody.append(row);
  });
}

/**
 * Populate form with item data
 */
function populateItemFormWithData(item) {
  $("#code").val(item.itemCode || item.code || "");
  $("#name").val(item.itemName || item.name || "");
  $("#price").val(item.unitPrice || item.price || "");
  $("#qty").val(item.quantityOnHand || item.qty || "");
  $("#description").val(item.description || "");
  selectedItemId = item.itemId || item.id || null;
}

/**
 * Handle edit button click
 */
function handleItemEdit(itemId) {
  getItemById(itemId);
  $("html, body").animate({ scrollTop: 0 }, "fast");
}

/**
 * Handle delete button click
 */
function handleItemDelete(itemId) {
  if (confirm("Are you sure you want to delete this item?")) {
    selectedItemId = itemId;
    deleteItem();
  }
}

/**
 * Clear form fields
 */
function clearItemFormFields() {
  $("#itemForm")[0].reset();
  selectedItemId = null;
}

/**
 * Sample data (fallback if API not available)
 * Uses exact DTO field names: itemCode, itemName, description, unitPrice, quantityOnHand
 */
function getSampleItems() {
  return [
    {
      itemId: 1,
      itemCode: "I001",
      itemName: "Mouse",
      description: "Wireless optical mouse with USB receiver",
      unitPrice: 100.0,
      quantityOnHand: 10,
    },
    {
      itemId: 2,
      itemCode: "I002",
      itemName: "Keyboard",
      description: "Mechanical gaming keyboard with RGB lighting",
      unitPrice: 200.0,
      quantityOnHand: 20,
    },
    {
      itemId: 3,
      itemCode: "I003",
      itemName: "Monitor",
      description: "24-inch LED monitor with Full HD resolution",
      unitPrice: 5000.0,
      quantityOnHand: 5,
    },
  ];
}
