package com.examly.springapp.service;
    
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.BookingNotFoundException;
import com.examly.springapp.model.Booking;
import com.examly.springapp.repository.BookingRepository;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    BookingRepository bookingRepository;

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings()
    {
        List<Booking> bookings = bookingRepository.findAll();
        if(bookings.isEmpty())
        {
            throw new BookingNotFoundException("No Booking found for sport: ");
        }
        return bookings;
    }

    public List<Booking> getBookingsBySport(String sportType) {
        List<Booking> bookings = bookingRepository.findBySportType(sportType);
        if(bookings.isEmpty())
        {
            throw new BookingNotFoundException("No Booking found for sport: "+sportType);
        }
        return bookings;
    }

    public String deleteBooking(Long id) {
        if(bookingRepository.existsById(id))
        {
            bookingRepository.deleteById(id);
            return "data deleted Successfully!!";
        }
        else 
        {
            return "data not found !!";
        }
    }

    public List<Booking> getBookingsSortedByDate() {
        List<Booking> bookings =  bookingRepository.findAllByOrderByBookingDateDesc();
        if(bookings.isEmpty())
        {
            throw new BookingNotFoundException("No Booking found !!");
        }
        return bookings;
    }

}

