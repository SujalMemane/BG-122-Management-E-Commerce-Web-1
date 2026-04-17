# Abandoned Cart Tracking - Setup Guide

## 🔥 Firestore Security Rules Update Required

The abandoned cart feature requires access to the `carts` collection in Firestore. You need to update your Firestore security rules in the Firebase Console.

### Steps to Update Firestore Rules:

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `management-e-commerce-we-b8dda`
3. **Navigate to Firestore Database** (left sidebar)
4. **Click on "Rules" tab** at the top
5. **Add the following rule** to your existing rules (around line 43, after `analytics_config`):

```javascript
match /carts/{id} {
  allow read, write: if isAuth();
}
```

6. **Click "Publish"** to deploy the updated rules

### Complete Rules File

The complete `firestore.rules` file is available in your project root. You can copy the entire content and paste it into the Firebase Console Rules editor.

---

## 📧 Email API Configuration

To enable recovery email sending, you need to configure your API key:

1. Open `js/pages/abandoned-carts.js`
2. Find line 36: `const EMAIL_API_KEY = '';`
3. Add your Groq API key (provided separately for security)

**Security Note**: For production, use Firebase Functions or environment variables to store API keys securely.

---

## 🧪 Testing the Feature

After updating the Firestore rules:

1. **Refresh the Abandoned Carts page**
2. **Click "Scan for Abandoned Carts"** button
3. The page should now load without permission errors

### Creating Test Data

To test the abandoned cart feature, you can:

1. Create sample cart data in Firestore Console manually, OR
2. Use the storefront to add items to cart (when integrated), OR
3. Run this code in browser console on any admin page:

```javascript
import { saveCart } from './js/cart-service.js';

// Create a test abandoned cart
await saveCart('test-customer-1', [
  { name: 'Laptop Pro', price: 1299.99, quantity: 1, productId: 'prod-1' },
  { name: 'Wireless Mouse', price: 29.99, quantity: 2, productId: 'prod-2' }
], 'customer@example.com', 'John Doe');

console.log('Test cart created!');
```

---

## 🎯 Feature Overview

### What's Included:

✅ **Cart Service** (`js/cart-service.js`)
- Save/update customer carts
- Track cart interactions
- Detect abandoned carts (24+ hours old)
- Generate recovery coupon codes
- Mark carts as recovered/converted

✅ **Admin Dashboard** (`pages/abandoned-carts.html`)
- View all carts with filtering
- Real-time statistics
- Search by customer name/email
- Send recovery emails
- Track recovery attempts

✅ **Recovery System**
- Auto-generate unique 10% discount coupons
- Email templates with cart details
- Track email send attempts
- Mark successful recoveries

### Key Metrics Tracked:

- **Total Abandoned**: Number of carts abandoned 24+ hours
- **Potential Revenue**: Total value of abandoned carts
- **Recovered**: Carts where customer completed purchase
- **Recovery Rate**: Percentage of successful recoveries

---

## 🚀 Next Steps

1. ✅ Update Firestore rules (required)
2. ✅ Configure email API key (optional for testing)
3. ✅ Test the feature with sample data
4. ✅ Integrate with your storefront cart system
5. ✅ Set up automated email triggers (Firebase Functions recommended)

---

## 📝 Notes

- The feature uses a 24-hour threshold to identify abandoned carts
- Recovery emails include personalized coupon codes
- All cart data is stored in Firestore `carts` collection
- Email sending uses Groq API (can be replaced with SendGrid, Mailgun, etc.)

---

## 🔒 Security Recommendations

For production deployment:

1. Move API keys to Firebase Functions
2. Implement rate limiting for email sends
3. Add email verification before sending
4. Set up proper error logging
5. Consider using Firebase Extensions for email delivery

---

**Need Help?** Check the console logs for detailed error messages.
