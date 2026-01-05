package com.jobmarketplace.backend.controller;

import com.jobmarketplace.backend.config.JwtUtil;
import com.jobmarketplace.backend.config.RazorpayConfig;
import com.jobmarketplace.backend.dto.PaymentVerifyRequest;
import com.jobmarketplace.backend.dto.RazorpayOrderResponse;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.entity.Payment;
import com.jobmarketplace.backend.entity.PaymentStatus;
import com.jobmarketplace.backend.repository.JobRepository;
import com.jobmarketplace.backend.repository.PaymentRepository;
import com.jobmarketplace.backend.services.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final RazorpayConfig razorpayConfig;
    private final PaymentRepository paymentRepo;
    private final JobRepository jobRepo;
    private final JwtUtil jwtUtil;

    @PostMapping("/create-order/{jobId}")
    public RazorpayOrderResponse createOrder(
            @PathVariable Long jobId,
            HttpServletRequest request
    ) throws Exception {

        String email = jwtUtil.extractEmail(
                request.getHeader("Authorization").substring(7)
        );

        Job job = jobRepo.findById(jobId).orElseThrow();

        double amount = Double.parseDouble(job.getPay());
        double commission = amount * 0.05;
        double payout = amount - commission;

        RazorpayClient client = new RazorpayClient(
                razorpayConfig.getKey(),
                razorpayConfig.getSecret()
        );

        JSONObject orderReq = new JSONObject();
        orderReq.put("amount", (int) (amount * 100));
        orderReq.put("currency", "INR");
        orderReq.put("receipt", "job_" + jobId);

        Order order = client.orders.create(orderReq);

        Payment payment = new Payment();
        payment.setJobId(jobId);
        payment.setProviderEmail(email);
        payment.setSeekerEmail(job.getPostedByEmail());
        payment.setAmount(amount);
        payment.setCommission(commission);
        payment.setPayout(payout);
        payment.setRazorpayOrderId(order.get("id"));
        payment.setStatus(PaymentStatus.CREATED);
        payment.setCreatedAt(LocalDateTime.now());

        paymentRepo.save(payment);

        return new RazorpayOrderResponse(order.get("id"), amount);
    }
}
