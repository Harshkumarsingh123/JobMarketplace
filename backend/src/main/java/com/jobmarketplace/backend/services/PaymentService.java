package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.entity.Payment;
import com.jobmarketplace.backend.entity.PaymentStatus;
import com.jobmarketplace.backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepo;

    public void markPaymentSuccess(
            String orderId,
            String paymentId
    ) {
        Payment payment = paymentRepo
                .findByRazorpayOrderId(orderId)
                .orElseThrow();

        payment.setRazorpayPaymentId(paymentId);
        payment.setStatus(PaymentStatus.PAID);

        paymentRepo.save(payment);
    }
}
