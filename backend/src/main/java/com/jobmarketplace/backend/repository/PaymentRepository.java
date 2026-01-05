package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByRazorpayOrderId(String orderId);
}
