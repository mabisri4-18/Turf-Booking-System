package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        // TODO Auto-generated method stub
        return bookingRepository.save(booking);
    }

}
