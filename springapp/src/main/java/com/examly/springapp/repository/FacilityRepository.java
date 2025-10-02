package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Facility;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {

    List<Facility> findByType(String type);

    Page<Facility> findByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Facility> findAllByOrderByNameAsc();
}

