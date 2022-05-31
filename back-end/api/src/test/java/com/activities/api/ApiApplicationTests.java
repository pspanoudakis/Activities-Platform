package com.activities.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class ApiApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void getEncryptedPassword(){
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		String raw = "admin";
		System.out.println("\n(" + raw +"): \n" + encoder.encode(raw) + "\n");
		
	}
}
