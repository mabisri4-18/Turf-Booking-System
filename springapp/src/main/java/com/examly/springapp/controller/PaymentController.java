package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.examly.springapp.model.Payment;
import com.examly.springapp.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/addPayment")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @GetMapping("/allPayments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {
        return paymentService.deletePayment(id);
    }

    // Pagination & sorting
    @GetMapping("/paginated")
    public Page<Payment> getPaymentsPaginated(
            @RequestParam(defaultValue = "") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "paymentId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                                                    : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return paymentService.getPaymentsPaginated(status, pageable);
    }
}
