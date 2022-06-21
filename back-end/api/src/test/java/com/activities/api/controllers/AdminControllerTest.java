package com.activities.api.controllers;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


@SpringBootTest @AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testChangePassword() {

    }

    @Test
    void testChangeRole() {

    }

    @Test
    void testCreateUser() {

    }

    @Test
    void testGetParentReservations() {

    }

    @Test
    void testGetSellerActivities() {

    }

    @Test
    void testGetStats() {

    }

    @Test
    void testGetUser() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders
            .get("/get_users"));
    }

    @Test
    void testGetUsers() {

    }

    @Test
    void testSetActive() {

    }

    @Test
    void testSetBlocked() {

    }
}
