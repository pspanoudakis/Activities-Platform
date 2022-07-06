package com.activities.api.services;

import java.util.List;

import com.activities.api.dto.AuthCredentialsRequest;
import com.activities.api.dto.UserPage;
import com.activities.api.dto.UserSearchCriteria;
import com.activities.api.entities.Authority;
import com.activities.api.entities.User;
import com.activities.api.repositories.UserCriteriaRepository;
import com.activities.api.repositories.UserRepository;
import com.activities.api.utils.JwtUtil;

import org.hibernate.procedure.ParameterMisuseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired private UserRepository userRepo;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private AuthorityService authorityService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserCriteriaRepository userCriteriaRepository;

    public Page<User> getUsersByUN(UserPage userPage, UserSearchCriteria userSearchCriteria){
        return userCriteriaRepository.findAllWithFilters(userPage, userSearchCriteria);
    }

    public Pair<String, User> login(AuthCredentialsRequest request, String role) throws BadCredentialsException, ParameterMisuseException{
        Authentication authenticate = authenticationManager
            .authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(), request.getPassword()
                )
            );

        User user = (User) authenticate.getPrincipal();
        Authority user_role = authorityService.getAuthority(role);

        if(user_role == null)
            throw new ParameterMisuseException("given role " + role + " not valid");
        if(!user.getAuthorities().contains(user_role))
            throw new BadCredentialsException("user is not of given role " + role);

        String token = jwtUtil.generateToken(user);            
        user.setPassword(null);
        
        return Pair.of(token, user);
    }

    public Pair<String, User> quick_login(String token, String role) throws BadCredentialsException, ParameterMisuseException{
        
        User user = getUserByUN(jwtUtil.getUsernameFromToken(token));

        if(user == null)
            throw new BadCredentialsException("no user with credential specified by given token");     
        if(jwtUtil.validateToken(token, user) == false)
            throw new BadCredentialsException("Token not valid");

        Authority user_role = authorityService.getAuthority(role);

        if(user_role == null)
            throw new ParameterMisuseException("role " + role + " is not valid");
        if(!user.getAuthorities().contains(user_role))
            throw new BadCredentialsException("user is not of given role " + role);

        return Pair.of(token, user);
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public User getUserByUN(String username){
        return userRepo.findByUsername(username);
    }

    public User createOrUpdateUser(User user){
        return userRepo.save(user);
    }

    public User getUserByUsername(String username){
        return userRepo.findById(username).orElse(null);
    }

    public int countSellers(){
        return userRepo.countByAuthorities_Authority("ROLE_SELLER");
    }

    public int countParents(){
        return userRepo.countByAuthorities_Authority("ROLE_PARENT");
    }

    public User deleteUser(String username){
        User user = null;
        try {
            user = userRepo.findById(username).orElse(null);
            if(user == null)throw new Exception("User does not exist");
            userRepo.delete(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return user;
    }

    public User saveOrUpdate(User user){return userRepo.save(user);}
}
