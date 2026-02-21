/* ========================================
   Customer Management - jQuery API Integration
   Base URL: localhost:8080/api/v1
   Backend DTOs: CustomerDto
   ======================================== */

const BASE_URL = "http://localhost:8080/api/v1/customers";

let selectedCustomerId = null;

// Initialize on page load
$(document).ready(function() {
    loadAllCustomers();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Form submission
    $("#customerForm").on("submit", function(e) {
        e.preventDefault();
        saveCustomer();
    });

    // Update button
    $(".btn-warning").on("click", function() {
        updateCustomer();
    });

    // Delete button
    $(".btn-danger").on("click", function(e) {
        if ($(this).closest("form").length) {
            e.preventDefault();
            deleteCustomer();
        }
    });
}

// ====== API CRUD Functions ======

/**
 * Save new customer
 * API: POST /api/v1/customers
 * Payload: { customerName, phoneNumber, address }
 * Response: CustomerDto { customerId, customerName, phoneNumber, address }
 */
function saveCustomer() {
    const name = $("#name").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();

    if (!name || !phone || !address) {
        alert("Please fill all fields!");
        return;
    }

    $.ajax({
        url: BASE_URL,
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
        },
        error: function(error) {
            console.error("Error:", error);
            alert("Failed to save customer: " + (error.responseJSON?.message || "Server error"));
        }
    });
}

/**
 * Load all customers
 * API: GET /api/v1/customers
 * Response: CustomerDto[] array
 */
function loadAllCustomers() {
    $.ajax({
        url: BASE_URL,
        method: "GET",
        dataType: "json",
        success: function(customers) {
            populateCustomerTable(customers);
        },
        error: function(error) {
            console.error("Error loading customers:", error);
            alert("Failed to load customers");
            // Show sample data if API fails
            populateCustomerTable(getSampleCustomers());
        }
    });
}

/**
 * Get customer by ID
 * API: GET /api/v1/customers/{customerId}
 * Response: CustomerDto { customerId, customerName, phoneNumber, address }
 */
function getCustomerById(customerId) {
    $.ajax({
        url: BASE_URL + "/" + customerId,
        method: "GET",
        dataType: "json",
        success: function(customer) {
            populateFormWithCustomer(customer);
            selectedCustomerId = customerId;
        },
        error: function(error) {
            console.error("Error:", error);
            alert("Failed to load customer details");
        }
    });
}

/**
 * Update customer
 * API: PUT /api/v1/customers/{customerId}
 * Payload: { customerId, customerName, phoneNumber, address }
 * Response: CustomerDto { customerId, customerName, phoneNumber, address }
 */
function updateCustomer() {
    if (!selectedCustomerId) {
        alert("Please select a customer first (click Edit)");
        return;
    }

    const name = $("#name").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();

    if (!name || !phone || !address) {
        alert("Please fill all fields!");
        return;
    }

    $.ajax({
        url: BASE_URL + "/" + selectedCustomerId,
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
        },
        error: function(error) {
            console.error("Error:", error);
            alert("Failed to update customer: " + (error.responseJSON?.message || "Server error"));
        }
    });
}

/**
 * Delete customer
 * API: DELETE /api/v1/customers/{customerId}
 * Response: 204 No Content
 */
function deleteCustomer() {
    if (!selectedCustomerId) {
        alert("Please select a customer first (click Edit)");
        return;
    }

    if (!confirm("Are you sure you want to delete this customer?")) {
        return;
    }

    $.ajax({
        url: BASE_URL + "/" + selectedCustomerId,
        method: "DELETE",
        contentType: "application/json",
        success: function(response) {
            alert("Customer deleted successfully!");
            clearFormFields();
            selectedCustomerId = null;
            loadAllCustomers();
        },
        error: function(error) {
            console.error("Error:", error);
            alert("Failed to delete customer: " + (error.responseJSON?.message || "Server error"));
        }
    });
}

// ====== Helper Functions ======

/**
 * Populate customer table with data
 */
function populateCustomerTable(customers) {
    const tbody = $("#customerTable tbody");
    tbody.empty();

    if (!customers || customers.length === 0) {
        tbody.html("<tr><td colspan='5' style='text-align:center;'>No customers found</td></tr>");
        return;
    }

    customers.forEach(function(customer, index) {
        const row = `
            <tr>
                <td>${customer.customerId || customer.id || "N/A"}</td>
                <td>${customer.customerName || customer.name || "N/A"}</td>
                <td>${customer.address || "N/A"}</td>
                <td>${customer.phoneNumber || customer.phone || "N/A"}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="handleEdit('${customer.customerId || customer.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="handleDelete('${customer.customerId || customer.id}')">Delete</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

/**
 * Populate form with customer data
 */
function populateFormWithCustomer(customer) {
    $("#name").val(customer.customerName || customer.name || "");
    $("#phone").val(customer.phoneNumber || customer.phone || "");
    $("#address").val(customer.address || "");
    selectedCustomerId = customer.customerId || customer.id;
}

/**
 * Handle edit button click
 */
function handleEdit(customerId) {
    getCustomerById(customerId);
    // Scroll to form
    $("html, body").animate({ scrollTop: 0 }, "fast");
}

/**
 * Handle delete button click
 */
function handleDelete(customerId) {
    if (confirm("Are you sure you want to delete this customer?")) {
        selectedCustomerId = customerId;
        deleteCustomer();
    }
}

/**
 * Clear form fields
 */
function clearFormFields() {
    $("#customerForm")[0].reset();
    selectedCustomerId = null;
}

/**
 * Sample data (fallback if API not available)
 * Uses exact DTO field names: customerId, customerName, phoneNumber, address
 */
function getSampleCustomers() {
    return [
        {
            customerId: "C001",
            customerName: "Hemal",
            phoneNumber: "0776655444",
            address: "No.34, Galle Road, Colombo 03"
        },
        {
            customerId: "C002",
            customerName: "Kamal",
            phoneNumber: "0788776655",
            address: "No.56, Kandy Road, Kandy"
        },
        {
            customerId: "C003",
            customerName: "Nimal",
            phoneNumber: "0765544332",
            address: "No.78, Marine Drive, Mount Lavinia"
        }
    ];
}
