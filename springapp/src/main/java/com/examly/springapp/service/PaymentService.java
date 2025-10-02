package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public String deletePayment(Long id) {
        if(paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return "Payment deleted successfully!";
        } else {
            return "Payment not found!";
        }
    }

    public Page<Payment> getPaymentsPaginated(String status, Pageable pageable) {
        if(!status.isEmpty()) {
            return paymentRepository.findByPaymentStatusContainingIgnoreCase(status, pageable);
        } else {
            return paymentRepository.findAll(pageable);
        }
    }
}
