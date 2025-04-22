<template>
  <navigation/>
 
   <header class="container">
     <div class="content-wrapper">
       <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
 
       <form @submit.prevent="handleSubmit">
         <input type="hidden" v-model="action" />
         <input type="hidden" v-if="editId" v-model="editId" />
 
         <div class="form-group">
           <label>EXPENSE TYPE:</label>
           <select v-model="expenseType" required @change="checkExpenseType">
             <option value="Food">Food</option>
             <option value="Bill">Bill</option>
             <option value="Transportation">Transportation</option>
             <option value="Entertainment">Entertainment</option>
             <option value="Healthcare">Healthcare</option>
             <option value="Personalcare">Personal care</option>
             <option value="Shopping">Shopping</option> 
             <option value="Other">Other</option>
            </select>
         </div>
 
         <div v-if="expenseType === 'Other'" class="form-group">
           <label>Custom Expense Type:</label>
           <input type="text" v-model="customExpenseType" placeholder="Enter custom expense type" />
         </div>
 
         <div class="form-group">
           <label>ITEM NAME:</label>
           <input type="text" v-model="itemName" placeholder="Enter item name" required />
         </div>
 
         <div class="form-group">
           <label>ITEM PRICE:</label>
           <input type="number" v-model.number="itemPrice" placeholder="Enter item price" required step="0.01" />
         </div>
 
         <button class="btn" type="submit">{{ editId ? 'Save Changes' : 'Add Expense' }}</button>
        <!--<button class="btn1" type="submit">{{ editId ? 'Save Changes' : 'Add Budget' }}</button> -->
       </form>
 
       <div>
         <div class="h3">Your Expenses</div>
         <ul>
           <li v-for="expense in expenses" :key="expense.id">
            {{ expense.item_name }} - ₱{{ expense.item_price.toFixed(2) }}
           </li>
         </ul>
       </div>
     </div>
     <div class="total">
       Total: ₱{{ (totalAmount * 50).toFixed(2) }} (≈ ${{ totalAmount.toFixed(2) }})
     </div>
    </header>
 </template>
 
 <script>
 import Navigation from "./navigation.vue";
 import axios from 'axios';
 
 export default {
   components: { Navigation },
   data() {
     return {
       expenseType: '',
       customExpenseType: '',
       itemName: '',
       itemPrice: '',
       successMessage: '',
       editId: null,
       expenses: [],
       personalBudgetId: null, //TEMPORARYYYYYYYYYYYYYYYYYY
       action: 'add'
     };
   },
   computed: {
     totalAmount() {
      return this.expenses?.reduce((sum, expense) => sum + (expense.item_price || 0), 0) || 0; //NEWWWWWWWWWWWWWWWWWWWW
     }
   },
   methods: {
     fetchExpenses() {
       axios.get('http://localhost:3000/api/expenses', {
         headers: { Authorization: `Bearer ${localStorage.getItem('jsontoken')}` }
       })
       .then(response => {
        this.expenses = response.data?.data || []; // NEWWWWWWWWWWWWWWWWWW
       })
       .catch(error => {
        console.error("Error fetching expenses:", error);
        this.expenses = []; // Reset to empty array on error
        this.successMessage = 'Failed to load expenses. Please try again.';
        });
    },
     handleSubmit() {
       const expenseData = {
         item_price: this.itemPrice,
         expense_type: this.expenseType === 'Other' ? this.customExpenseType : this.expenseType,
         item_name: this.itemName,
         personal_budget_id: this.personalBudgetId //TEMPORARYYYYYYYYYYYYYYYYYYYYYYY
       };
       const config = {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('jsontoken')}`
         }
       };
       
       if (this.editId) {
         // Edit existing expense
         axios.put('/api/expenses', { ...expenseData, id: this.editId }, config)
         .then(() => {
           this.successMessage = 'Expense updated successfully!';
           this.fetchExpenses();
           this.resetForm();
         })
         .catch(error => {
           console.error("Error updating expense:", error);
           this.successMessage = 'Failed to update expense.';
         });
       } else {
         // Add new expense
         axios.post('/api/expenses', expenseData, config)
         .then(() => {
           this.successMessage = 'Expense added successfully!';
           this.fetchExpenses();
           this.resetForm();
         })
         .catch(error => {
           console.error("Error adding expense:", error);
           this.successMessage = 'Failed to add expense.';
         });
       }
     },
     editExpense(expense) {
       this.editId = expense.id;
       this.expenseType = expense.expense_type;
       this.itemName = expense.item_name;
       this.itemPrice = expense.item_price;
     },
     deleteExpense(id) {
       if (confirm('Are you sure you want to delete this expense?')) {
         axios.delete(`/api/expenses/${id}`, {
           headers: { Authorization: `Bearer ${localStorage.getItem('jsontoken')}` }
         })
         .then(() => {
           this.successMessage = 'Expense deleted successfully!';
           this.fetchExpenses();
         });
       }
     },
     resetForm() {
       this.expenseType = '';
       this.customExpenseType = '';
       this.itemName = '';
       this.itemPrice = '';
       this.editId = null;
     }
   },
   mounted() {
     this.fetchExpenses();
   }
 };
 </script>
