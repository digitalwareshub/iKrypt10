# 💬 iKrypt Messaging Tests

## Test Environment
- Server: http://localhost:5173/
- Time: August 13, 2025
- Testing: One-Time Secret + Encrypted Chat

---

## 🔒 **ONE-TIME SECRET MESSAGING TESTS**

### **Test Case 1: Basic Secret Message**
**Input:**
```
Message: "Hello! This is a test of the one-time secret system.
Meeting location: Starbucks on 5th Street
Time: 3:00 PM today
Password: TempPass123!"

TTL: 2 hours
```

**Expected Behavior:**
- ✅ Should encrypt message with AES-256
- ✅ Should generate unique shareable link
- ✅ Should store in Firebase with 2-hour expiration
- ✅ First access should show message
- ✅ Second access should show "already read"

---

### **Test Case 2: Sensitive Corporate Data**
**Input:**
```
Message: "CONFIDENTIAL - Q4 Earnings Report
Revenue: $2.4M (up 15% YoY)
EBITDA: $800K 
Acquisition target: TechCorp Inc.
Board meeting: Friday 9 AM
Insider trading lockout until public announcement.

Delete immediately after reading."

TTL: 1 hour
```

**Expected Behavior:**
- ✅ Should handle longer text (>500 chars)
- ✅ Should encrypt special characters properly
- ✅ Should respect 1-hour TTL
- ✅ Should auto-expire after time limit

---

### **Test Case 3: Technical Credentials**
**Input:**
```
Message: "Production Server Access:
SSH: ssh user@prod-server-01.company.com
Password: Pr0d$erv3r!2025
API Key: sk-prod-1234567890abcdef
Database: postgresql://user:pass@db.internal:5432/maindb
VPN Config: office-vpn.ovpn (attached separately)

Valid until: August 20, 2025"

TTL: 168 hours (7 days)
```

**Expected Behavior:**
- ✅ Should handle complex credentials format
- ✅ Should preserve exact formatting
- ✅ Should work with maximum TTL (168 hours)

---

### **Test Case 4: Unicode and Special Characters**
**Input:**
```
Message: "🔐 Международный тест / 国际测试 
Arabic: مرحبا بك في اختبار التشفير
Emoji test: 🚀🎯💯🔥⭐
Special chars: <>&"'`{}[]()
Math symbols: ∑∆∞≈≠±×÷
Code: function(λ) { return λ × π; }

Multi-line
    indented text
        deeply nested"

TTL: 24 hours
```

**Expected Behavior:**
- ✅ Should handle all Unicode characters
- ✅ Should preserve formatting and spacing
- ✅ Should not break on special HTML chars

---

### **Test Case 5: Large Message Test**
**Input:**
```
Message: [Generated 2000+ character message with repeated content]
"Lorem ipsum dolor sit amet, consectetur adipiscing elit..." 
[Repeat this 50 times to test large message handling]

TTL: 12 hours
```

**Expected Behavior:**
- ✅ Should handle large messages efficiently
- ✅ Should not timeout during encryption
- ✅ Should load quickly on retrieval

---

## 💬 **ENCRYPTED CHAT MESSAGING TESTS**

### **Test Case 6: Basic Chat Functionality**
**Setup:**
- Room ID: "test-room-2025"
- User 1: "Alice"
- User 2: "Bob"

**Message Exchange:**
```
Alice: "Hello Bob, can you hear me?"
Bob: "Hi Alice! Yes, the encryption is working."
Alice: "Great! Let's test some sensitive data."
Bob: "Sure, go ahead."
Alice: "Credit card: 4111-1111-1111-1111"
Bob: "Got it. This should be fully encrypted."
```

**Expected Behavior:**
- ✅ Real-time message delivery
- ✅ End-to-end encryption
- ✅ Messages appear in correct order
- ✅ Timestamps are accurate

---

### **Test Case 7: Message Persistence**
**Test Scenario:**
1. Send 10 messages in chat room
2. Close browser tab
3. Rejoin same room with same key
4. Check if messages are still visible

**Expected Behavior:**
- ✅ Messages should persist in Firebase
- ✅ Chat history should reload correctly
- ✅ All messages should be decryptable

---

### **Test Case 8: Wrong Key Test**
**Test Scenario:**
1. User A creates room with key "correct-key-123"
2. User B tries to join with key "wrong-key-456"
3. User A sends message: "Can you see this?"

**Expected Behavior:**
- ❌ User B should not see the message
- ❌ Decryption should fail gracefully
- ✅ No error messages should expose data

---

### **Test Case 9: Concurrent Users**
**Test Scenario:**
- 3 users in same room simultaneously
- All sending messages rapidly
- Test message ordering and conflicts

**Expected Behavior:**
- ✅ All users see all messages
- ✅ Message order is consistent
- ✅ No message loss or duplication

---

### **Test Case 10: Message Expiration**
**Test Scenario:**
1. Enable message expiration (60 minutes)
2. Send test message
3. Wait for expiration (or simulate)
4. Check if message is removed

**Expected Behavior:**
- ✅ Expired messages should disappear
- ✅ Auto-cleanup should work
- ✅ No trace of expired content

---

## 🔍 **SECURITY VALIDATION TESTS**

### **Test Case 11: Key Extraction Attempt**
**Attack Simulation:**
1. Intercept network traffic during messaging
2. Check browser storage for keys
3. Examine Firebase data directly
4. Look for key leakage in console logs

**Expected Security:**
- ✅ Keys should never appear in network traffic
- ✅ No plaintext keys in localStorage
- ✅ Firebase should only contain encrypted data
- ✅ Console should not log sensitive data

### **Test Case 12: XSS Prevention**
**Input:**
```
Message: "<script>alert('XSS Test')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')
<iframe src='javascript:alert()'></iframe>"
```

**Expected Behavior:**
- ✅ Script tags should be sanitized
- ✅ No JavaScript execution
- ✅ Content should display as text only

### **Test Case 13: Injection Testing**
**Input:**
```
Message: "'; DROP TABLE messages; --
{{constructor.constructor('alert(1)')()}}
${7*7}
#{7*7}
<%= 7*7 %>
{{7*7}}"
```

**Expected Behavior:**
- ✅ No template injection
- ✅ No SQL injection vectors
- ✅ Content rendered as literal text

---

## 📊 **PERFORMANCE TESTS**

### **Test Case 14: Message Load Time**
- Send 100 messages to chat room
- Measure time to load chat history
- Test with different message sizes

**Expected Performance:**
- ✅ <2 seconds to load 100 messages
- ✅ Smooth scrolling with large history
- ✅ No memory leaks during extended use

### **Test Case 15: Encryption Speed**
- Test encryption of 1KB, 10KB, 100KB messages
- Measure time for one-time secret creation
- Test concurrent encryption operations

**Expected Performance:**
- ✅ 1KB message: <50ms
- ✅ 10KB message: <200ms
- ✅ 100KB message: <1000ms

---

## 🌐 **CROSS-BROWSER TESTING**

### **Test Case 16: Browser Compatibility**
Test all messaging features on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

**Expected Behavior:**
- ✅ Identical functionality across browsers
- ✅ No browser-specific errors
- ✅ Consistent UI/UX experience

---

## 📱 **MOBILE TESTING**

### **Test Case 17: Mobile Messaging**
- Test on iOS Safari
- Test on Android Chrome
- Test responsive design
- Test touch interactions

**Expected Behavior:**
- ✅ Full functionality on mobile
- ✅ Responsive chat interface
- ✅ Touch-friendly controls

---

## 🔧 **ERROR HANDLING TESTS**

### **Test Case 18: Network Interruption**
1. Start sending message
2. Disconnect internet
3. Reconnect after 30 seconds
4. Try to send message again

**Expected Behavior:**
- ✅ Graceful error handling
- ✅ Message queue/retry mechanism
- ✅ User feedback on connection status

### **Test Case 19: Invalid Data**
- Empty messages
- Null/undefined inputs
- Extremely long messages (>1MB)
- Invalid room IDs

**Expected Behavior:**
- ✅ Proper input validation
- ✅ Clear error messages
- ✅ No application crashes

