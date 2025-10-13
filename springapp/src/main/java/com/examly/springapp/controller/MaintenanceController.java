package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Maintenance;
import com.examly.springapp.service.MaintenanceService;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    // Add Maintenance
    @PostMapping("/add")
    public Maintenance addMaintenance(@RequestBody Maintenance maintenance) {
        return maintenanceService.saveMaintenance(maintenance);
    }

    // Get all Maintenance records
    @GetMapping("/all")
    public List<Maintenance> getAllMaintenance() {
        return maintenanceService.getAllMaintenance();
    }

    @PutMapping("/update/{id}")
    public Maintenance updateMaintenance(@PathVariable Long id, @RequestBody Maintenance maintenance) {
    return maintenanceService.updateMaintenance(id, maintenance);
    }

    // Delete Maintenance by ID
    @DeleteMapping("/{id}")
    public String deleteMaintenance(@PathVariable Long id) {
        return maintenanceService.deleteMaintenance(id);
    }

    // Pagination & Sorting
    @GetMapping("/paginated")
    public Page<Maintenance> getMaintenancePaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "maintenanceId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return maintenanceService.getMaintenancePaginated(pageable);
    }

    // Get by status (optional)
    @GetMapping("/status")
    public List<Maintenance> getMaintenanceByStatus(@RequestParam String status) {
        return maintenanceService.getMaintenanceByStatus(status);
    }
}
