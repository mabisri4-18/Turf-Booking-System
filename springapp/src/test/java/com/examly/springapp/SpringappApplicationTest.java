package com.examly.springapp;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import java.io.File;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappBookingTests {

    @Autowired
    private MockMvc mockMvc;

    // ---------- Core API Tests ----------

    @Order(1)
    @Test
    void AddBookingReturns200() throws Exception {
        String bookingData = """
                {
                    "customerName": "Rahul",
                    "sportType": "Football",
                    "bookingDate": "2025-09-01",
                    "timeSlot": "6 PM - 8 PM",
                    "duration": 2
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookings/addBooking")
                        .with(jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(bookingData)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.customerName").value("Rahul"))
                .andReturn();
    }

    @Order(2)
    @Test
    void GetAllBookingsReturnsArray() throws Exception {
        mockMvc.perform(get("/api/bookings/allBookings")
                        .with(jwt())
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    @Order(3)
    @Test
    void GetBookingsBySportReturns200() throws Exception {
        mockMvc.perform(get("/api/bookings/bySport")
                        .with(jwt())
                        .param("sportType", "Football")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].customerName").exists())
                .andReturn();
    }

    @Order(4)
    @Test
    void GetBookingsSortedByDateReturns200() throws Exception {
        mockMvc.perform(get("/api/bookings/sortedByDate")
                        .with(jwt())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    @Order(5)
    @Test
    void DeleteBookingReturns200() throws Exception {
        // First add one to delete
        String bookingData = """
                {
                    "customerName": "ToDelete",
                    "sportType": "Cricket",
                    "bookingDate": "2025-09-03",
                    "timeSlot": "10 AM - 11 AM",
                    "duration": 1
                }
                """;

        String response = mockMvc.perform(MockMvcRequestBuilders.post("/api/bookings/addBooking")
                        .with(jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(bookingData)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        // Extract id from response (simple contains check)
        assertTrue(response.contains("ToDelete"));

        // Try deleting id = 1 (or dynamically check later with repository in real test)
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/bookings/1").with(jwt()))
                .andExpect(status().isOk());
    }

    // ---------- Project Structure Tests ----------

    @Test
    void ControllerDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void BookingControllerFileExists() {
        String filePath = "src/main/java/com/examly/springapp/controller/BookingController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void ModelDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void BookingModelFileExists() {
        String filePath = "src/main/java/com/examly/springapp/model/Booking.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void RepositoryDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void ServiceDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void BookingServiceClassExists() {
        checkClassExists("com.examly.springapp.service.BookingService");
    }

    @Test
    void BookingModelClassExists() {
        checkClassExists("com.examly.springapp.model.Booking");
    }

    @Test
    void BookingModelHasCustomerNameField() {
        checkFieldExists("com.examly.springapp.model.Booking", "customerName");
    }

    @Test
    void BookingModelHasSportTypeField() {
        checkFieldExists("com.examly.springapp.model.Booking", "sportType");
    }

    @Test
    void BookingModelHasBookingDateField() {
        checkFieldExists("com.examly.springapp.model.Booking", "bookingDate");
    }

    @Test
    void BookingModelHasTimeSlotField() {
        checkFieldExists("com.examly.springapp.model.Booking", "timeSlot");
    }

    @Test
    void BookingModelHasDurationField() {
        checkFieldExists("com.examly.springapp.model.Booking", "duration");
    }

    @Test
    void BookingRepoExtendsJpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.BookingRepository",
                "org.springframework.data.jpa.repository.JpaRepository");
    }

    @Test
    void BookingNotFoundExceptionClassExists() {
        checkClassExists("com.examly.springapp.exception.BookingNotFoundException");
    }

    @Test
    void BookingNotFoundExceptionExtendsRuntimeException() {
        try {
            Class<?> clazz = Class.forName("com.examly.springapp.exception.BookingNotFoundException");
            assertTrue(RuntimeException.class.isAssignableFrom(clazz),
                    "BookingNotFoundException should extend RuntimeException");
        } catch (ClassNotFoundException e) {
            fail("BookingNotFoundException class does not exist.");
        }
    }

    // ---------- Helpers ----------

    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }
}
