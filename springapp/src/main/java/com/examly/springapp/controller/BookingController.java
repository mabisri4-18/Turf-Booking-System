package com.examly.springapp.controller;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:8081"
})
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/addBooking")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.saveBooking(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @GetMapping("/allBookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/bySport")
    public ResponseEntity<List<Booking>> getBookingsBySport(@RequestParam String sportType) {
        List<Booking> bookings = bookingService.getBookingsBySport(sportType);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
bookingService.deleteBooking(id);
return new ResponseEntity<>("Booking deleted successfully!", HttpStatus.OK);
}

@GetMapping("/sortedByDate")
public ResponseEntity<List<Booking>> getBookingsSortedByDate() {
List<Booking> bookings = bookingService.getBookingsSortedByDate();
return new ResponseEntity<>(bookings, HttpStatus.OK);
}

@GetMapping("/paginated")
public ResponseEntity<Page<Booking>> getBookingPaginated(
@RequestParam(defaultValue = "") String customerName,
@RequestParam(defaultValue = "0") int page,
@RequestParam(defaultValue = "5") int size,
@RequestParam(defaultValue = "id") String sortBy,
@RequestParam(defaultValue = "asc") String sortDir) {

Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
Pageable pageable = PageRequest.of(page, size, sort);
Page<Booking> bookings = bookingService.getBookingPaginated(customerName, pageable);

return new ResponseEntity<>(bookings, HttpStatus.OK);
}

@PutMapping("/{id}")
public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
    Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
    return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
}

}