package com.activities.api.entities;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails{

    @Id
    private String username;
    private String password;
    private String email;
    private String image;
    private String name;
    private String surname;
    private boolean isAdmin = false;
    private boolean isActive = true;
    private int balance = 0;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Authority> authorities = new ArrayList<>();

    public void addRole(Authority authority){ this.authorities.add(authority); }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return this.isActive;
    }
    
}
