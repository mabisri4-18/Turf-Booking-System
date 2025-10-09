package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Facility;
import com.examly.springapp.service.FacilityService;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    @PostMapping("/add")
    public Facility addFacility(@RequestBody Facility facility) {
        return facilityService.saveFacility(facility);
    }

    @GetMapping("/all")
    public List<Facility> getAllFacilities() {
        return facilityService.getAllFacilities();
    }

    @GetMapping("/byType")
    public List<Facility> getFacilitiesByType(@RequestParam String type) {
        return facilityService.getFacilitiesByType(type);
    }

    @DeleteMapping("/{facilityId}")
    public String deleteFacility(@PathVariable Long facilityId) {
        return facilityService.deleteFacility(facilityId);
    }

    @GetMapping("/sortedByName")
    public List<Facility> getFacilitiesSortedByName() {
        return facilityService.getFacilitiesSortedByName();
    }

    @PutMapping("/update/{facilityId}")
     public Facility updateFacility(@PathVariable Long facilityId, @RequestBody Facility facility) {
    facility.setFacilityId(facilityId); // Ensure ID is set
    return facilityService.saveFacility(facility);
    }


    @GetMapping("/paginated")
    public Page<Facility> getFacilitiesPaginated(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return facilityService.getFacilityPaginated(name, pageable);
    }
}
