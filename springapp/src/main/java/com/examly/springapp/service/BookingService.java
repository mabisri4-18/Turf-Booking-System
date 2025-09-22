package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Booking;

public interface BookingService {

    Booking saveBooking(Booking booking);

    List<Booking> getAllBookings();

    List<Booking> getBookingsBySport(String sportType);

    String deleteBooking(Long id);

    List<Booking> getBookingsSortedByDate();

}
