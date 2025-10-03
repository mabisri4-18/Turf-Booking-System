// package com.examly.springapp.service;
    
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;

// import com.examly.springapp.exception.BookingNotFoundException;
// import com.examly.springapp.model.Booking;
// import com.examly.springapp.repository.BookingRepository;
// import java.util.List;

// @Service
// public class BookingServiceImpl implements BookingService {

//     @Autowired
//     BookingRepository bookingRepository;

//     public Booking saveBooking(Booking booking) {
//         return bookingRepository.save(booking);
//     }

//     public List<Booking> getAllBookings()
//     {
//         List<Booking> bookings = bookingRepository.findAll();
//         if(bookings.isEmpty())
//         {
//             throw new BookingNotFoundException("No Booking found for sport: ");
//         }
//         return bookings;
//     }

//     public List<Booking> getBookingsBySport(String sportType) {
//         List<Booking> bookings = bookingRepository.findBySportType(sportType);
//         if(bookings.isEmpty())
//         {
//             throw new BookingNotFoundException("No Booking found for sport: "+sportType);
//         }
//         return bookings;
//     }

//     public String deleteBooking(Long id) {
//         if(bookingRepository.existsById(id))
//         {
//             bookingRepository.deleteById(id);
//             return "data deleted Successfully!!";
//         }
//         else 
//         {
//             return "data not found !!";
//         }
//     }

//     public List<Booking> getBookingsSortedByDate() {
//         List<Booking> bookings =  bookingRepository.findAllByOrderByBookingDateDesc();
//         if(bookings.isEmpty())
//         {
//             throw new BookingNotFoundException("No Booking found !!");
//         }
//         return bookings;
//     }

//     public Page<Booking> getBookingPaginated(String customerName,Pageable pageable)
//     {
//         if(!customerName.isEmpty())
//         {
//             return bookingRepository.findByCustomerNameContainingIgnoreCase(customerName,pageable);
//         }
//         else{
//             return bookingRepository.findAll(pageable);
//         }
//     }
// }

// /*package com.examly.springapp.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;

// import com.examly.springapp.exception.BookingNotFoundException;
// import com.examly.springapp.model.Booking;
// import com.examly.springapp.repository.BookingRepository;
// import java.util.List;

// @Service
// public class BookingServiceImpl implements BookingService {

//     @Autowired
//     private BookingRepository bookingRepository;

//     @Override
//     public Booking saveBooking(Booking booking) {
//         return bookingRepository.save(booking);
//     }
    
//     @Override
//     public List<Booking> getAllBookings() {
//         List<Booking> bookings = bookingRepository.findAll();
//         if (bookings.isEmpty()) {
//             throw new BookingNotFoundException("No bookings found!");
//         }
//         return bookings;
//     }

//     @Override
//     public List<Booking> getBookingsBySport(String sportType) {
//         List<Booking> bookings = bookingRepository.findByFacility_Type(facilityType);
//         if (bookings.isEmpty()) {
//             throw new BookingNotFoundException("No bookings found for facility type: " + facilityType);
//         }
//         return bookings;
//     }

//     @Override
//     public String deleteBooking(Long id) {
//         if (bookingRepository.existsById(id)) {
//             bookingRepository.deleteById(id);
//             return "Booking deleted successfully!";
//         } else {
//             return "Booking not found!";
//         }
//     }

//     @Override
//     public List<Booking> getBookingsSortedByDate() {
//         List<Booking> bookings = bookingRepository.findAllByOrderByBookingDateDesc();
//         if (bookings.isEmpty()) {
//             throw new BookingNotFoundException("No bookings found!");
//         }
//         return bookings;
//     }

//     @Override
//     public Page<Booking> getBookingPaginated(String userName, Pageable pageable) {
//         if (!userName.isEmpty()) {
//             return bookingRepository.findByUser_UsernameContainingIgnoreCase(userName, pageable);
//         } else {
//             return bookingRepository.findAll(pageable);
//         }
//     }
// }*/

package com.examly.springapp.service;

import com.examly.springapp.exception.BookingNotFoundException;
import com.examly.springapp.model.Booking;
import com.examly.springapp.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        if (bookings.isEmpty()) {
            throw new BookingNotFoundException("No bookings found!");
        }
        return bookings;
    }

    @Override
    public List<Booking> getBookingsBySport(String sportType) {
        List<Booking> bookings = bookingRepository.findBySportType(sportType);
        if (bookings.isEmpty()) {
            throw new BookingNotFoundException("No bookings found for sport: " + sportType);
        }
        return bookings;
    }

    @Override
public String deleteBooking(Long id) {
    if (bookingRepository.existsById(id)) {
        bookingRepository.deleteById(id);
        return "Booking deleted successfully!";
    } else {
        return "Booking not found!";
    }
}

    @Override
    public List<Booking> getBookingsSortedByDate() {
        List<Booking> bookings = bookingRepository.findAllByOrderByBookingDateDesc();
        if (bookings.isEmpty()) {
            throw new BookingNotFoundException("No bookings found!");
        }
        return bookings;
    }

    @Override
    public Page<Booking> getBookingPaginated(String customerName, Pageable pageable) {
        if (!customerName.isEmpty()) {
            return bookingRepository.findByCustomerNameContainingIgnoreCase(customerName, pageable);
        } else {
            return bookingRepository.findAll(pageable);
        }
    }
}
