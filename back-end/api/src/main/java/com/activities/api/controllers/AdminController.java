package com.activities.api.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.activities.api.dto.PageRequest;
import com.activities.api.dto.PagingResponse;
import com.activities.api.dto.StatsResponse;
import com.activities.api.dto.UserCompact;
import com.activities.api.dto.UserCreationRequest;
import com.activities.api.entities.Authority;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Seller;
import com.activities.api.entities.User;
import com.activities.api.services.ActivityService;
import com.activities.api.services.AuthorityService;
import com.activities.api.services.ParentService;
import com.activities.api.services.SellerService;
import com.activities.api.services.UserService;
import com.activities.api.utils.MyUtil;

@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired private AuthorityService authorityService;
    @Autowired private ParentService parentService;
    @Autowired private SellerService sellerService;
    @Autowired private UserService userService;
    @Autowired private ActivityService activityService;

    @PostMapping("/create_user")
    public ResponseEntity<?> createUser(@RequestBody UserCreationRequest req){
        
        if(userService.getUserByUN(req.getUsername()) != null)
        return ResponseEntity.badRequest().header("error", "username already exists").body(null);

        User user = new User();
        user.setEmail(req.getEmail());
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword());

        String role = req.getRole();
        Authority user_role = authorityService.getAuthority(role);
        user.addRole(user_role);

        if(role.equals("ROLE_PARENT")){
            userService.createOrUpdateUser(user);
            Parent parent = new Parent();
            parent.setUser(user);
            parentService.saveOrUpdateParent(parent);
            return ResponseEntity.ok().body(parent);
        }
        else if(role.equals("ROLE_SELLER")){
            userService.createOrUpdateUser(user);
            Seller seller = new Seller();
            seller.setUser(user);
            sellerService.saveOrUpdateSeller(seller);
            return ResponseEntity.ok().body(seller);
        }

        user.setAdmin(true);
        userService.createOrUpdateUser(user);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("stats")
    public ResponseEntity<StatsResponse> getStats(){
        return ResponseEntity.ok().body(
            new StatsResponse(
                userService.countSellers(),
                userService.countParents(),
                activityService.countActivities()
            )
        );
    }

    @GetMapping("/get_users")
    public ResponseEntity<?> getUsers(
        @RequestParam(required = false, defaultValue = "") String username,
        @RequestBody PageRequest req
    ){

        if(!username.equals("")){
            User user = userService.getUserByUN(username);
            if(user == null)return ResponseEntity.ok().body(null);
            return ResponseEntity.ok().body(
                new UserCompact(user)
            );
        }
        
        List<UserCompact> list = userService.getAllUsers()
            .stream().map(
                user -> new UserCompact(user)
            ).collect(Collectors.toList());

        MyUtil.getPage(list, req.getPageNumber(), req.getPageSize());
        int total_pages = (int) Math.ceil((double) list.size() / (double) req.getPageSize());
        return ResponseEntity.ok().body(
            new PagingResponse<List<UserCompact>>(
                MyUtil.getPage(list, req.getPageNumber(), req.getPageSize()),
                total_pages,
                req.getPageNumber()
            ) 
        );
    }

}