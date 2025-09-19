package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping("/addBooking")
    public Booking createBooking(@RequestBody Booking booking)
    {
        return bookingService.createBooking(booking);
    }
}
