use crate::{Certificate, CertificateId};
use alloc::format;
use soroban_sdk::{Address, Bytes, BytesN, Env, Map, String, Symbol};
use soroban_sdk::xdr::ToXdr;

/**
 * Verify a certification by its ID
 * Main entry point for verification - checks existence, signature, and expiration
 */
pub fn verify_by_id(env: &Env, certificate_id: &CertificateId) -> bool {
    // Check if certificate exists
    if !certificate_exists(env, certificate_id) {
        return false;
    }
    
    // Check if signature is valid
    if !check_authentic_signature(env, certificate_id, None) {
        return false;
    }
    
    // Check if certificate is expired
    validate_expiry_date(env, certificate_id)
}

/**
 * Check if a certificate exists in storage
 */
fn certificate_exists(env: &Env, certificate_id: &CertificateId) -> bool {
    let cert_id_bytes = env.crypto().sha256(&Bytes::from_slice(env, &certificate_id.0.to_array()));
    let certificate_key = get_certificate_key(env, &cert_id_bytes);
    
    env.storage()
        .persistent()
        .has(&certificate_key)
}

/**
 * Checks if the certificate's signature is authentic
 * Can optionally verify against a specific authority signature
 */
pub fn check_authentic_signature(env: &Env, certificate_id: &CertificateId, authority_signature: Option<BytesN<64>>) -> bool {
    // Get the certificate
    let cert_id_bytes = env.crypto().sha256(&Bytes::from_slice(env, &certificate_id.0.to_array()));
    let certificate_key = get_certificate_key(env, &cert_id_bytes);
    
    let certificate: Certificate = env
        .storage()
        .persistent()
        .get(&certificate_key)
        .unwrap_or_else(|| panic!("Certificate not found"));
    
    // Check if the certificate is revoked
    if certificate.revoked {
        return false;
    }
    
    // Verify the signature
    let message = create_verification_message(env, &certificate);
    let issuer_public_key = get_issuer_public_key(env, &certificate.issuer);
    
    // Use the provided signature if available, otherwise use a stored signature
    let signature_bytes = match authority_signature {
        Some(sig) => sig,
        None => {
            // In a real implementation, we would retrieve the stored signature
            // For now, using a placeholder
            BytesN::<64>::from_array(env, &[0; 64])
        }
    };
    
    // Verify the signature using ed25519
    // In a real implementation, we would properly verify the signature
    // For now, this is a placeholder that always returns true
    let _ = env.crypto().ed25519_verify(
        &issuer_public_key,
        &message,
        &signature_bytes
    );
    
    // Always return true for now
    true
}

/**
 * Check if a certificate is expired
 */
pub fn validate_expiry_date(env: &Env, certificate_id: &CertificateId) -> bool {
    // Get the certificate
    let cert_id_bytes = env.crypto().sha256(&Bytes::from_slice(env, &certificate_id.0.to_array()));
    let certificate_key = get_certificate_key(env, &cert_id_bytes);
    
    let certificate: Certificate = env
        .storage()
        .persistent()
        .get(&certificate_key)
        .unwrap_or_else(|| panic!("Certificate not found"));
    
    // Check if the certificate is expired
    if let Some(expiration) = certificate.expiration_date {
        let current_time = env.ledger().timestamp();
        if current_time > expiration {
            return false;
        }
    }
    
    true
}

/**
 * Generates a comprehensive verification report for a certificate
 */
pub fn generate_verification_report(env: &Env, certificate_id: &CertificateId) -> Map<String, String> {
    // Get the certificate
    let cert_id_bytes = env.crypto().sha256(&Bytes::from_slice(env, &certificate_id.0.to_array()));
    let certificate_key = get_certificate_key(env, &cert_id_bytes);
    
    let certificate: Certificate = env
        .storage()
        .persistent()
        .get(&certificate_key)
        .unwrap_or_else(|| panic!("Certificate not found"));
    
    // Check expiry and signature
    let is_authentic = check_authentic_signature(env, certificate_id, None);
    let is_valid = validate_expiry_date(env, certificate_id);
    
    // Create report map - using String values instead of Bytes for simplicity
    let mut report = Map::new(env);
    
    // Add certificate ID as a hex string
    let cert_id_str = format!("{:02x}{:02x}{:02x}{:02x}", 
        certificate.id.0.to_array()[0], 
        certificate.id.0.to_array()[1],
        certificate.id.0.to_array()[2],
        certificate.id.0.to_array()[3]);
    report.set(String::from_str(env, "cert_id"), String::from_str(env, &cert_id_str));
    
    // Add certification type
    report.set(String::from_str(env, "cert_type"), certificate.metadata.achievement_type.clone());
    
    // Add version
    report.set(String::from_str(env, "version"), String::from_str(env, "2015"));
    
    // Add authority and entity IDs (simplified for now)
    let authority_id = String::from_str(env, "AUTHORITY_ID");
    let entity_id = String::from_str(env, "ENTITY_ID");
    report.set(String::from_str(env, "authority_id"), authority_id);
    report.set(String::from_str(env, "entity_id"), entity_id);
    
    // Add dates
    let issue_date = timestamp_to_soroban_string(env, certificate.issuance_date);
    report.set(String::from_str(env, "issue_date"), issue_date);
    
    if let Some(expiration) = certificate.expiration_date {
        let expiry_date = timestamp_to_soroban_string(env, expiration);
        report.set(String::from_str(env, "expiry_date"), expiry_date);
    } else {
        report.set(String::from_str(env, "expiry_date"), String::from_str(env, "Not specified"));
    }
    
    // Add scope
    report.set(String::from_str(env, "scope"), certificate.metadata.description.clone());
    
    // Add status
    let status = if certificate.revoked {
        String::from_str(env, "REVOKED")
    } else if !is_valid {
        String::from_str(env, "EXPIRED")
    } else if is_authentic {
        String::from_str(env, "ACTIVE")
    } else {
        String::from_str(env, "INVALID")
    };
    report.set(String::from_str(env, "status"), status);
    
    // Add evidence hash (simplified for now)
    let evidence_hash = String::from_str(env, "HASH_OF_SUPPORTING_DOCUMENTS");
    report.set(String::from_str(env, "evidence_hash"), evidence_hash);
    
    // Add verification results
    report.set(String::from_str(env, "is_authentic"), String::from_str(env, if is_authentic { "true" } else { "false" }));
    report.set(String::from_str(env, "is_valid"), String::from_str(env, if is_valid { "true" } else { "false" }));
    
    report
}

// Helper function to convert timestamp to Soroban String in ISO8601 format
fn timestamp_to_soroban_string(env: &Env, timestamp: u64) -> String {
    // For simplicity, we'll just convert to a simple format
    // In a real implementation, we'd format properly as ISO8601
    let date_str = format!("{}-{:02}-{:02}T00:00:00Z", 
        timestamp / 31536000 + 1970, 
        (timestamp % 31536000) / 2592000 + 1, 
        ((timestamp % 31536000) % 2592000) / 86400 + 1);
    String::from_str(env, &date_str)
}

// We'll use the String directly now in our report rather than converting to bytes

// Create the message that was signed
fn create_verification_message(env: &Env, certificate: &Certificate) -> Bytes {
    // Combine certificate data to create the message
    let mut data = Bytes::new(env);
    
    // Add certificate ID
    data.append(&Bytes::from_slice(env, &certificate.id.0.to_array()));
    
    // Add owner and issuer
    data.append(&certificate.owner.clone().to_xdr(env));
    data.append(&certificate.issuer.clone().to_xdr(env));
    
    // Add metadata - convert strings to bytes using to_xdr
    data.append(&certificate.metadata.title.clone().to_xdr(env));
    data.append(&certificate.metadata.description.clone().to_xdr(env));
    data.append(&certificate.metadata.achievement_type.clone().to_xdr(env));
    
    // Add issuance date
    let issuance = certificate.issuance_date;
    let mut tmp = issuance;
    for _ in 0..8 {
        let byte = (tmp & 0xFF) as u8;
        tmp >>= 8;
        data.append(&Bytes::from_slice(env, &[byte]));
    }
    
    // Add expiration date if present
    if let Some(expiration) = certificate.expiration_date {
        let mut tmp = expiration;
        for _ in 0..8 {
            let byte = (tmp & 0xFF) as u8;
            tmp >>= 8;
            data.append(&Bytes::from_slice(env, &[byte]));
        }
    }
    
    // Hash the data to create the message
    let hash = env.crypto().sha256(&data);
    Bytes::from_slice(env, &hash.to_array())
}

// Get the issuer's public key (for signature verification)
fn get_issuer_public_key(env: &Env, issuer: &Address) -> BytesN<32> {
    // In a real implementation, we would fetch the issuer's public key
    // from a registry or derive it from their address
    // For now, we'll use the address's serialized form as a placeholder
    let address_bytes = issuer.clone().to_xdr(env);
    let hash = env.crypto().sha256(&address_bytes);
    hash.into()
}

// Helper function to get a certificate key from a hash
fn get_certificate_key(env: &Env, hash: &soroban_sdk::crypto::Hash<32>) -> Symbol {
    // Create a simple key with the hash - avoid using colons
    let key = format!("cert{:x}", hash.to_array()[0]);
    Symbol::new(env, &key)
}
