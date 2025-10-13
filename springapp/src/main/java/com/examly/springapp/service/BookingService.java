package com.examly.springapp.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.examly.springapp.model.Booking;

public interface BookingService {

    Booking saveBooking(Booking booking);

    List<Booking> getAllBookings();

    List<Booking> getBookingsBySport(String sportType);

    boolean deleteBooking(Long id);

    List<Booking> getBookingsSortedByDate();

    Page<Booking> getBookingPaginated(String customerName, Pageable pageable);

    Booking updateBooking(Long id, Booking bookingDetails);

}
