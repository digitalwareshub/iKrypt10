# iKrypt Tools Testing Scenarios

## Test Environment
- Server: http://localhost:5173/
- Browser: Chrome/Safari (latest)
- Test Data: Files in /test-data/

## 🔒 Test 1: One-Time Secret
### Input Data:
```
Message: "API Key: sk-1234567890abcdef
Database Password: mySecretDBPass123!
Please delete this after reading."

TTL: 24 hours
```

### Expected Results:
- ✅ Should generate encrypted link with key in URL fragment
- ✅ Firebase document should be created with expiration
- ✅ Link should decrypt message properly
- ✅ Second access should show "message already read"
- ✅ Copy to clipboard should work

### Test Steps:
1. Navigate to /one-time
2. Paste test message
3. Set TTL to 24 hours  
4. Click "Create Secret"
5. Copy generated link
6. Open link in new tab
7. Verify message displays correctly
8. Try accessing link again (should fail)

---

## 🔐 Test 2: File Encryption
### Input Files:
- test-document.pdf (765 bytes)
- test-image.txt (575 bytes) 
- test-data.json (765 bytes)

### Expected Results:
- ✅ Should encrypt files with AES-256
- ✅ Should generate random encryption keys
- ✅ Should handle different file types
- ✅ Decryption should restore original files
- ✅ Wrong key should fail decryption

### Test Steps:
1. Navigate to /file-encrypt
2. Upload test-document.pdf
3. Click "Encrypt File"
4. Download encrypted file
5. Switch to decrypt mode
6. Upload encrypted file with correct key
7. Verify original content restored
8. Test with wrong key (should fail)

---

## 🔑 Test 3: Password Generator
### Test Scenarios:
```
Scenario A: Strong Password
- Length: 32
- Include: All character types
- Exclude: Similar chars

Scenario B: PIN Code
- Length: 6
- Include: Numbers only

Scenario C: Memorable Password
- Length: 16
- Include: Letters + Numbers
- Exclude: Special chars + Similar
```

### Expected Results:
- ✅ Should generate different passwords each time
- ✅ Should respect character set preferences
- ✅ Should calculate entropy correctly
- ✅ Should show strength indicator
- ✅ History should track passwords

---

## ✍️ Test 4: Digital Signature
### Input Data:
```
Message: "I hereby authorize the transfer of $10,000 
from account 123456789 to account 987654321.
Signed on August 13, 2025.
- John Doe"
```

### Expected Results:
- ✅ Should generate ECDSA P-384 keypair
- ✅ Should sign message and produce signature
- ✅ Should verify signature with public key
- ✅ Modified message should fail verification
- ✅ Wrong public key should fail verification

---

## #️⃣ Test 5: Hash Generator
### Input Data:
- Text: "This is a test message for hashing"
- File: test-data.json

### Expected Results:
```
SHA-256 of text: Expected specific hash
SHA-512 of file: Expected specific hash
```
- ✅ Should generate consistent hashes
- ✅ Should support multiple algorithms
- ✅ Should handle large files
- ✅ Hash verification should work
- ✅ Different algorithms should produce different hashes

---

## 🔀 Test 6: Split Key (Shamir's Secret Sharing)
### Input Data:
```
Secret: "The nuclear launch codes are: ALPHA-BRAVO-CHARLIE-123"
Total Shares: 5
Threshold: 3
```

### Expected Results:
- ✅ Should generate 5 different shares
- ✅ Any 3 shares should reconstruct original secret
- ✅ 2 shares should fail to reconstruct
- ✅ Invalid shares should be rejected
- ✅ Threshold validation should work

---

## 🛡️ Test 7: iKrypt Guard (2FA)
### Test Scenarios:
```
Test Account:
- Name: "Google Account"
- Issuer: "Google"
- Secret: "JBSWY3DPEHPK3PXP" (base32)
```

### Expected Results:
- ✅ Should generate 6-digit TOTP codes
- ✅ Codes should change every 30 seconds
- ✅ Should support QR code scanning
- ✅ Backup codes should be generated
- ✅ Multiple accounts should be manageable

---

## 💬 Test 8: Encrypted Chat
### Test Scenario:
```
Room: "test-room-123"
Users: Alice, Bob
Messages: 
- "Hello, this is Alice"
- "Hi Alice, Bob here"
- "Let's test the encryption"
```

### Expected Results:
- ✅ Should create encrypted chat room
- ✅ Messages should be end-to-end encrypted
- ✅ Real-time messaging should work
- ✅ Message history should persist
- ✅ Wrong room key should fail

---

## 🔧 Performance Tests
### Large File Handling:
- Create 10MB test file
- Test encryption/decryption performance
- Verify progress indicators work
- Check memory usage

### Stress Testing:
- Generate 100 passwords rapidly
- Hash multiple large files
- Create many one-time secrets
- Test concurrent chat messages

---

## 🛡️ Security Validation Tests
### Encryption Strength:
- Verify keys are truly random
- Check IV/nonce uniqueness
- Validate proper algorithm usage
- Test against known attack vectors

### Data Leakage Tests:
- Check browser console for exposed data
- Verify localStorage/sessionStorage security
- Test network requests for data leaks
- Validate URL fragment key handling

