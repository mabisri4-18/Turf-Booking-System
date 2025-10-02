package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Booking;

@Repository

public interface BookingRepository extends JpaRepository<Booking,Long> {

     List<Booking> findBySportType(String sportType);

    List<Booking> findAllByOrderByBookingDateDesc();

    Page<Booking> findByCustomerNameContainingIgnoreCase(String customerName, Pageable pageable);
}
