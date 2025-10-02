package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.MaintenanceNotFoundException;
import com.examly.springapp.model.Maintenance;
import com.examly.springapp.repository.MaintenanceRepository;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    // Save or update maintenance
    public Maintenance saveMaintenance(Maintenance maintenance) {
        return maintenanceRepository.save(maintenance);
    }

    // Get all maintenance records
    public List<Maintenance> getAllMaintenance() {
        List<Maintenance> maintenances = maintenanceRepository.findAll();
        if (maintenances.isEmpty()) {
            throw new MaintenanceNotFoundException("No maintenance records found!");
        }
        return maintenances;
    }

    // Delete maintenance by ID
    public String deleteMaintenance(Long id) {
        if (maintenanceRepository.existsById(id)) {
            maintenanceRepository.deleteById(id);
            return "Maintenance record deleted successfully!";
        } else {
            return "Maintenance record not found!";
        }
    }

    // Pagination & sorting
    public Page<Maintenance> getMaintenancePaginated(Pageable pageable) {
        return maintenanceRepository.findAll(pageable);
    }

    // Get maintenance by status
    public List<Maintenance> getMaintenanceByStatus(String status) {
        List<Maintenance> maintenances = maintenanceRepository.findByStatusIgnoreCase(status);
        if (maintenances.isEmpty()) {
            throw new MaintenanceNotFoundException("No maintenance records found with status: " + status);
        }
        return maintenances;
    }
}
