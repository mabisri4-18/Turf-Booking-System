package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingService bookingService;


    @PostMapping("/addBooking")
    public Booking addBooking(@RequestBody Booking booking)
    {
        return bookingService.saveBooking(booking);
    }

    @GetMapping("/allBookings")
    public List<Booking> getAllBookings()
    {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bySport")
    public List<Booking> getBookingsBySport(@RequestParam String sportType)
    {
        return bookingService.getBookingsBySport(sportType);
    }

    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id)
    {
        return bookingService.deleteBooking(id);
    }

    @GetMapping("/sortedByDate")
    public List<Booking> getBookingsSortedByDate()
    {
        return bookingService.getBookingsSortedByDate();
    }
}
