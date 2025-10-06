// package com.examly.springapp.service;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;

// import com.examly.springapp.exception.BookingNotFoundException;
// import com.examly.springapp.model.Facility;
// import com.examly.springapp.repository.FacilityRepository;

// @Service
// public class FacilityService {

//     @Autowired
//     private FacilityRepository facilityRepository;

//     // Add or update a facility
//     public Facility saveFacility(Facility facility) {
//         return facilityRepository.save(facility);
//     }

//     // Get all facilities
//     public List<Facility> getAllFacilities() {
//         List<Facility> facilities = facilityRepository.findAll();
//         if (facilities.isEmpty()) {
//             throw new BookingNotFoundException("No Facility found!");
//         }
//         return facilities;
//     }

//     // Get facilities by type
//     public List<Facility> getFacilitiesByType(String type) {
//         List<Facility> facilities = facilityRepository.findByType(type);
//         if (facilities.isEmpty()) {
//             throw new BookingNotFoundException("No Facility found for type: " + type);
//         }
//         return facilities;
//     }

//     // Delete facility by id
//     public String deleteFacility(Long facilityId) {
//         if (facilityRepository.existsById(facilityId)) {
//             facilityRepository.deleteById(facilityId);
//             return "Facility deleted successfully!";
//         }
//         return "Facility not found!";
//     }

//     // Get facilities sorted by name
//     public List<Facility> getFacilitiesSortedByName() {
//         List<Facility> facilities = facilityRepository.findAllByOrderByNameAsc();
//         if (facilities.isEmpty()) {
//             throw new BookingNotFoundException("No Facility found!");
//         }
//         return facilities;
//     }

//     // Pagination and sorting
//     public Page<Facility> getFacilityPaginated(String name, Pageable pageable) {
//         if (name != null && !name.isEmpty()) {
//             return facilityRepository.findByNameContainingIgnoreCase(name, pageable);
//         } else {
//             return facilityRepository.findAll(pageable);
//         }
//     }
// }


package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Facility;
import com.examly.springapp.repository.FacilityRepository;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    // Add or update a facility
    public Facility saveFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    // Get all facilities
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    // Get facilities by type
    public List<Facility> getFacilitiesByType(String type) {
        return facilityRepository.findByType(type);
    }

    // Delete facility by id
    public String deleteFacility(Long facilityId) {
        if (facilityRepository.existsById(facilityId)) {
            facilityRepository.deleteById(facilityId);
            return "Facility deleted successfully!";
        }
        return "Facility not found!";
    }

    // Get facilities sorted by name
    public List<Facility> getFacilitiesSortedByName() {
        return facilityRepository.findAllByOrderByNameAsc();
    }

    // Pagination and sorting
    public Page<Facility> getFacilityPaginated(String name, Pageable pageable) {
        if (name != null && !name.isEmpty()) {
            return facilityRepository.findByNameContainingIgnoreCase(name, pageable);
        } else {
            return facilityRepository.findAll(pageable);
        }
    }
}
