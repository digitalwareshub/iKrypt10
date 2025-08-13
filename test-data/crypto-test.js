// Test script for iKrypt cryptographic functions
// This script can be run in browser console to test encryption functions

console.log("🔒 Starting iKrypt Cryptographic Tests...");

// Test 1: Password Generation
function testPasswordGeneration() {
    console.log("\n📋 Test 1: Password Generation");
    
    // Test character pools
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Generate test passwords
    const passwords = [];
    for (let i = 0; i < 10; i++) {
        const length = 16;
        let pool = uppercase + lowercase + numbers + special;
        let password = '';
        
        // Use crypto.getRandomValues for secure generation
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        
        for (let j = 0; j < length; j++) {
            password += pool[array[j] % pool.length];
        }
        passwords.push(password);
    }
    
    console.log("Generated passwords:", passwords);
    
    // Test uniqueness
    const unique = new Set(passwords);
    console.log(`✅ Uniqueness test: ${unique.size}/${passwords.length} unique passwords`);
    
    // Test entropy (approximate)
    const avgEntropy = passwords.reduce((sum, pwd) => sum + pwd.length * Math.log2(pool.length), 0) / passwords.length;
    console.log(`✅ Average entropy: ${avgEntropy.toFixed(2)} bits`);
}

// Test 2: Hash Generation
async function testHashGeneration() {
    console.log("\n#️⃣ Test 2: Hash Generation");
    
    const testData = "This is a test message for hashing";
    const encoder = new TextEncoder();
    const data = encoder.encode(testData);
    
    // Test different algorithms
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    
    for (const algo of algorithms) {
        try {
            const hashBuffer = await crypto.subtle.digest(algo, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            console.log(`✅ ${algo}: ${hashHex}`);
        } catch (error) {
            console.log(`❌ ${algo}: ${error.message}`);
        }
    }
}

// Test 3: AES Encryption
async function testAESEncryption() {
    console.log("\n🔐 Test 3: AES Encryption");
    
    const plaintext = "Secret message that needs encryption";
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    try {
        // Generate key
        const key = await crypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
        
        // Generate IV
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        // Encrypt
        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encoder.encode(plaintext)
        );
        
        console.log(`✅ Original: ${plaintext}`);
        console.log(`✅ Encrypted length: ${encrypted.byteLength} bytes`);
        
        // Decrypt
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encrypted
        );
        
        const decryptedText = decoder.decode(decrypted);
        console.log(`✅ Decrypted: ${decryptedText}`);
        console.log(`✅ Match: ${plaintext === decryptedText}`);
        
    } catch (error) {
        console.log(`❌ AES Encryption failed: ${error.message}`);
    }
}

// Test 4: Digital Signature
async function testDigitalSignature() {
    console.log("\n✍️ Test 4: Digital Signature");
    
    const message = "This is a test message for digital signing";
    const encoder = new TextEncoder();
    
    try {
        // Generate keypair
        const keyPair = await crypto.subtle.generateKey(
            { name: "ECDSA", namedCurve: "P-384" },
            true,
            ["sign", "verify"]
        );
        
        // Sign message
        const signature = await crypto.subtle.sign(
            { name: "ECDSA", hash: "SHA-256" },
            keyPair.privateKey,
            encoder.encode(message)
        );
        
        console.log(`✅ Message: ${message}`);
        console.log(`✅ Signature length: ${signature.byteLength} bytes`);
        
        // Verify signature
        const isValid = await crypto.subtle.verify(
            { name: "ECDSA", hash: "SHA-256" },
            keyPair.publicKey,
            signature,
            encoder.encode(message)
        );
        
        console.log(`✅ Signature valid: ${isValid}`);
        
        // Test with modified message
        const modifiedMessage = message + " (modified)";
        const isValidModified = await crypto.subtle.verify(
            { name: "ECDSA", hash: "SHA-256" },
            keyPair.publicKey,
            signature,
            encoder.encode(modifiedMessage)
        );
        
        console.log(`✅ Modified message valid: ${isValidModified} (should be false)`);
        
    } catch (error) {
        console.log(`❌ Digital Signature failed: ${error.message}`);
    }
}

// Test 5: Random Number Generation Quality
function testRandomGeneration() {
    console.log("\n🎲 Test 5: Random Number Generation");
    
    const samples = 10000;
    const bytes = new Uint8Array(samples);
    crypto.getRandomValues(bytes);
    
    // Calculate distribution
    const distribution = new Array(256).fill(0);
    for (let i = 0; i < samples; i++) {
        distribution[bytes[i]]++;
    }
    
    // Calculate chi-square test (simplified)
    const expected = samples / 256;
    let chiSquare = 0;
    for (let i = 0; i < 256; i++) {
        const diff = distribution[i] - expected;
        chiSquare += (diff * diff) / expected;
    }
    
    console.log(`✅ Chi-square value: ${chiSquare.toFixed(2)}`);
    console.log(`✅ Expected range: ~200-300 for good randomness`);
    console.log(`✅ Quality: ${chiSquare > 200 && chiSquare < 300 ? 'Good' : 'Check required'}`);
    
    // Test for patterns
    let patterns = 0;
    for (let i = 1; i < samples; i++) {
        if (bytes[i] === bytes[i-1]) patterns++;
    }
    
    console.log(`✅ Sequential patterns: ${patterns}/${samples} (${(patterns/samples*100).toFixed(2)}%)`);
}

// Run all tests
async function runAllTests() {
    console.log("🚀 iKrypt Cryptographic Function Tests");
    console.log("=====================================");
    
    testPasswordGeneration();
    await testHashGeneration();
    await testAESEncryption();
    await testDigitalSignature();
    testRandomGeneration();
    
    console.log("\n✅ All tests completed!");
    console.log("Check results above for any failures.");
}

// Export for use
if (typeof module !== 'undefined') {
    module.exports = {
        testPasswordGeneration,
        testHashGeneration,
        testAESEncryption,
        testDigitalSignature,
        testRandomGeneration,
        runAllTests
    };
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log("Ready to run tests. Execute: runAllTests()");
}
